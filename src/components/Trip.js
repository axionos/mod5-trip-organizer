import React from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

class Trip extends React.Component {

  render(){
    console.log('Trip Props', this.props)
    return(
      <div>
        Trip Component
      </div>
    )
  }
}

const mapStateToProps = store => {
  return { trips: store.trips[0] }
}

export default connect(mapStateToProps)(Trip)
