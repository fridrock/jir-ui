import { useEffect, useState } from "react"
import { useFetchWithToken } from "../../utils/callWithAuth"
import { projectsEndpoint } from "../../utils/callEndpont"
import Column from "./Column"
import CreateColumn from "./CreateColumn"
import "./Columns.css"

export default function Columns({project, teammates}){
    const [columns, setColumns] = useState([])
    const [tasks, setTasks] = useState([])
    const [movable, setMovable] = useState('')
    const fetchWithToken = useFetchWithToken()
    function addColumn(column){
        setColumns(prev=>[...prev, column])
    }
    function deleteColumnFromState(column){
        setTasks(tasks => [...tasks, ...column.tasks])
        setColumns(columns => columns.filter(c=>c.id!=column.id))
    }
    function moveTask(columnId, taskId){
        let newColumns = columns
        let to = columns.find(c=>c.id === columnId)
        let allTasks = [].concat(...columns.map(c=>c.tasks))
        let task = allTasks.find(t=>t.id == taskId)
        let from = columns.find(c=>c.id == task.columnId)
        task.columnId = to.id
        if(from.id != to.id){
        for(let i = 0;i<newColumns.length;i++){
            if (newColumns[i].id == to.id){
                newColumns[i].tasks.push(task)
            }else if(newColumns[i].id == from.id){
                newColumns[i].tasks = newColumns[i].tasks.filter(t=>t.id!=task.id)
            }
        }
        setColumns(newColumns)
        }
        setMovable('')
    }
    function addTaskToColumn(columnId, task){
        setTasks(tasks.filter(t => t.id!=task.id))
        let newColumns = columns
        newColumns.forEach(c => {
            if (c.id == columnId){
                c.tasks.push(task)
            }
        })
        setColumns(newColumns)
    }

    async function move(columnId){
        if(movable != ''){
            let response = await fetchWithToken(projectsEndpoint+"/task/column", {
                method:"PATCH",
                body: JSON.stringify({
                    columnId: columnId,
                    taskId: movable
                })
            })
            if (response.status == 200){
                moveTask(columnId, movable)
            }
        }
    }
    async function getState(){
        let response = await fetchWithToken(projectsEndpoint+"/column/byproject/"+project.id, {
            method: "GET"
        })
        if (response.status == 200){
            let body = await response.json()
            if(body){
            body.forEach(b=>{
                if (b.tasks === null){
                    b.tasks = []
                }
            })
            response = await fetchWithToken(projectsEndpoint+"/task/byproject/"+project.id, {
                method: "GET"
            })
            if (response.status == 200){
                let tasksInProject = await response.json()
                tasksInProject = tasksInProject ? tasksInProject : []
                let tasksInColumnsIds = [].concat(...(body.map(column => column.tasks))).filter(t => t).map(task=>task.id)
                tasksInProject = tasksInProject.filter(task => !tasksInColumnsIds.includes(task.id))
                setTasks(tasksInProject?tasksInProject:[])
            }
            setColumns(body?body:[])
            }

        }
         
    }
    useEffect(()=>{
        getState()
    }, [])
    return (
        <div className="columnsContainer">
            <h2>Columns</h2>
            <CreateColumn addColumn={addColumn} project={project}></CreateColumn>
            <div className="columnsList">
                {columns && columns.map(column => <Column teammates={teammates} move={()=>move(column.id)} movable={movable} setMovable={setMovable} addTaskToColumn = {addTaskToColumn} tasks={tasks} column={column} deleteFromState={()=>deleteColumnFromState(column)}></Column>)}
            </div>
        </div>
    )
}