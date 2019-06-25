import React from 'react'
import IndexPage from './IndexPage'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import MessagesPage from './MessagesPage'
import NoMatch from './NoMatch'
import { Switch, Route } from 'react-router-dom'

class Navbar extends React.Component {
  render(){
    console.log('Navbar props', this.props);
    return(
      <Switch>
        <Route exact
          path="/messages"
          render={routerProps => <MessagesPage user={this.props.user}/>}
        />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exect
          path="/"
          render={routerProps => <IndexPage user={this.props.user}/>}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export default Navbar
