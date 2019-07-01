import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTheTrip, deleteTheTrip } from '../actions'
import { withRouter } from 'react-router-dom'
import { Icon, Button, Modal, Form } from 'semantic-ui-react'
import Select from 'react-select'
import { countryOptions } from '../data';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment'


class Trip extends React.Component {
  constructor(props) {
    super(props);
    // const startDate = Moment(this.props.theTrip.startDate, "YYYY-MM-DD")
    // const endDate = Moment(this.props.theTrip.endDate, "YYYY-MM-DD")

    this.state = {
      // title: this.props.theTrip.title,
      // startDate: startDate._d,
      // endDate: endDate._d,
      // destination: this.props.theTrip.destination
    };
  }

  // CONVERTS COUNTRY NAME STRING TO AN OBJECT
  converter = countryNameStr => {
    return {value: countryNameStr, label: countryNameStr}
  } // END CONVERTING

  // CALL DISPATCH TO PROPS ON CLICK
  handleClickEdit = (e) => {
    // console.log(this.props.trip.id);
    // selected trip info will be saved in the store on click
    this.props.getTheTrip(this.props.trip)
  } // END CALLING

  // DELETE THE TRIP
  handleClickDelete = () => {
    // console.log('selected trip id:',this.props.trip.id);

    // optimistically update the redux store
    this.props.deleteTheTrip(this.props.trip.id)

    // send delete fetch request
    const tripId = this.props.trip.id
    fetch(`http://localhost:3000/trips/${tripId}`, {
      method: "DELETE"
    })
  } // END DELETING


  // SEND TRIP INFO TO STORE
  handleClickTripDiv = e => {
    // console.log('clicking', e.target.id);

    // if click target has class name of two-btns
    if (e.target.className === 'two-btns') {
      return null
    } else {
      // this.props.history.push("/itinerary")
      // this.props.getTheTrip(this.props.trip)
      return null
    }
  } // END SENDING


  render(){
    console.log('Trip Props', this.props)
    const {isSearchable} = this.state;
    return(
      <div className="trip-container">
          <div
            className="trip-conts"
            onClick={this.props.handleClickTripDiv}
          >
            <h3>{this.props.trip.title}</h3>
            <p>{this.props.trip.startDate} ~ {this.props.trip.endDate}</p>
            <p>{this.props.trip.destination}</p>
            <div className="btn-container">
              <Link
                className="two-btns"
                to="/edit"
                onClick={this.handleClickEdit}
              >Edit Trip</Link>

              <Modal
              closeIcon
              size="tiny"
              trigger={
                <Button
                  primary size='tiny'
                  className='two-btns'
                  id={this.props.trip.id}
                  onClick={this.props.handleClickEditBtn}
                >
                  <Icon name='edit' size='small' />Edit
                </Button>
              }>
              <Modal.Header>Edit a Trip</Modal.Header>
              <Modal.Content>
                <Modal.Description>

                  <Form onSubmit={this.handleEditTrip}>
                    <Form.Field>
                      <label>Title</label>
                      <input type="text" name="title" defaultValue={this.props.trip.title}
                      placeholder="Enter a Trip Title" onChange={this.handleChangeTitle}/>
                    </Form.Field>
                    <Form.Field className="start-date">
                      <label>Start Date</label>
                      <DatePicker selected={this.state.startDate}
                      onChange={this.handleChangeStartDate} />
                    </Form.Field>
                    <Form.Field className="end-date">
                      <label>End Date</label>
                      <DatePicker selected={this.state.endDate}
                      onChange={this.handleChangeEndDate} />
                    </Form.Field>
                    <Form.Field>
                      <label>Destination</label>

                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={this.state.destination}
                        isSearchable={isSearchable}
                        name="color"
                        options={countryOptions}
                        onChange={this.handleDestinationSelector}
                      />
                    </Form.Field>
                    <div className='form-btn-container'>
                      <Button
                        type='submit'
                        positive icon='checkmark'
                        labelPosition='right'
                        content='Submit'>
                      </Button>
                    </div>
                  </Form>
                </Modal.Description>
              </Modal.Content>
            </Modal>



              <button
                onClick={this.handleClickDelete}
                className="two-btns"
              >Delete</button>
            </div>
          </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTheTrip: trip => {
      dispatch(getTheTrip(trip))
    },
    deleteTheTrip: tripId => {
      dispatch(deleteTheTrip(tripId))
    }
  }
}

const mapStateToProps = state => {
  return {
    trips: state.trips,
    user: state.user,
    theTrip: state.theTrip
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Trip))
