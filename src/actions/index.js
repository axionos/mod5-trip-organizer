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

export const startDate = date => {
  return {
    type: 'START_DATE',
    payload: date
  }
}

export const endDate = date => {
  return {
    type: 'END_DATE',
    payload: date
  }
}
