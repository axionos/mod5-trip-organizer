import React from 'react';
import Day from '../components/Day'
// import Moment from 'moment'
import { connect } from 'react-redux'
import { Container, Grid, Menu, Segment } from 'semantic-ui-react'
import { getDays } from '../actions/index.js'

class ItineraryList extends React.Component {

  state = { activeItem: "1" }

  componentDidMount(){
    const id = this.props.theTrip.id
    fetch(`http://localhost:3000/days/${id}`, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => this.props.getDays(data))
  }

  // GENERATE DAY COMPONENT
  genDays = () => {
    return this.props.days.map(day => {
      // return <Day day={trip} key={trip.day}/>
      const { activeItem } = this.state
      return (
        <Menu.Item name={day.day} active={activeItem === day.day}  onClick={this.handleItemClick} key={day.id}>
          Day {day.day}
        </Menu.Item>
      )
    })
  } // END GENERATING

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    console.log('Itinerary List State', this.state)
    console.log('Itinerary List Props', this.props)

    return(
      <Container className='page-container'>
        <h2>{this.props.theTrip.title}</h2>
        <p>{this.props.theTrip.startDate}</p>
        <p>{this.props.theTrip.endDate}</p>
        <p>{this.props.theTrip.destination}</p>
        <div>
          {/* this.genDays()*/ null }
        </div>

        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              { this.genDays() }
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment>
              This is an stretched grid column. This segment will always match the tab height
            </Segment>
          </Grid.Column>
        </Grid>


      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDays: days => {
      dispatch(getDays(days))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    theTrip: state.theTrip[0],
    days: state.days
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryList)

// // CALCULATE HOW MANY DAYS THERE ARE IN BETWEEN TWO DATES
// const startDate = Moment(this.props.theTrip.startDate, "YYYY-MM-DD")
// const endDate = Moment(this.props.theTrip.endDate, "YYYY-MM-DD")
// const answer = endDate.diff(startDate, 'days')
// console.log(answer)
// // END CALCULATING
