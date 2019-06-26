import React from 'react'
import { NavLink } from 'react-router-dom'


class Navbar extends React.Component {
  // CONDITIONALLY RENDER MY TRIP
  myTrip = () => {
    if (localStorage.getItem('token')){
      return <NavLink to="/" exact>My Trips</NavLink>
    } else {
      return
    }
  } // END RENDERING

  // CONDITIONALLY RENDER MY SIGNOUT BUTTON
  signOut = () => {
    if (localStorage.getItem('token')){
      return <button onClick={this.handleLogOut}>SignOut</button>
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
      {this.myTrip()}
      {this.signOut()}

    </div>
    )
  }
}

export default Navbar
