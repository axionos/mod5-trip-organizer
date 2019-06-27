import React from 'react';
import { connect } from 'react-redux'
import { addTrip } from '../actions'
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
      startDate: new Date(),
      endDate: new Date(),
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
    debugger
    fetch('http://localhost:3000/new_trip', {
      method: "POST",
      headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json'
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
    .then(resp => console.log("I AM RESP", resp))
    .then(trip => {
      this.props.addTrip(trip)
    })
  }

  render(){
    console.log('AddTrip Props', this.props)
    // console.log('Store status:', this.store)
    // console.log('AddTrip state', this.state)

    const {isSearchable} = this.state;
    return(
      <div>
        <form onSubmit={this.handleAddTrip}>
          <div>
            Title
            <input type="text" name="title" onChange={this.handleChangeTitle}/>
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
              // defaultValue={colourOptions[0]}

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

const mapDispatchToProps = dispatch => {
  return {
    addTrip: trip => {
      dispatch(addTrip(trip))
    }
  }
}

const mapStateToProps = state => {
  console.log('is this state?')
  return {
    trips: state.trips,
    user: state.user
  }
}

// export default AddTrip
export default connect(mapStateToProps, mapDispatchToProps)(AddTrip)
