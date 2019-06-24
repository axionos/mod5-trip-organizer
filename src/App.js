import React from 'react';
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

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
    if(this.state.page === 'index'){
      return "Hello from INDEX"
    } else if(this.state.page === 'signup'){
      return <SignupPage redirect={this.redirect} />
    } else if(this.state.page === 'login'){
      return <LoginPage redirect={this.redirect} />
    }
  }
}

export default App;
