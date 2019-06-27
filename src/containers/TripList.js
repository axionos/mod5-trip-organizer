import React from 'react';
import Trip from '../components/Trip'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTrip, addTrip } from '../actions'

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
      // console.log("trip is",trip);
      this.props.getTrip(trip)
    })
  } // END FETCHING

  genTrip = () => {
    return this.props.trips.map(trip => {
      return <Trip ***REMOVED***={trip.id} trip={trip} />
    })
  }

  render() {
    console.log('Trip List Props', this.props)
    // console.log('Trip List Props trips', this.props.trips)
    return (
      <div>
        Hello {this.props.user.username} from ItineraryList

        { this.props.trips.length > 1 ? <h1>My Trips</h1> : <h1>My Trip</h1> }


        <Link to="/add_trip">Add Trip</Link>
        {this.props.trips ? this.genTrip() : null}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTrip: trip => {
      dispatch(getTrip(trip))
    },
    addTrip: trip => {
      dispatch(addTrip(trip))
    }
  }
}

const mapStateToProps = state => {
  return { trips: state.trips }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripList)
