import Tab from "./components/basic/Tab";
import LoginPage from "./components/auth/LoginPage";
import FriendsPage from "./components/friends/FriendsPage";
import {useState} from 'react'
import './App.css'
import { useGlobalState } from "./state/globalState";
import ProjectsPage from "./components/projects/ProjectsPage";

function App() {
  const [page, setPage] = useState('login')
  const {authorized} = useGlobalState()

  
  return (
    <div className="App">
      <Tab title="Login page" visible={!authorized} onClick={()=>setPage("login")}></Tab>
      <Tab title="Friends" visible={authorized} onClick={()=>setPage("friends")}></Tab>
      <Tab title="Projects" visible={authorized} onClick={()=>setPage("projects")}></Tab>
      {(page==='login' && !authorized) && <LoginPage changePage={setPage}></LoginPage>}
      {(page==='friends' && authorized) && <FriendsPage></FriendsPage>}
      {(page==='projects' && authorized) && <ProjectsPage></ProjectsPage>}  
    </div>
  );
}

export default App;
