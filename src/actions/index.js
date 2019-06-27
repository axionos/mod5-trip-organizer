export const getTrip = trip => {
  return {
    type: 'GET_TRIP',
    payload: trip
  }
}

export const addTrip = trip => {
  return {
    type: 'ADD_TRIP',
    payload: trip
  }
}

// export const addStartDate = date => {
//   return {
//     type: 'ADD_START_DATE',
//     payload: date
//   }
// }
//
// export const addEndDate = date => {
//   return {
//     type: 'ADD_END_DATE',
//     payload: date
//   }
// }
