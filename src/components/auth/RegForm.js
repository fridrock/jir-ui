import { useState } from "react"
import { defaultEndpoint } from "../../utils/callEndpont"
import { setState} from "../../state/state"
import { useGlobalState } from "../../state/globalState"

export default function RegForm({changePage}){
    const [form, setForm] = useState({
        username:"",
        name:"",
        surname:"",
        password:"",
        email:""
    })
    const {setAuthorized} = useGlobalState()
    const [error, setError] = useState('')
    async function sendRequest(){
        const response = await fetch(defaultEndpoint+"/users/reg", {
            method: 'POST', // Метод запроса
            headers: {
                'Content-Type': 'application/json' // Заголовок, указывающий, что отправляем JSON
            },
            body: JSON.stringify(form) // Преобразование данных в строку JSON
        })
        let responseBody = await response.json()
        if(response.status != 200){
            setError(responseBody.message)
        }else{
            setState({accessToken: responseBody["accessToken"], refreshToken: responseBody["refreshToken"]})
            setAuthorized(true)
            changePage('main')
        }
    }
    return (
        <form>
            <label>Username</label>
            <input type="text" value={form.username} onChange={(e)=>setForm({...form, username:e.target.value})}></input>
            <label>Email</label>
            <input type="text" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}></input>
            <label>Name</label>
            <input type="text" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})}></input>
            <label>Surname</label>
            <input type="text" value={form.surname} onChange={(e)=>setForm({...form, surname: e.target.value})}></input>
            <label>Password</label>
            <input type="text" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})}></input>
            <button  onClick={(e)=>{
                e.preventDefault()
                sendRequest()
            }}>Send</button>
            {error && <div>{error}</div>}
        </form>
    )
}