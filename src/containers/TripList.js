import React from 'react';
import Trip from '../components/Trip'
import { connect } from 'react-redux'
import { getTrip, addTrip } from '../actions'
import { Container, Icon, Button, Modal, Form } from 'semantic-ui-react'
// BELOW ARE FOR THE ADD TRIP FORM
import Select from 'react-select'
import { countryOptions } from '../data';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TripList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startDate: "",
      endDate: "",
      destination: ""
    };
  }

  // SEND A GET REQUEST TO THE TRIP PAGE WITH THE TOKEN
  componentDidMount(){
    if (!localStorage.getItem("token")) {
      window.location.replace("http://localhost:3001/login")
    }
    // FETCHING TRIPS FROM THE DATABASE
    fetch('http://localhost:3000/trips', {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(resp => resp.json())
    .then(trip => {
      // console.log("trip is",trip);
      this.props.getTrip(trip)
    })
  } // END FETCHING

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
  } // END FETCHING

  // GENERATE TRIPS
  genTrip = () => {
    return this.props.trips.map(trip => {
      return <Trip
        ***REMOVED***={trip.id}
        trip={trip}
        handleClickEditBtn={this.handleClickEditBtn}
      />
    })
  } // END GENERATING

  render() {
    console.log('Trip List Props', this.props)
    // console.log('number of trips: ', this.props.trips.length);
    const {isSearchable} = this.state;
    return (
      <React.Fragment>
        <Container className="page-header">
          <div className="flex-container">
            { this.props.trips.length > 1 ? <h1>My Trips</h1> : <h1>My Trip</h1> }

            <Modal
            closeIcon
            size="tiny"
            trigger={<Button primary><Icon name='plus' size='small' />Add a Trip</Button>}>
            <Modal.Header>Add a Trip</Modal.Header>
            <Modal.Content>
              <Modal.Description>

                <Form onSubmit={this.handleAddTrip}>
                  <Form.Field>
                    <label>Title</label>
                    <input type="text" name="title" value={this.state.title}
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
          </div>
        </Container>
        <Container>
          {this.props.trips ? this.genTrip() : null}
        </Container>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTrip: trip => {
      dispatch(getTrip(trip))
    },
    addTrip: trip => {
      dispatch(addTrip(trip))
    }
  }
}

const mapStateToProps = state => {
  return { trips: state.trips }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripList)

// <Link to="/add" className="add-trip">
//   <Button primary><Icon name='plus' size='small' />Add a Trip</Button>
// </Link>
