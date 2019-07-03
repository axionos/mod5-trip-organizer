import React from 'react';
import Item from '../components/Item';
import MapContainer from '../components/map/MapContainer';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDays, getItems, addItem } from '../actions/index.js'
import { Container, Grid, Menu, Segment, Icon, Modal, Button, Select, Form } from 'semantic-ui-react'


class ItineraryList extends React.Component {
  state = {
    activeItem: "1",
    items: [],
    place: '',
    memo: '',
    // dayId: '',
    latitude:'',
    longitude: ''
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
      console.log('returning data', data)
      this.props.getDays(data.days)
      this.props.getItems(data.items)
      this.setState({
        items: data.items[0]
      })
    })
  } // END SETTING

  // FIND THE PLACE INFO FROM API WHEN FORM SUBMITTED
  handleSubmitAddPlan = event => {
    event.preventDefault()
    const ***REMOVED*** = 'AIzaSyBaGD-h-zdNd5SLcDto3jevpeaHXCNRpz4'
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const place = this.state.place
    fetch(`${proxyurl}https://maps.googleapis.com/maps/api/place/findplacefromtext/json?***REMOVED***=${***REMOVED***}&input=${place}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        latitude: data.candidates[0].geometry.location.lat,
        longitude: data.candidates[0].geometry.location.lng
        }, () => this.postTheItem()
      )
    }) // end then
  } // END FINDING THE PLACE

  // SAVING ITEM IN THE BACKEND
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
          place: this.state.place,
          memo: this.state.memo,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          day_id: this.state.value
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log('added this plan:', data)
      this.props.addItem(data)
    })
  } // END SAVING


  // GENERATE DAYS
  genDays = () => {
    return this.props.days.map(day => {
      const { activeItem } = this.state
      return (
        <Menu.Item
          name={day.day}
          active={activeItem === day.day}
          onClick={this.handleItemClick}
          id={day.id}
          ***REMOVED***={day.id}
          day={day}
        >
          Day {day.day}
        </Menu.Item>
      )
    })
  } // END GENERATING DAYS

  // GENERATE ITEMS
  genItems = () => {
    return this.state.items.map(item => {
      return  <div className="item-container" ***REMOVED***={item.id}>
                <Item ***REMOVED***={item.id} item={item} />
              </div>
    })
  } // END GENERATING ITEMS

  // FETCH THE ITEM INFO ON CLICK
  handleItemClick = (e, { name }) => {
    console.log(e.target)
    const dayId = e.target.id

    // don't need update day because i'm using 'value' as day_id
    // 'value' is set in the 'add form' dropdown
    // // UPDATE DAY
    // this.setState({
    //   dayId: dayId
    // })
    fetch(`http://localhost:3000/items/${dayId}`, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data =>
      { this.setState({
          activeItem: name,
          items: data
        })
      })
  } // END FETCHING

  handleChangeDropdown = (e, { value }) => this.setState({ value })

  // UPDATE STATE FROM THE FORM INPUT
  handleChangeInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  } // END UPDATING


  // handleSubmitAddPlan = event => {
  //   event.preventDefault()
  //   fetch('http://localhost:3000/new_item', {
  //     method: "POST",
  //     headers: {
  //       'Authorization': localStorage.getItem("token"),
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //         item: {
  //           place: this.state.place,
  //           memo: this.state.memo,
  //           day_id: this.state.value
  //         }
  //       })
  //   })
  //   .then(resp => resp.json())
  //   .then(data => {
  //     console.log('added this plan:', data)
  //     this.props.addItem(data)
  //   })
    //   alert("New Trip is Successfully Added!"))
    // window.location.replace(`http://localhost:3001/itinerary`)
  // }

  render(){
    console.log('Itinerary List State', this.state)
    console.log('Itinerary List Props', this.props)
    const { value } = this.state

    const options = this.props.days.map(day => {
      // debugger
      return  {***REMOVED***: day.day, text: day.day, value: day.id}
    })

    return(
      <React.Fragment>
        <div className='itinerary-header'>
          <Container className='flex-container'>
              <div>
                <h2>{this.props.theTrip.title}</h2>
              </div>
              <div className='itinerary-h-right'>
                <p>{this.props.theTrip.startDate} ~ {this.props.theTrip.endDate}</p>
                <p>{this.props.theTrip.destination}</p>
              </div>
          </Container>
        </div>
        <Container className='itinerary page-container'>
        <Grid>
          <Grid.Column floated='left' width={5}>
            <Link to='/'>
              <Icon name='arrow left' size='small'/>
              Back
            </Link>
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            {/* ADD A PLAN */}
            <Modal
            closeIcon
            size="tiny"

            trigger={<Button positive ><Icon name='plus' size='small' />Add</Button>}>
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
                    <Form.Field>
                      <label>Memo</label>
                      <Form.TextArea
                        name='memo'
                        onChange={this.handleChangeInput}
                        placeholder='Memo about this Itinerary' />
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
          <Grid>
            <Grid.Column width={3}>
              <Menu fluid vertical tabular>
                { this.genDays() }
              </Menu>
            </Grid.Column>

            <Grid.Column stretched width={13}>
              <Segment>
                <MapContainer items={this.state.items}/>
                { this.genItems() }

              </Segment>
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
    }
  }
}

const mapStateToProps = (state) => {
  return {
    theTrip: state.theTrip[0],
    days: state.days,
    items: state.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryList)

// // CALCULATE HOW MANY DAYS THERE ARE IN BETWEEN TWO DATES
// const startDate = Moment(this.props.theTrip.startDate, "YYYY-MM-DD")
// const endDate = Moment(this.props.theTrip.endDate, "YYYY-MM-DD")
// const answer = endDate.diff(startDate, 'days')
// console.log(answer)
// // END CALCULATING
