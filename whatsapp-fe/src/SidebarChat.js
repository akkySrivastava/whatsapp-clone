import { Avatar } from '@material-ui/core'
import React from 'react'
import './SidebarChat.css'

function SidebarChat() {
    return (
        <div className = "sidebarChat">
            <Avatar 
                src = ""
                alt = "none"
            />
            <div className = "sidebarChat__info">
                <h2>Room Name</h2>
                <p>This is last Message</p>
            </div>
        </div>
    )
}

export default SidebarChat
