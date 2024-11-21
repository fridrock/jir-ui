import { projectsEndpoint } from "../../utils/callEndpont"
import { useFetchWithToken } from "../../utils/callWithAuth"
import "./Task.css"

export default function Task({task, deleteFromState}){
    const fetchWithToken = useFetchWithToken()
    async function deleteTask(){
        let response = await fetchWithToken(projectsEndpoint+"/task/"+task.id, {
            method:"DELETE",
        })
        if (response.status == 200){
            deleteFromState()
        }
    }
    return (
        <>
        <div className="taskContainer">
            <h2>{task.num} {task.name}</h2>
            <p>{task.description}</p>
            <button onClick={deleteTask}>Delete</button>
        </div>
        </>
    )
}