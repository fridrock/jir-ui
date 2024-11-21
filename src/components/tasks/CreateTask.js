import { useState } from "react"
import { useFetchWithToken } from "../../utils/callWithAuth"
import { projectsEndpoint } from "../../utils/callEndpont"

export default function CreateTask({project, addTask}){
    const [form, setForm] = useState({
        name:'',
        description:''
    })
    const fetchWithToken = useFetchWithToken()
    async function createTask(e){
        e.preventDefault()
        let response = await fetchWithToken(projectsEndpoint+"/task/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Заголовок, указывающий, что отправляем JSON
            },
            body: JSON.stringify({...form, "projectId": project.id})
        })
        if (response.status == 200){
            let body = await response.json()
            addTask(body)
        setForm({name:'', description:''})
        }
    }
    return(
        <>
        <h1>Create task</h1>
        <form>
            <label>Name</label>
            <input type="text" onChange={(e)=>setForm({...form, name: e.target.value})} value={form.name}></input>
            <label>Description</label>
            <input type="text" onChange={(e)=>setForm({...form, description:e.target.value})} value={form.description}></input>
            <button onClick={createTask}>Create</button>
        </form>
        </>
    )
}