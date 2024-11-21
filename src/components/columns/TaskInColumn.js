import { useState } from "react"
import { useFetchWithToken } from "../../utils/callWithAuth"
import { projectsEndpoint } from "../../utils/callEndpont"

export default function TaskInColumn({teammates, task, setMovable}){
    const [teammateChoosen, setTeammateChoosen] = useState(task.executorId!=='00000000-0000-0000-0000-000000000000'?task.executorId:'')
    const fetchWithToken = useFetchWithToken()
    console.log(task.executorId, teammateChoosen)
    async function setExecutor(){
        let response = await fetchWithToken(projectsEndpoint+"/task/executor", {
            method:"PATCH",
            body:JSON.stringify({
                executorId: teammateChoosen,
                taskId: task.id
            })
        })
        if(response.status == 200){
            task.executorId = teammateChoosen
        }
    }
    function setTeammate(e){
        setTeammateChoosen(e.target.value)
    }
    return (
        <>
        <div className="taskContainer">
            <h2>{task.num}</h2>
            <p>{task.description}</p>
            <button onClick={setMovable}>Move</button>
            <select onChange={setTeammate} value={teammateChoosen}>
                <option disabled value={''}>Choose Teammate</option>
                {teammates && teammates.map((tm) => <option key={tm.id} value={tm.id}>{`${tm.name} ${tm.surname}`}</option>)}
            </select>
            <button onClick={setExecutor}>Set executor</button>
        </div>
        </>
    )
}