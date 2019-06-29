import React from 'react';
import Moment from 'moment'
import { connect } from 'react-redux'

class ItineraryList extends React.Component {
  render(){
    console.log('Itinerary List Props', this.props)

    // // CALCULATE HOW MANY DAYS THERE ARE IN BETWEEN TWO DATES
    // const startDate = Moment(this.props.theTrip.startDate, "YYYY-MM-DD")
    // const endDate = Moment(this.props.theTrip.endDate, "YYYY-MM-DD")
    // const answer = endDate.diff(startDate, 'days')
    // console.log(answer)
    // // END CALCULATING

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
