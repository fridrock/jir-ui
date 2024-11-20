import { useEffect, useState } from "react"
import { useFetchWithToken } from "../../utils/callWithAuth"
import Task from "../tasks/Task"
import { projectsEndpoint } from "../../utils/callEndpont"
import CreateTask from "../tasks/CreateTask"
export default function Backlog({project}){
    const [tasks, setTasks] = useState([])
    const fetchWithToken = useFetchWithToken()
    const addTask = task => {
        setTasks(prev => [...prev, task])
    }
    async function getTasks(){
        let response = await fetchWithToken(projectsEndpoint+"/task/byproject/"+project.id, {
            method:"GET"
        })
        if (response.status == 200){
            let tasks = await response.json()
            setTasks(tasks?tasks:[])
        }
    }
    useEffect(()=>{
        getTasks()
    }, [])
    return (
        <div>
            <h1>Backlog</h1>
            <CreateTask project={project} addTask={addTask}></CreateTask>
            <div className="tasks">
                {tasks && tasks.map(task=> <Task key={task.id} project={project} task={task}/>)}
            </div>
        </div>
    )
}