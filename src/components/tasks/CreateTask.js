import { useState } from "react"
import { useFetchWithToken } from "../../utils/callWithAuth"
import { projectsEndpoint } from "../../utils/callEndpont"

export default function CreateTask({project, addTask}){
    const [description, setDescription] = useState('')
    const fetchWithToken = useFetchWithToken()
    async function createTask(e){
        e.preventDefault()
        let response = await fetchWithToken(projectsEndpoint+"/task/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Заголовок, указывающий, что отправляем JSON
            },
            body: JSON.stringify({description, "projectId": project.id})
        })
        let body = await response.json()
        addTask(body)
        setDescription('')
    }
    return(
        <>
        <h1>Create task</h1>
        <form>
            <label>Description</label>
            <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description}></input>
            <button onClick={createTask}>Create</button>
        </form>
        </>
    )
}