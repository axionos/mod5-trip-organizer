import React from 'react';
import Item from './Item';
import { connect } from 'react-redux'
// import Moment from 'moment'


class Day extends React.Component {
  state = {
    items: []
  }

  componentDidMount(){
    const id = this.props.day.id
    fetch(`http://localhost:3000/items/${id}`, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log('items', data)
      this.setState({
        items: data
      })
    })
  }

  genItem = () => {
    return this.state.items.map(item => {
        return <Item ***REMOVED***={this.state.id} item={item}/>
      }
    )
  }

  render(){
    console.log('Day State', this.state)
    console.log('Day Props', this.props)

    return(

      <div>
        <h3>Day {this.props.day.day}</h3>
        {null/*this.genItem()*/}


      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getTrip: trip => {
    //   dispatch(getTrip(trip))
    // }
  }
}

const mapStateToProps = state => {
  return {
    trips: state.trips,
    days: state.days
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Day)
