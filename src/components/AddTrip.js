import React from 'react';
import { connect } from 'react-redux'

class AddTrip extends React.Component {

  render(){
    // console.log('AddTrip Props', this.props)
    return(
      <div>
        Hello from ADD TRIP
      </div>
    )
  }
}

const mapStateToProps = store => {
  return { trips: store.trips }
}

export default connect(mapStateToProps)(AddTrip)
