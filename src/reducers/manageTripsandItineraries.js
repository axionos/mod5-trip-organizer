import { combineReducers } from "redux"

const rootReducer = combineReducers({
  user: userReducer,
  trips: tripReducer
})

export default rootReducer;

function userReducer(state = [], action) {
  
  switch(action.type){
    case "GET_USER":
      return action.user

    default:
      return state
  }
}

function tripReducer(state = [], action) {
  switch(action.type){

    case "GET_TRIP":
      return [...action.trip]

    case "ADD_TRIP":
      // console.log(action)
      return [...state, action.trip]


    default:
      return state
  }
}



// making a post request
