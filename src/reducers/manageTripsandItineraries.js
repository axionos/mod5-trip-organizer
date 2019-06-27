import { combineReducers } from "redux"

const rootReducer = combineReducers({
  trips: tripReducer
})

export default rootReducer;

function tripReducer(state = [], action) {
  switch(action.type){

    case "GET_TRIP":
      return [...action.payload]

    case "ADD_TRIP":
      console.log(state)
      // return [...state, action.payload]
      return state

    // case "START_DATE":


    default:
      return state
  }
}

// making a post request
