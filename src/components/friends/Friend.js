import { defaultEndpoint } from "../../utils/callEndpont"
import { useFetchWithToken } from "../../utils/callWithAuth"
import "./Friend.css"

export default function Friend({friend, isFriend, deleteFromState}){
    const fetchWithToken = useFetchWithToken()
    async function addFriend(){
        let response = await fetchWithToken(defaultEndpoint+"/friends/", {
            method: "POST",
            body: JSON.stringify({friendId: friend.id})
        })
        if (response.status == 200){
            deleteFromState()
        }
    }
    async function deleteFriend(){
        let response = await fetchWithToken(defaultEndpoint+"/friends/", {
            method: "DELETE",
            body: JSON.stringify({friendId: friend.id})
        })
        if (response.status == 200){
            console.log("deleting")
            deleteFromState()
            console.log("deleting x2")
        }
    }
    return (
        <div className="friend">
            <p>{`${friend.username} ${friend.name} ${friend.surname}`}</p>
            {!isFriend && <button className="addFriend" onClick={addFriend}>Add</button>}
            {isFriend && <button className="deleteFriend" onClick={deleteFriend}>Delete</button>}
        </div>
    )
}