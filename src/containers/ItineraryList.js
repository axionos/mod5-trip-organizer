import React from 'react';
import Item from '../components/Item';
import MapContainer from '../components/map/MapContainer';
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { getDays, getItems, addItem, deleteTheTrips } from '../actions/index.js'
import { Container, Grid, Menu, Segment, Icon, Modal, Button, Select, Form } from 'semantic-ui-react'

class ItineraryList extends React.Component {
  state = {
    activeItem: "1",
    place: '',
    latitude:'',
    longitude: '',
    submitted: false,
    dropdownId: "1",
    name:'',
    openNow: '',
    rating:'',
    photoRef:'',
    address: ''
  }

  // SETTING INITIAL STATE
  componentDidMount(){
    const id = this.props.theTrip.id
    fetch(`http://localhost:3000/days/${id}`, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      // console.log('returning data', data)
      this.props.getDays(data.days)
      this.props.getItems(data.items)
    })
  } // END SETTING


  // FIND THE PLACE INFO FROM API WHEN FORM SUBMITTED
  handleSubmitAddPlan = event => {
    event.preventDefault()
    const apiKey = 'AIzaSyBaGD-h-zdNd5SLcDto3jevpeaHXCNRpz4'
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const place = this.state.place
    fetch(`${proxyurl}https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${apiKey}&input=${place}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry`)
    .then(res => res.json())
    .then(data => {
      // debugger
      if(data.candidates.length === 0) {
        return alert('Oops! Please try a different place!')
      } else {

        if (data.candidates[0].opening_hours) {
          this.setState({
            openNow: data.candidates[0].opening_hours.open_now,
          })
        } else {
          this.setState({
            openNow: true
          })
        }

        if (data.candidates[0].rating) {
          this.setState({
            rating: data.candidates[0].rating
          })
        } else {
          this.setState({
            rating: 'Not Available'
          })
        }

        if (data.candidates[0].photos) {
          this.setState({
            photoRef: data.candidates[0].photos[0].photo_reference
          })
        } else {
          this.setState({photoRef: 'Not Available'})
        }

        this.setState({
          name: data.candidates[0].name,
          latitude: data.candidates[0].geometry.location.lat,
          longitude: data.candidates[0].geometry.location.lng,
          address: data.candidates[0].formatted_address,
        }, () => this.postTheItem()
      )
      }
    }) // end then
  } // END FINDING THE PLACE

  // POST ITEM IN THE BACKEND
  postTheItem = () => {
    fetch('http://localhost:3000/new_item', {
      method: "POST",
      headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        item: {
          place: this.state.name,
          address: this.state.address,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          open_now: this.state.openNow,
          rating: this.state.rating,
          photo: this.state.photoRef,
          day_id: this.state.dropdownId
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      // debugger
      this.props.addItem(data)
      this.updateDayToDisplay()
    })
  } // END POSTING

  // GENERATE DAYS
  genDays = () => {
    return this.props.days.map(day => {
      const { activeItem } = this.state
      return (
        <Menu.Item
          name={day.day}
          active={activeItem === day.day}
          onClick={this.handleDayClick}
          id={day.id}
          key={day.id}
          day={day}
        >
          Day {day.day}
        </Menu.Item>
      )
    })
  } // END GENERATING DAYS

  // GENERATE ITEMS
  genItems = () => {
    return this.props.items.map(item => {
      return  <div className="item-container" key={item.id}>
                <Item key={item.id} item={item} />
              </div>
    })
  } // END GENERATING ITEMS

  // FETCH THE ITEM INFO ON CLICK
  handleDayClick = (e, { name }) => {
    // don't need update day because i'm using 'dropdownId' as day_id
    // 'dropdownId' is set from the 'add form' dropdown

    const dayId = e.target.id
    fetch(`http://localhost:3000/items/${dayId}`, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      this.props.getItems(data)
      this.setState({
        activeItem: name,
      })
    })
  } // END FETCHING

  // SHOW THE UPDATED DAY TAB AFTER NEW ITEM IS ADDED
  updateDayToDisplay = (e) => {
    const dayId = this.state.dropdownId
    fetch(`http://localhost:3000/items/${dayId}`, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      this.props.getItems(data)
      this.setState({
        activeItem: this.state.value,
        submitted: true
      })
    })
  } // END SHOWING

  // UPDATE VALUE AND DROPDOWN ID
  handleChangeDropdown = (e, {value}) => {
    this.setState({ value })
    this.setState({
      dropdownId: e.target.id
    })
    console.log(e.target)
  } // END UPDATING

  // UPDATE STATE FROM THE FORM PLACE INPUT
  handleChangeInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  } // END UPDATING

  // RESET THE TRIP ARRAY
  handleClickHome = () => {
    this.props.deleteTheTrips()
  }
  // END RESETTING

  render(){
    // console.log('Itinerary List State', this.state)
    // console.log('Itinerary List Props', this.props)

    // WHEN THE FORM IS SUBMITTED, REDIRECT AND RESET THE STATE
    if (this.state.submitted) {
      this.setState({
        submitted: false
      })
      return <Redirect to='/itinerary' />
    }
    // END RESETTING THE STATE

    const { value } = this.state
    const options = this.props.days.map(day => {
      return  {key: day.id, id: day.id, text: day.day, value: day.day}
    })

    return(
      <React.Fragment>
        <div className='itinerary-header-wrapper'>

          <Container className='i-header-wrapper'>
            <div className='i-header-container'>
              <div className='i-header-bg' />
              <h2 className="capitalize">{this.props.theTrip.title}</h2>
            </div>
            <div className='itinerary-h-right'>
              <p className='period'>{this.props.theTrip.startDate} ~ {this.props.theTrip.endDate}</p>
              <p>{this.props.theTrip.destination}</p>
            </div>
          </Container>
          <div className='black'></div>
        </div>
        <Container className='itinerary page-container'>
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Link to='/' onClick={this.handleClickHome}>
                <Icon name='arrow left' size='small'/>
                Back
              </Link>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              {/* ADD A PLAN */}
              <Modal
              closeIcon
              size="tiny"

              trigger={<Button positive className='add-plan-btn'><Icon name='plus' size='small' />Add an Itinerary</Button>}>
                <Modal.Header>Add a Plan</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Form onSubmit={this.handleSubmitAddPlan}>

                      <Form.Field control={Select} label='Day' options={options} placeholder='Select a Day' onChange={this.handleChangeDropdown} />

                      <Form.Field>
                        <label>Destination</label>
                        <input
                          type="text"
                          name="place"
                          value={this.state.title}
                          placeholder="Enter Your Itinerary"
                          onChange={this.handleChangeInput}/>
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
              {/* ENDING ADD A PLAN */}

            </Grid.Column>
          </Grid>
          <Grid stackable>
            <Grid.Column width={2}>
              <Menu fluid vertical tabular>
                { this.genDays() }
              </Menu>
            </Grid.Column>
            <Grid.Column stretched width={14}>
              <Grid stackable>
                <Grid.Column floated='left' width={8}>

                    <MapContainer items={this.props.items}/>

                </Grid.Column>
                <Grid.Column floated='right' width={8}>
                  <Segment>
                    { this.props.items.length === 0 ? <p className='no-plan'>There's no plan for this day, yet. Please add one!</p> : this.genItems() }
                    { /*this.genItems() */ null}
                  </Segment>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </Container>
    </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDays: days => {
      dispatch(getDays(days))
    },
    getItems: items => {
      dispatch(getItems(items))
    },
    addItem: item => {
      dispatch(addItem(item))
    },
    deleteTheTrips: () => {
      dispatch(deleteTheTrips())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    theTrip: state.theTrip[0],
    days: state.days,
    items: state.items
    // theDay: state.theDay
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItineraryList))

// // CALCULATE HOW MANY DAYS THERE ARE IN BETWEEN TWO DATES
// const startDate = Moment(this.props.theTrip.startDate, "YYYY-MM-DD")
// const endDate = Moment(this.props.theTrip.endDate, "YYYY-MM-DD")
// const answer = endDate.diff(startDate, 'days')
// console.log(answer)
// // END CALCULATING
