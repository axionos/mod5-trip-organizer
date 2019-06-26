import React from 'react';
import Trip from '../components/Trip'
// import Trip from '../components/Trip'
import { connect } from 'react-redux'
import { addTrip } from '../actions'

class TripList extends React.Component {

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

  genTrip = () => {
    return this.props.trips.map(trip => {
      return <Trip key={trip.id} trip={trip} />
    })
  }

  render() {
    console.log('Trip List Props', this.props)
    console.log('Trip List Props trips', this.props.trips)
    return (
      <div>
        Hello {this.props.user.username} from ItineraryList
        {this.props.trips ? this.genTrip() : null}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return { addTrip: trip => {
    dispatch(addTrip(trip))
  }}
}

const mapStateToProps = state => {
  console.log("props in TripList", state.trips[0]);
  return { trips: state.trips[0] }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripList)
