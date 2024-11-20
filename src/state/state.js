let state = {
    'accessToken':"",
    'refreshToken':""
}


function getState(){
    return state
}
function setState(newState){
    state = {
        ...state,
        ...newState
    }
}
export {getState, setState}