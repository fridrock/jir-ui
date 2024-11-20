import {useState} from 'react'
import Tab from '../basic/Tab'
import AuthForm from './AuthForm'
import RegForm from './RegForm'

export default function LoginPage({changePage}){
    const [form, setForm] = useState('auth')
    return (
        <>
        <Tab title="Login" onClick={()=>setForm("auth")}  visible={true}></Tab>
        <Tab title="Registration" onClick={()=>setForm("reg")} visible={true}></Tab>
        {form==='auth' && <AuthForm changePage={changePage}></AuthForm>}
        {form==='reg' && <RegForm changePage={changePage}></RegForm>}
        </>
    )
}