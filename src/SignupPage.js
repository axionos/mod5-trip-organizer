import React from 'react';

class SignupPage extends React.Component {
  render(){
    return(
      <div>
        <form onSubmit={this.handleLogin}>
          <input type="text" name="username" onChange={this.handleChange}/>
          <input type="password" name="password" onChange={this.handleChange}/>
          <input type="submit" value="Log In" />
        </form>
      </div>
    )
  }
}

export default SignupPage
