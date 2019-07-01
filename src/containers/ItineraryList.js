import React from 'react';
// import Moment from 'moment'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

class ItineraryList extends React.Component {

  componentDidMount(){
    const id = this.props.theTrip.id
    fetch(`http://localhost:3000/days/${id}`, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }


  render(){
    console.log('Itinerary List Props', this.props)

    return(
      <Container className='page-container'>
        <h2>{this.props.theTrip.title}</h2>
        <p>{this.props.theTrip.startDate}</p>
        <p>{this.props.theTrip.endDate}</p>
        <p>{this.props.theTrip.destination}</p>
      </Container>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     getTrip: trip => {
//       dispatch(getTrip(trip))
//     }
//   }
// }

const mapStateToProps = (state) => {
  return { theTrip: state.theTrip[0] }
}

export default connect(mapStateToProps)(ItineraryList)

// // CALCULATE HOW MANY DAYS THERE ARE IN BETWEEN TWO DATES
// const startDate = Moment(this.props.theTrip.startDate, "YYYY-MM-DD")
// const endDate = Moment(this.props.theTrip.endDate, "YYYY-MM-DD")
// const answer = endDate.diff(startDate, 'days')
// console.log(answer)
// // END CALCULATING
