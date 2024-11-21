import { useState } from "react"
import { useFetchWithToken } from "../../utils/callWithAuth"
import { projectsEndpoint } from "../../utils/callEndpont"

export default function CreateProject({addProject}){
    const [name, setName] = useState('')
    const fetchWithToken = useFetchWithToken()
    async function createProject(e){
        e.preventDefault()
        let response = await fetchWithToken(projectsEndpoint+"/projects/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Заголовок, указывающий, что отправляем JSON
            },
            body: JSON.stringify({name})
        })
        if(response.status == 200){
            let body = await response.json()
            addProject(body)
            setName('')
        }
    }
    return(
        <>
        <h1>Create project</h1>
        <form>
            <label>Name</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} value={name}></input>
            <button onClick={createProject}>Create</button>
        </form>
        </>
    )
}