import "./Project.css"
import { useFetchWithToken } from "../../utils/callWithAuth"
import { projectsEndpoint } from "../../utils/callEndpont"
import Tab from "../basic/Tab"
import { useEffect, useState } from "react"
import Columns from "../columns/Columns"
import Backlog from "./Backlog"
import Team from "./Team"

export default function Project({project, setChoosen, deleteProject}){
    const [tab, setTab] = useState('columns')
    const [teammates, setTeammates] = useState([])
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
    function update(newState){
        setTeammates(newState)
    }
    async function getTeammates(){
        let response = await fetchWithToken(projectsEndpoint+"/team/profiles/"+project.id, {method:"GET"})
        if (response.status == 200){
            let teammates = await response.json()
            setTeammates(teammates?teammates:[])
        }
    }
    useEffect(()=>{
        getTeammates()
    },[])
    return (
        <>
        <div className="projectContainer">
            <div className="projectHeader">
                <button className="goBackButton" onClick={()=>setChoosen(null)}>Go back</button>
                <button className="deleteProject"  onClick={deleteProjectQuery}>Delete</button>
                <Tab title="Columns" visible={true} onClick={()=>setTab('columns')}></Tab>
                <Tab title="Backlog" visible={true} onClick={()=>setTab('backlog')}></Tab>
                <Tab title="Team" visible={true} onClick={()=>setTab('team')}></Tab>
            </div>
            {tab === 'columns' && <Columns teammates={teammates} project={project}></Columns>}
            {tab === 'backlog' && <Backlog project={project}></Backlog>}
            {tab === 'team' && <Team update={update} project={project}></Team>}
        </div>
        </>
    )
}