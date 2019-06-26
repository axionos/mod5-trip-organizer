import { combineReducers } from "redux"

const rootReducer = combineReducers({
  trips: tripReducer
})

export default rootReducer;

function tripReducer(state = [], action) {
  switch(action.type){
    case "ADD_TRIP":
      return [...state, action.trip]
    default:
      return state
  }
}
