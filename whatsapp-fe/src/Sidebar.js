import React from 'react'
import './Sidebar.css'
import Avatar from '@material-ui/core/Avatar'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import { IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'

function Sidebar() {
    return (
        <div className = "sidebar">
            <div className = "sidebar__header">
                <Avatar
                    className = "" 
                    src = "https://avatars3.githubusercontent.com/u/56448109?s=460&u=9d61a9b3043e3bf44a3c9015d2ddf254ed3aae80&v=4"
                    alt = "code with akky"
                />
                <div className = "sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton> 
                    <IconButton>
                        <ChatIcon />
                    </IconButton> 
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>    
                </div>
            </div>
            <div className = "sidebar__search">
                <div className = "sidebar__searchContainer">
                    <SearchOutlined />
                    <input type = "text" placeholder = "Search or start new chat" />
                </div>
            </div>

            <div className = "sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
