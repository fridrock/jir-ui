import "./ProjectSmall.css"

export default function ProjectSmall({project, setChoosen}){

    return (
        <div className="projectSmall" onClick={()=>setChoosen(project)}>
            {`Project: ${project.name}`}
        </div>
    )
}