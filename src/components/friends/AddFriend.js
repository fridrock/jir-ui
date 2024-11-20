import { useState } from "react"
import { useFetchWithToken } from "../../utils/callWithAuth"
import { defaultEndpoint } from "../../utils/callEndpont"
import Friend from "./Friend"

export default function AddFriend(){
    const [username, setUsername] = useState('')
    const [suggested, setSuggested] = useState([])
    const fetchWithToken = useFetchWithToken()
    function deleteFromSuggested(friend){
        setSuggested(suggested => suggested.filter(s=>s.id!=friend.id))
    }
    async function onUsernameUpdate(e){
        setUsername(e.target.value)
        let response = await fetchWithToken(defaultEndpoint+"/users/"+e.target.value, {
            method: "GET",
        })
        if (response.status == 200){
            let body = await response.json()
            setSuggested(body?body:[])
        }
    }
    return (
        <div>
            <form>
                <label>Input username</label>
                <input type="text" onChange={onUsernameUpdate} value={username}></input>
            </form>
            <div className="suggested">
                {suggested && suggested.map(suggested => <Friend key={suggested.id} friend={suggested} isFriend={false} deleteFromState={()=>deleteFromSuggested(suggested)}/>)}
            </div>
        </div>
    )
}