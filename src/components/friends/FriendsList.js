import { useEffect, useState } from "react"
import { defaultEndpoint } from "../../utils/callEndpont"
import Friend from "./Friend"
import { useFetchWithToken } from "../../utils/callWithAuth"

export default function FriendsList(){
    const [friends, setFriends] = useState([])
    const fetchWithToken = useFetchWithToken()
    function deleteFromState(friend){
        console.log("DELETE FORM LIST ")
        setFriends(friends=>friends.filter(fr=>fr.id!=friend.id))
    }
    
    async function getFriends(){
        let result = await fetchWithToken(defaultEndpoint+"/friends/", {
            method:"GET"
        })
        let friends = await result.json()
        setFriends(friends?friends:[])
    }
    useEffect(()=>{
        getFriends()
    }, [])

    return(
        <>
        <div className="friendsList">
            {friends && friends.map(friend => <Friend key={friend.id} friend={friend} isFriend={true} deleteFromState={()=>deleteFromState(friend)}></Friend>)}
        </div>
       </>
    )
}