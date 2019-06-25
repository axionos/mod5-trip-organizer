import React from 'react';
import IndexPage from './IndexPage'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import MessagesPage from './MessagesPage'
import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
  state = {
    user: {}
  }

  componentDidMount(){
    if(!!localStorage.token){
      fetch('http://localhost:3000/profile', {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      })
      .then(resp => resp.json())
      .then(user => {
        this.setState({ user })
      })
    }
  }

  render(){
    // console.log('App Props', this.props)
    console.log('App state', this.state)

    return(
      <Switch>
        <Route
          exact path="/messages"
          component={MessagesPage}
          render={routerProps => <MessagesPage routerProps={routerProps}/>}
        />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route
          exect path="/"
          component={IndexPage}
          render={({ location, history, match }) => <IndexPage
           location={location}
           history={history}
           match={match}/>}
         />
      </Switch>
    )
  }
}

export default App;
