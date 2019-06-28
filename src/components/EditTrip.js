import React from 'react';
import { connect } from 'react-redux'
import Select from 'react-select'
import { countryOptions } from '../data';
import DatePicker from "react-datepicker";
import Moment from 'moment'


class EditTrip extends React.Component {
  constructor(props) {
    super(props);
    const startDate = Moment(this.props.theTrip.startDate, "YYYY-MM-DD")
    const endDate = Moment(this.props.theTrip.endDate, "YYYY-MM-DD")

    this.state = {
      title: this.props.theTrip.title,
      startDate: startDate._d,
      endDate: endDate._d,
      destination: this.props.theTrip.destination
    };
  }
  // CONVERTS COUNTRY NAME STRING TO AN OBJECT
  converter = countryNameStr => {
    return {value: countryNameStr, label: countryNameStr}
  } // END CONVERTING

  // UPDATE TRIP TITLE
  handleChangeTitle = event => {
    this.setState({
      [event.target.name]: event.target.value
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

  handleEditTrip = event => {
    event.preventDefault()
    const tripId = this.props.theTrip.id
    fetch(`http://localhost:3000/trips/${tripId}`, {
      method: "PATCH",
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
    .then(data => console.log(data))
      alert("The Trip is Successfully Edited!")
    window.location.replace(`http://localhost:3001/`)
  }


  render(){
    // "2019-06-03" -> MM/DD/YYYY

    // .format("MM-DD-YYYY")
    // console.log("startDate", startDate);
    // console.log(startDate.format("MM/DD/YYYY"))
    // const time = Moment(this.props.theTrip.startDate, "MM-DD-YYYY")
    // console.log(time)
    // console.log(this.props.theTrip.id)
    console.log('Edit Trip Props', this.props);
    console.log('Edit Trip State', this.state);

    const {isSearchable} = this.props;
    return(
      <div>
        <h3>Edit</h3>
        <form onSubmit={this.handleEditTrip}>
          <div>
            Title
            <input type="text" name="title" value={this.state.title} onChange={this.handleChangeTitle}/>
          </div>
          <div>
            Start Date
            <DatePicker selected={this.state.startDate}
            onChange={this.handleChangeStartDate}/>
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
              defaultValue={this.converter(this.props.theTrip.destination)}
              isSearchable={isSearchable}
              name="color"
              options={countryOptions}
              onChange={this.handleDestinationSelector}
            />
          </div>
          <input type="submit" value="Done" />
        </form>
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
    user: state.user,
    theTrip: state.theTrip[0]
  }
}

// export default EditTrip
export default connect(mapStateToProps)(EditTrip)
