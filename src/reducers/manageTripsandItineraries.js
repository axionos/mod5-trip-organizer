import { combineReducers } from "redux"

const rootReducer = combineReducers({
  user: userReducer,
  trips: tripReducer,
  theTrip: theTripReducer,
  days: theDaysReducer
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
      console.log(action);
      return [...action.trip]

    case "ADD_TRIP":
      console.log(action)
      return [...state, action.trip]

    case "DELETE_THE_TRIP":
      console.log(action)
      return state.filter(trip => trip.id !== action.tripId)

    default:
      return state
  }
}

function theTripReducer(state = [], action) {

  switch(action.type){
    case "GET_THE_TRIP":
      console.log(action)
      return [action.trip]

    default:
      return state
  }
}

function theDaysReducer(state = [], action) {
  switch(action.type){
    case "GET_DAYS":
      console.log(action)
      return action.days

    default:
      return state
  }
}


// making a post request
