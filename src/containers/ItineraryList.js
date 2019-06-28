import React from 'react';
import { connect } from 'react-redux'

class ItineraryList extends React.Component {
  render(){
    console.log('Itinerary List Props', this.props)
    return(
      <div>
        <h2>{this.props.theTrip.title}</h2>
        <p>{this.props.theTrip.startDate}</p>
        <p>{this.props.theTrip.endDate}</p>
        <p>{this.props.theTrip.destination}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { theTrip: state.theTrip[0] }
}

export default connect(mapStateToProps)(ItineraryList)
