export default function Tab({title, onClick, visible}){
    return (<>
        {visible && <button onClick={onClick}>{title}</button>}
        </>
    )
}