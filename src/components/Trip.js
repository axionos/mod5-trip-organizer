import React from 'react';
import { connect } from 'react-redux'

class Trip extends React.Component {

  render(){
    console.log('Trip Props', this.props)
    return(
      <div className="trip-container">
        <div className="trip-conts">
          <h3>{this.props.trip.title}</h3>
          <p>{this.props.trip.startDate} ~ {this.props.trip.endDate}</p>
          <p>{this.props.trip.destination}</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return { trips: store.trips }
}

export default connect(mapStateToProps)(Trip)
