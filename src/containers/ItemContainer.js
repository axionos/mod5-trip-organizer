import React from 'react';
import Item from '../components/Item'
import { connect } from 'react-redux'


class ItemContainer extends React.Component {


  render(){

    return(

      <div>

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
    // days: state.days
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
