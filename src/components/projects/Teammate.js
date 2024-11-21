import { defaultEndpoint } from "../../utils/callEndpont"
import { useFetchWithToken } from "../../utils/callWithAuth"
// import "./Teammate.css"

export default function Teammate({teammate, deleteFromState, project}){
    const fetchWithToken = useFetchWithToken()
    
    async function deleteTeammate(){
        let response = await fetchWithToken(defaultEndpoint+"/friends/", {
            method: "DELETE",
            body: JSON.stringify({userId: teammate.id, projectId: project.id})
        })
        if (response.status == 200){
            deleteFromState()
        }
    }
    return (
        <div className="teammate">
            <p>{`${teammate.username} ${teammate.name} ${teammate.surname}`}</p>
            {<button className="deleteTeammate" onClick={deleteTeammate}>Delete</button>}
        </div>
    )
}