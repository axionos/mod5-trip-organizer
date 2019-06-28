import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTheTrip, deleteTheTrip } from '../actions'
import { withRouter } from 'react-router-dom'

class Trip extends React.Component {

  // CALL DISPATCH TO PROPS ON CLICK
  handleClickEdit = (e) => {
    // console.log(this.props.trip.id);
    // selected trip info will be saved in the store on click
    this.props.getTheTrip(this.props.trip)
  } // END CALLING

  // DELETE THE TRIP
  handleClickDelete = () => {
    // console.log('selected trip id:',this.props.trip.id);

    // optimistically update the redux store
    this.props.deleteTheTrip(this.props.trip.id)

    // send delete fetch request
    const tripId = this.props.trip.id
    fetch(`http://localhost:3000/trips/${tripId}`, {
      method: "DELETE"
    })
  } // END DELETING


  // SEND TRIP INFO TO STORE
  handleClickTripDiv = e => {
    console.log('clicking', e.target);
    // if click target has class name of two-btns
    if (e.target.className === 'two-btns') {
      return null
    } else {
      this.props.history.push("/itinerary")
      this.props.getTheTrip(this.props.trip)
    }
  } // END SENDING

  render(){
    console.log('Trip Props', this.props)
    return(
      <div className="trip-container">
          <div
            className="trip-conts" onClick={this.handleClickTripDiv}
          >
            <h3>{this.props.trip.title}</h3>
            <p>{this.props.trip.startDate} ~ {this.props.trip.endDate}</p>
            <p>{this.props.trip.destination}</p>
            <div className="btn-container">
              <Link
                className="two-btns"
                to="/edit"
                onClick={this.handleClickEdit}
              >Edit Trip</Link>
              <button
                onClick={this.handleClickDelete}
                className="two-btns"
              >Delete</button>
            </div>
          </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTheTrip: trip => {
      dispatch(getTheTrip(trip))
    },
    deleteTheTrip: tripId => {
      dispatch(deleteTheTrip(tripId))
    }
  }
}

const mapStateToProps = store => {
  return { trips: store.trips }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Trip))
