import { useEffect, useState } from "react"
import CreateProject from "./CreateProject"
import ProjectSmall from "./ProjectSmall"
import Project from "./Project"
import { useFetchWithToken } from "../../utils/callWithAuth"
import { projectsEndpoint } from "../../utils/callEndpont"

export default function ProjectsPage(){
    const [projects, setProjects] = useState([])
    const [choosen, setChoosen] = useState(null)
    const fetchWithToken = useFetchWithToken()
    const addProject = project => {
        if (projects.length==0){
            setProjects([project])
        }else{
            setProjects(prev => [...prev, project])
        }
    }
    const deleteProject = project=>{
        setProjects(prev => prev.filter(proj=>proj.id!=project.id))
    }
    async function getProjects(){
        let result = await fetchWithToken(projectsEndpoint+"/projects/", {
            method:"GET"
        })
        let projects = await result.json()
        setProjects(projects?projects:[])
    }
    useEffect(()=>{
        getProjects()
    }, [])

    return(
        <>
        {!choosen && <CreateProject addProject={addProject}></CreateProject>}
        {!choosen && projects.map(project => <ProjectSmall key={project.id} project={project} setChoosen={setChoosen}/>)}
        {choosen && <Project project={choosen} setChoosen={setChoosen} deleteProject={deleteProject}></Project>}
       </>
    )
}