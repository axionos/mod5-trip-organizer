import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AddTrip extends React.Component {

  render(){
    // console.log('AddTrip Props', this.props)
    return(
      <div>
        <form onSubmit={this.handleLogin}>
          <div>
            Title
            <input type="text" name="title" />
          </div>
          <div>
            Start Date
            <input type="text" name="start" />
          </div>
          <div>
            End Date
            <input type="text" name="end" />
          </div>
          <div>
            Country
            <input type="text" name="country" />
          </div>
          <input type="submit" value="Done" />
        </form>
      <Link to="/">Go back</Link>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return { trips: store.trips }
}

export default connect(mapStateToProps)(AddTrip)
