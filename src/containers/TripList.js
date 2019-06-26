import React from 'react';
// import Trip from '../components/Trip'
import { connect } from 'react-redux'
import { addTrip } from '../actions'

class ItineraryList extends React.Component {

  // SEND A GET REQUEST TO THE TRIP PAGE WITH THE TOKEN
  componentDidMount(){
    if (!localStorage.getItem("token")) {
      window.location.replace("http://localhost:3001/login")
    }

    // FETCHING TRIPS FROM THE DATABASE
    fetch('http://localhost:3000/trips', {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(resp => resp.json())
    .then(trip => {
      this.props.addTrip(trip)
    })
  } // END FETCHING


  render() {
    console.log('TripList Props', this.props)
    return (
      <div>
        Hello {this.props.user.username} from ItineraryList
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return { addTrip: trip => {
    dispatch(addTrip(trip))
  }}
}

const mapStateToProps = store => {
  return { trips: store.trips[0] }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryList)
