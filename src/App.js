import React from 'react';
import IndexPage from './IndexPage'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
  state = {
      page: "login"
  }

  // UPDATE THE PAGE STATE
  redirect = page => {
    this.setState({
      page: page
    })
  } // END UPDATING


  render(){
    console.log('App Props', this.props)
  
    return(
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
    )
  }
}

export default App;
