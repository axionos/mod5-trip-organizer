import React from 'react';
import Navbar from './components/Navbar'
import TripList from './containers/TripList'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AddTrip from './components/AddTrip'
import { getUser } from './actions'
import NoMatch from './NoMatch'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'


class App extends React.Component {
  // state = {
  //   user: {}
  // }

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
        console.log('user info:', user);
        this.props.getUser(user)
        
      })
    }
  } // END FETCHING

  render(){
    console.log('App Props', this.props)
    // console.log('App state', this.state)

    return(
      <div>
        <Navbar user={this.props.user}/>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/add_trip" component={AddTrip}/>
          <Route exect
            path="/"
            render={props => <TripList {...props}
              user={this.props.user} />}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: user => {
      dispatch(getUser(user))
    }
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App;
