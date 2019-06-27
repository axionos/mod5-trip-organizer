import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { countryOptions } from '../data';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class AddTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      destination: []
    };
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
  handleDestinationSelector = (destinations) => {
    // console.log(countries); // array of objects
    return destinations.map(destination => {
      return this.setState({
        destination: [...this.state.destination, destination.value]
      })
    })
  }
  // console.log(theCountries)

  render(){
    // console.log('AddTrip Props', this.props)
    console.log('AddTrip state', this.state)

    const animatedComponents = makeAnimated();
    return(
      <div>

        <form onSubmit={this.handleLogin}>
          <div>
            Title
            <input type="text" name="title" />
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
              closeMenuOnSelect={false}
              components={animatedComponents}
              // defaultValue={countryOptions[4]}
              isMulti
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

const mapStateToProps = store => {
  return { trips: store.trips }
}

export default connect(mapStateToProps)(AddTrip)
