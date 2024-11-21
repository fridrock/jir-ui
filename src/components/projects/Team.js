import { useEffect, useState } from "react";
import { useFetchWithToken } from "../../utils/callWithAuth";
import { defaultEndpoint, projectsEndpoint } from "../../utils/callEndpont";
import Teammate from "./Teammate";
export default function Team({update, project}){
    const [team, setTeam] = useState([])
    const [friends, setFriends] = useState([])
    const [selected, setSelected] = useState('')
    const fetchWithToken = useFetchWithToken()
    async function deleteTeammate(userId){
        let response = await fetchWithToken(projectsEndpoint+"/team/", {
            method:"DELETE",
            body: JSON.stringify({
                userId: userId,
                projectId: project.id
            })
        })
        if(response.status == 200){
            setFriends(prev=>[...prev, team.find(t=>t.id==userId)])
            setTeam(team.filter(t=>t.id!=userId))
            update(team.filter(t=>t.id!=userId))
        }
    }
    async function addTeammate(){
        if(selected != ''){
            let response = await fetchWithToken(projectsEndpoint+"/team/", {
                method:"POST",
                body: JSON.stringify({
                    userId: selected,
                    projectId: project.id
                })
            })
            if(response.status == 200){
                setTeam(prev=>[...prev, friends.find(f=>f.id==selected)])
                update([...team,friends.find(f=>f.id==selected)])
                setFriends(friends.filter(f=>f.id!=selected))
                setSelected('')
            }
        }

    }
    async function getState(){
        let response = await fetchWithToken(projectsEndpoint+"/team/profiles/"+project.id, {method:"GET"})
        if (response.status == 200){
            let teammates = await response.json()
            setTeam(teammates?teammates:[])
            response = await fetchWithToken(defaultEndpoint+"/friends/", {
                method: "GET"
            })
            if (response.status == 200){
                let received = await response.json()
                received = received.filter(r=>!teammates.map(t=>t.id).includes(r.id))
                console.log(received)
                setFriends(received?received: [])
            }
        }
        
    }
    
    useEffect(()=>{
        getState()
    }, [])
    return (
        <div>
            <div className="friendsList">
                <h2>Add friend</h2>
                <select onChange={(e) => setSelected(e.target.value)} value={selected}>
                    <option value={''} disabled >Choose friend to add </option>
                    {friends && friends.map(friend=><option value={friend.id}>{`${friend.surname} ${friend.name}`}</option>)}
                </select>
                <button onClick={addTeammate}>Add to team</button>
            </div>
            <div className="teamList">
                <h2>Teammates</h2>
                {team && team.map(teammate => <Teammate deleteFromState={()=>deleteTeammate(teammate.id)} teammate={teammate} project={project}></Teammate>)}
            </div>
        </div>
    )
}