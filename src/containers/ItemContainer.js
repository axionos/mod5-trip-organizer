import React from 'react';
import Item from '../components/Item'
import { connect } from 'react-redux'


class ItemContainer extends React.Component {
  // genItem = () => {
  //   // debugger
  //   return this.props.item.map(theItem => {
  //     return <Item ***REMOVED***={theItem.id} theItem={theItem} />
  //   })
  // }

  render(){
    // console.log('ItemContainer State', this.state)
    // console.log('ItemContainer Props', this.props)

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
