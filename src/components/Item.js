import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Icon, Button } from 'semantic-ui-react'
import { getDays, getItems, addItem } from '../actions/index.js'


// import Moment from 'moment'


class Item extends React.Component {

  handleClickDelete = () => {
    const itemId = this.props.item.id
    fetch(`http://localhost:3000/items/${itemId}`, {
      method: "DELETE"
    })
    .then(this.props.history.location.pathname)
    .then(this.props.rerender())
    // .then(this.props.rerender())

  }

  render(){
    console.log('Item State', this.state)
    console.log('Item Props', this.props)

    return(

      <div>
        <h3 className="capitalize">{this.props.item.place}</h3>
        <p>{this.props.item.memo}</p>
        <Button onClick={this.handleClickDelete}>
          <Icon
            name='trash alternate outline'
            size='small' />
        </Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Item))
