import { useState } from "react"
import Tab from "../basic/Tab"
import FriendsList from "./FriendsList"
import AddFriend from "./AddFriend"

export default function FriendsPage(){
    const [tab, setTab] = useState('list')
    return (

        <div>
            <div className="friendsHeader">
                <Tab title="My friends" onClick={()=>setTab('list')} visible={true}></Tab>
                <Tab title="Add friend" onClick={()=>setTab('add')} visible={true}></Tab>
            </div>
            <div className="friendsContent">
                {tab === 'list' && <FriendsList></FriendsList>}
                {tab === 'add' && <AddFriend></AddFriend>}
            </div>
        </div>
    )
}