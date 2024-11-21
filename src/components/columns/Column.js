import TaskInColumn from "./TaskInColumn";
import "./Column.css"
import { useFetchWithToken } from "../../utils/callWithAuth";
import { projectsEndpoint } from "../../utils/callEndpont";
import { useState } from "react";

export default function Column({teammates, movable, setMovable, move, tasks, column, deleteFromState, addTaskToColumn}){
    const fetchWithToken = useFetchWithToken()
    const [choosenTask, setChoosenTask] = useState('')
    async function addTaskInColumn(){
        let response = await fetchWithToken(projectsEndpoint+"/task/column", {
            method:"PATCH",
            body: JSON.stringify({
                columnId: column.id,
                taskId: choosenTask
            })
        })
        if (response.status == 200){
            let task = tasks.find(t => t.id == choosenTask)
            task.columnId = column.id
            addTaskToColumn(column.id, task)
            setChoosenTask('')
        }
    }
    function set(e){
        setChoosenTask(e.target.value)
    }
    
    async function deleteColumn(){
        let response = await fetchWithToken(projectsEndpoint+"/column/"+column.id, {
            method:"DELETE"
        })
        if (response.status == 200){
            deleteFromState()
        }
    }
    return (
        <div className="column">
            <div className="columnHeader">
                <h3>{column.name}</h3>
                <button onClick={deleteColumn}>Delete</button>
                {movable!=='' && <button onClick={move}>Move</button>}
                <select onChange={set} value={choosenTask}>
                    <option disabled value={''}>Choose task</option>
                    {tasks && tasks.map((task) => <option key={task.id} value={task.id}>{task.name}</option>)}
                </select>
                <button onClick={addTaskInColumn}>Add task</button>
                
            </div>
            <div className="columnTasksList">
                {column.tasks && column.tasks.map(task => <TaskInColumn teammates={teammates} setMovable={()=>setMovable(task.id)} key={task.id} task={task}></TaskInColumn>)}
            </div>
        </div>
    )
}