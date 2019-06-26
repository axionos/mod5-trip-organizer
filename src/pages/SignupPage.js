import React from 'react';

class SignupPage extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    console.log(e.target.name)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignUp = e => {
    e.preventDefault()

    fetch('http://localhost:3000/signup',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then( res => res.json() )
    .then( data => {
      // if successful, token will be recieved
      // localStorage.setItem('token', data.token)
      window.location.replace(`http://localhost:3001/login`)
      // this.props.history.push('/')
      //after sign up pushed to the login page
    })
  }

  render(){
    return(
      <div>
        Please Sign Up!
        <form onSubmit={this.handleSignUp}>
          <div>
            Username
            <input type="text" name="username" onChange={this.handleChange}/>
          </div>
          <div>
            Password
            <input type="password" name="password" onChange={this.handleChange}/>
          </div>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}

export default SignupPage
