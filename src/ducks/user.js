const TYPE_LOADACCOUNT = 'TYPE_LOADACCOUNT'
const TYPE_UNLOADACCOUNT = 'TYPE_UNLOADACCOUNT'
const initialState = {
  user: {}
}

export function loadAccount(userInfo){
  return {
    type: TYPE_LOADACCOUNT ,
    payload: userInfo
  }
}

export function unloadAccount(){
  return {
    type: TYPE_UNLOADACCOUNT
  }
}

export default function reducer(state=initialState, action){
  switch (action.type){
    case TYPE_LOADACCOUNT:
      return Object.assign({} , state , {user: action.payload})
    case TYPE_UNLOADACCOUNT:
      return Object.assign({} , state , {user: {}})
    default: 
    return state
  }
}