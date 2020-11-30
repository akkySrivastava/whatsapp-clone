import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, Search } from '@material-ui/icons'
import React, { useState } from 'react'
import MicIcon from '@material-ui/icons/Mic'
import './Chat.css'
import axios from './axios'

function Chat({ messages }) {

    const[input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/api/v1/messages/new', {
            message: input,
            name: "CodeWithAkky",
            timestamp: "JustNow",
            received: true,
        })

        setInput('');
    }
    return (
        <div className = "chat">
            <div className = "chat__header">
                <Avatar
                    src = ""
                    alt = ""
                />

                <div className = "chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at.....</p>
                </div>
                <div className = "chat__headerRight">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
             </div>
             <div className = "chat__body">
                 {messages.map( message => (
                     <p className = {`chat__message ${message.received && "chat__receiver"}`} >
                     <span className = "chat__name">{message.name}</span>
                            {message.message}
                     <span className = "chat__timestamp">
                        {message.timestamp}
                     </span>
                 </p>
                 ))}
                 
             </div>
             <div className = "chat__footer">
                    <InsertEmoticon />
                    <form>
                        <input  
                            value = {input} 
                            onChange = {(e) => setInput(e.target.value)} 
                            placeholder = "Type a message" 
                            type = "text" />
                        <button 
                            onClick = {sendMessage} 
                            type = "submit">Send
                        </button>
                    </form>
                    <MicIcon />
            </div>
        </div>
    )
}

export default Chat
