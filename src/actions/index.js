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
