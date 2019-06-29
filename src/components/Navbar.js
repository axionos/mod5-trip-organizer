import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Container,
  Image,
  Menu,
} from 'semantic-ui-react'

class Navbar extends React.Component {
  // CONDITIONALLY RENDER MY TRIP
  myTrip = () => {
    if (localStorage.getItem('token')){
      // return <NavLink to="/" exact>My Trips</NavLink>
      return <NavLink to="/" exact>My Trips</NavLink>
    } else {
      return
    }
  } // END RENDERING

  // CONDITIONALLY RENDER MY SIGNOUT BUTTON
  signOut = () => {
    if (localStorage.getItem('token')){
      return <p onClick={this.handleLogOut}>SignOut</p>
    } else {
      return
    }
  } // END RENDERING

  // LOG OUT - CLEAR LOCAL STORAGE AND REDIRECT TO THE MAIN
  handleLogOut = () => {
    localStorage.clear()
    window.location.replace('http://localhost:3001/')
  } // END LOG OUT

  render(){
    // console.log('Navbar props', this.props);
    return(
      <div className="navbar">


        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
              Trip Planner
            </Menu.Item>
            <Menu.Item as='a'>{this.myTrip()}</Menu.Item>
            <Menu.Item as='a'>{this.signOut()}</Menu.Item>
          </Container>
        </Menu>
      </div>
    )
  }
}

export default Navbar
