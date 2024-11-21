import { useState } from "react"
import { useFetchWithToken } from "../../utils/callWithAuth"
import { projectsEndpoint } from "../../utils/callEndpont"

export default function CreateColumn({addColumn, project}){
    const [name, setName] = useState('')
    const fetchWithToken = useFetchWithToken()
    async function createColumn(e){
        e.preventDefault()
        let response = await fetchWithToken(projectsEndpoint+"/column/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Заголовок, указывающий, что отправляем JSON
            },
            body: JSON.stringify({name, projectId:project.id})
        })
        if (response.status == 200){
        let body = await response.json()
        body["tasks"] = []
        addColumn(body)
        setName('')
        }
    }
    return(
        <>
        <h1>Create column</h1>
        <form>
            <label>Name</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} value={name}></input>
            <button onClick={createColumn}>Create</button>
        </form>
        </>
    )
}