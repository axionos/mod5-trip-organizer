import React from 'react';
import { connect } from 'react-redux'
// import { addTrip } from '../actions'
import { Link } from 'react-router-dom'

import Select from 'react-select'
import { countryOptions } from '../data';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class AddTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startDate: "",
      endDate: "",
      destination: ""
    };
  }

  // UPDATE TRIP TITLE
  handleChangeTitle = event => {
    this.setState({
      title: event.target.value
    })
  }

  // UPDATE START DATE
  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date
    });
  }

  // UPDATE END DATE
  handleChangeEndDate = (date) => {
    this.setState({
      endDate: date
    });
  }

  // UPDATE DESTINATION
  handleDestinationSelector = event => {
    this.setState({
      destination: event.value
    })
  }

  // SEND THE CURRENT STATE TO MAPDISPATCHTOSTATE TO PROPS
  handleAddTrip = event => {
    event.preventDefault()
    // this.props.addTrip(this.state)

    fetch('http://localhost:3000/new_trip', {
      method: "POST",
      headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
          trip: {
            title: this.state.title,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            destination: this.state.destination,
            user_id: this.props.user.id
          }
        // store_id:e.target.id
        })
    })
    .then(resp => resp.json())
    .then(alert("New Trip is Successfully Added!"))
    window.location.replace(`http://localhost:3001/`)
  }

  render(){
    // console.log('AddTrip Props', this.props)
    // console.log('AddTrip state', this.state)

    const {isSearchable} = this.state;
    return(
      <div>
        <form onSubmit={this.handleAddTrip}>
          <div>
            Title
            <input type="text" name="title" value={this.state.title} onChange={this.handleChangeTitle}/>
          </div>
          <div>
            Start Date
            <DatePicker selected={this.state.startDate}
            onChange={this.handleChangeStartDate} />
          </div>
          <div>
            End Date
            <DatePicker selected={this.state.endDate}
            onChange={this.handleChangeEndDate} />
          </div>
          <div>
            Destination

            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={this.state.destination}
              isSearchable={isSearchable}
              name="color"
              options={countryOptions}
              onChange={this.handleDestinationSelector}
            />
          </div>
          <input type="submit" value="Done" />
        </form>
      <Link to="/">Go back</Link>
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     addTrip: trip => {
//       dispatch(addTrip(trip))
//     }
//   }
// }

const mapStateToProps = state => {
  return {
    trips: state.trips,
    user: state.user
  }
}

// export default AddTrip
export default connect(mapStateToProps)(AddTrip)
