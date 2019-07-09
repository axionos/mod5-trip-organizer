import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
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

  renderPhoto = () => {
    const ***REMOVED*** = 'AIzaSyBaGD-h-zdNd5SLcDto3jevpeaHXCNRpz4'
    const photoRef = this.props.item.photo
    const photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&***REMOVED***=${***REMOVED***}`
    return photo
  }
  render(){
    // console.log('Item State', this.state)
    console.log('Item Props', this.props)

    return(

      <div className='itinerary-wrapper'>

          <div className='photo-holder'>
            { this.props.item.photo === 'Not Available' ? <img src='https://unlimitedpassion.co.uk/wp-content/uploads/2016/06/placeholder4.png' alt='placeholder' /> : <img src={this.renderPhoto()} alt={this.props.item.place}/> }
          </div>

          <div className='item-header-container'>
            <div className='item-header-conts'>
              <h3 className="item-place">{this.props.item.place}</h3>
              <Icon link
                onClick={this.handleClickDelete}
                className='item-delete-btn'
                name='x'
                
              />
            </div>
            <div className='item-conts-container'>
              <p>{this.props.item.address}</p>
              <p>Rating: {this.props.item.rating} / 5</p>
              { this.props.item.open_now ? <p className='open'> Open </p>: <p className='closed'>Closed</p> }
            </div>
          </div>

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
