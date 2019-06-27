import React from 'react';
import { connect } from 'react-redux'
import { addTrip } from '../actions'
import { Link } from 'react-router-dom'

import Select from 'react-select'
// import makeAnimated from 'react-select/animated';
// import { Note } from '../styled-components';
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

  handleAddTrip = trip => {

  }

  render(){
    // console.log('AddTrip Props', this.props)
    console.log('AddTrip state', this.state)

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

const mapStateToProps = store => {
  return { trips: store.trips }
}

// export default AddTrip
export default connect(mapDispatchToProps, mapStateToProps)(AddTrip)
