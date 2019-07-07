import { combineReducers } from "redux"

const rootReducer = combineReducers({
  user: userReducer,
  trips: tripReducer,
  theTrip: theTripReducer,
  days: theDaysReducer,
  // theDay: theDayReducer,
  items: theItemsReducer
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

function theItemsReducer(state = [], action) {
  switch(action.type){
    case 'GET_ITEMS':
      console.log(action)
      return action.items

    case 'ADD_ITEM':
      console.log(action)
      return [...state, action.item]

    case 'DELETE_ITEM':
      console.log(action)
      return state.filter(item => item.id !== action.item.id)

    default:
      return state
  }
}


// making a post request
