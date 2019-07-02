import React from 'react';

import { connect } from 'react-redux'
// import Moment from 'moment'


class Day extends React.Component {




  render(){
    // console.log('Item State', this.state)
    console.log('Item Props', this.props)

    return(

      <div>
        <h4>{this.props.item.place}</h4>
        <p>{this.props.item.memo}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Day)
