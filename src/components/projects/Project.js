import "./Project.css"
import { useFetchWithToken } from "../../utils/callWithAuth"
import { projectsEndpoint } from "../../utils/callEndpont"
import Tab from "../basic/Tab"
import { useState } from "react"
import Columns from "./Columns"
import Backlog from "./Backlog"

export default function Project({project, setChoosen, deleteProject}){
    const [tab, setTab] = useState('columns')
    const fetchWithToken = useFetchWithToken()
    async function deleteProjectQuery(e){
        e.preventDefault()
        let response = await fetchWithToken(projectsEndpoint+"/projects/"+project.id, {
            method: "DELETE",
        })
        if (response.status == 200){
            deleteProject(project)
            setChoosen(null)
        }
    }
    return (
        <>
        <div className="projectContainer">
            <div className="projectHeader">
                <button className="goBackButton" onClick={()=>setChoosen(null)}>Go back</button>
                <button className="deleteProject"  onClick={deleteProjectQuery}>Delete</button>
                <Tab title="Columns" visible={true} onClick={()=>setTab('columns')}></Tab>
                <Tab title="Backlog" visible={true} onClick={()=>setTab('backlog')}></Tab>
            </div>
            {tab === 'columns' && <Columns></Columns>}
            {tab === 'backlog' && <Backlog project={project}></Backlog>}
        </div>
        </>
    )
}