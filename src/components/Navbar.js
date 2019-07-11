import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Menu, Icon, Search } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getTheTrip, deleteTheTrips } from '../actions'
import _ from 'lodash'


class Navbar extends React.Component {
  state = {
    search: ''
  }

  // RESET THE TRIP ARRAY
  handleClickHome = () => {
    this.props.deleteTheTrips()
  }
  // END RESETTING

  // CONDITIONALLY RENDER MY TRIP
  myTrip = () => {
    if (localStorage.getItem('token')){
      // return <NavLink to="/" exact>My Trips</NavLink>
      return <Menu.Item as='a'>
              <NavLink to="/" exact
                onClick={this.handleClickHome}
              >My Trips</NavLink>
            </Menu.Item>
    } else {
      return
    }
  } // END RENDERING

  // CONDITIONALLY RENDER MY SIGNOUT BUTTON
  signOut = () => {
    if (localStorage.getItem('token')){
      return <Menu.Item as='a'>
                <p onClick={this.handleLogOut}>SignOut</p>
             </Menu.Item>
    } else {
      return
    }
  } // END RENDERING

  // LOG OUT - CLEAR LOCAL STORAGE AND REDIRECT TO THE MAIN
  handleLogOut = () => {
    localStorage.clear()
    window.location.replace('http://localhost:3001/')
  } // END LOG OUT

  handleChangeSearch = (e, {value}) => {
    this.setState({
      search: value
    }, () => {this.searchTrip()})
  }

  // let theTrips = trip.title.includes(this.state.search.toLowerCase() || trip.destination.includes(this.state.search.toLowerCase()))
  searchTrip = () => {
    // console.log(this.state.search)
    // console.log(this.props.trips);
    let theTrips = this.props.trips.filter(trip => {
      return trip.destination.toLowerCase().includes(this.state.search) || trip.title.toLowerCase().includes(this.state.search)
    })
    // debugger
    this.props.getTheTrip(theTrips)
  }




  render(){
    console.log('Navbar props', this.props);
    // console.log('Navbar state', this.state);
    return(
      <div className="navbar">
        <Menu borderless fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Icon name='paper plane' className='nav-plane'/>
                My Trip Planner
            </Menu.Item>
            <Menu.Menu position='right'>
              <div className='search-container'>
                <Search
                  icon={{ name: 'search', circular: true}}
                  placeholder='Search your trip...'
                  onSearchChange={_.debounce(this.handleChangeSearch, 500)}>
                </Search>
              </div>
              <div className='theMenu'>
                {this.myTrip()}
                {this.signOut()}
              </div>
              <div className='sidebar-btn-container'>
                <Icon
                name='bars'
                size='large'
                className='side-bar-btn'
                onClick={this.props.toggleSidebar} />
              </div>

            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTheTrip: trip => {
      dispatch(getTheTrip(trip))
    },
    deleteTheTrips: () => {
      dispatch(deleteTheTrips())
    }
  }
}

const mapStateToProps = state => {
  return {
    trips: state.trips,
    // user: state.user,
    theTrip: state.theTrip
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
