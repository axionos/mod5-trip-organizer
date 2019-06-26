import React from 'react';
import Navbar from './components/Navbar'
import TripList from './containers/TripList'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AddTrip from './components/AddTrip'
import NoMatch from './NoMatch'
import { Switch, Route } from 'react-router-dom'


class App extends React.Component {
  state = {
    user: {}
  }

  // FETCHING USER INFO
  componentDidMount(){
    if(!!localStorage.token){
      fetch('http://localhost:3000/profile', {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      })
      .then(resp => resp.json())
      .then(user => {
        this.setState({
          user
        }/*,() => { console.log('here',this.state)}*/)
      })
    }
  } // END FETCHING

  render(){
    // console.log('App Props', this.props)
    // console.log('App state', this.state)

    return(
      <div>
        <Navbar user={this.state.user}/>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/add_trip" component={AddTrip}/>
          <Route exect
            path="/"
            render={props => <TripList {...props} user={this.state.user}/>}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

export default App;
