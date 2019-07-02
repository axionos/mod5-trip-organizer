import React from 'react';
// import ItemContainer from './ItemContainer'
import Item from '../components/Item';

// import Moment from 'moment'
import { connect } from 'react-redux'
import { Container, Grid, Menu, Segment } from 'semantic-ui-react'
import { getDays, getItems } from '../actions/index.js'

class ItineraryList extends React.Component {

  state = {
    activeItem: "1",
    items: []
  }

  componentDidMount(){
    const id = this.props.theTrip.id
    fetch(`http://localhost:3000/days/${id}`, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log('returning data', data)
      this.props.getDays(data.days)
      this.props.getItems(data.items)
      this.setState({
        items: data.items[0]
      })
    })
  }

  // GENERATE DAYS
  genDays = () => {
    return this.props.days.map(day => {
      // return <Day day={trip} ***REMOVED***={trip.day}/>
      const { activeItem } = this.state
      return (
        <Menu.Item name={day.day} active={activeItem === day.day}  onClick={this.handleItemClick} id={day.id} ***REMOVED***={day.id}>
          Day {day.day}
        </Menu.Item>
      )
    })
  } // END GENERATING DAYS

  // GENERATE ITEMS
  genItems = () => {
    return this.state.items.map(item => {
      // debugger
      return  <div className="item-container">
                <Item ***REMOVED***={item.id} item={item} />
              </div>

    })
  } // END GENERATING ITEMS

  // FETCH THE ITEM INFO
  handleItemClick = (e, { name }) => {
    console.log(e.target)
    const dayId = e.target.id
    fetch(`http://localhost:3000/items/${dayId}`, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data =>
      {
      // console.log('getting this data', data)
      this.setState({
        activeItem: name,
        items: data
      }
    )
    })
  } // END FETCHING

  render(){
    // console.log('Itinerary List State', this.state)
    // console.log('Itinerary List Props', this.props)

    return(
      <Container className='page-container'>
        <h2>{this.props.theTrip.title}</h2>
        <p>{this.props.theTrip.startDate}</p>
        <p>{this.props.theTrip.endDate}</p>
        <p>{this.props.theTrip.destination}</p>

        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              { this.genDays() }
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment>
              <div className="map-container">Render Map</div>
              { this.genItems() }
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
    },
    getItems: items => {
      dispatch(getItems(items))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    theTrip: state.theTrip[0],
    days: state.days,
    items: state.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryList)

// // CALCULATE HOW MANY DAYS THERE ARE IN BETWEEN TWO DATES
// const startDate = Moment(this.props.theTrip.startDate, "YYYY-MM-DD")
// const endDate = Moment(this.props.theTrip.endDate, "YYYY-MM-DD")
// const answer = endDate.diff(startDate, 'days')
// console.log(answer)
// // END CALCULATING
