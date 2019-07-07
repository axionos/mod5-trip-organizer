import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Icon, Button } from 'semantic-ui-react'
import { deleteItem } from '../actions/index.js'


// import Moment from 'moment'


class Item extends React.Component {

  handleClickDelete = () => {
    const itemId = this.props.item.id
    fetch(`http://localhost:3000/items/${itemId}`, {
      method: "DELETE"
    })
    .then(this.props.deleteItem(this.props.item))
  }

  render(){
    console.log('Item State', this.state)
    console.log('Item Props', this.props)

    return(

      <div>
        <h3 className="capitalize">{this.props.item.place}</h3>
        <p>{this.props.item.address}</p>
        <p>{this.props.item.open_now ? 'Now Open' : 'Closed for Today'}</p>
        <p>Rating: {this.props.item.rating} / 5.0</p>
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
    deleteItem: item => {
      dispatch(deleteItem(item))
    }
  }
}

const mapStateToProps = state => {
  return {
    // days: state.days
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Item))
