import "./Task.css"

export default function Task({project, task}){
    return (
        <>
        <div className="taskContainer">
            <h2>{task.num}</h2>
            <p>{task.description}</p>
        </div>
        </>
    )
}