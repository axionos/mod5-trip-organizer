import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Menu, Icon, Input } from 'semantic-ui-react'

class Navbar extends React.Component {
  // CONDITIONALLY RENDER MY TRIP
  myTrip = () => {
    if (localStorage.getItem('token')){
      // return <NavLink to="/" exact>My Trips</NavLink>
      return <Menu.Item as='a'>
              <NavLink to="/" exact>My Trips</NavLink>
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

  render(){
    // console.log('Navbar props', this.props);
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
                <Input icon={{ name: 'search', circular: true, link: true }} placeholder='Search...' />
              </div>
              {this.myTrip()}
              {this.signOut()}
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    )
  }
}

export default Navbar
