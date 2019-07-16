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

  // UPDATE THE STATE
  handleChangeSearch = (e, {value}) => {
    this.setState({
      search: value
    }, () => {this.searchTrip()})
  } // END UPDATING

  // SEARCH FOR THE RESULT
  searchTrip = () => {
    let theTrips = this.props.trips.filter(trip => {
      return trip.destination.toLowerCase().includes(this.state.search) || trip.title.toLowerCase().includes(this.state.search)
    })
    this.props.getTheTrip(theTrips)
  } // END SEARCHING


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
                  onSearchChange={_.debounce(this.handleChangeSearch, 500)}
                  showNoResults={false}
                />
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
