import React from 'react';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: ''
  }

  componentDidMount(){
    // IF THERE IS A TOKEN REDIRECT TO THE INDEX
    if(!!localStorage.getItem("token")) {
      this.props.history.push("/")
    }
  } // END REDIRECTING

  // UPDATE STATE WHEN THE FORM INPUT IS FILLED
  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  } // END UPDATING

  // SAVE THE TOKEN INTO THE LOCAL STORAGE WHEN LOGGING IN
  handleLogin = event => {
    console.log('Submitted')
    event.preventDefault()

    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(data => {
      // take the token back from the data
      localStorage.setItem('token', data.token)

      if (localStorage.getItem("token") === "undefined") {
        localStorage.clear()
      } else if (!!localStorage.getItem("token")) {
        window.location.replace(`http://localhost:3001/`)
      }
    })
  } // END SAVING

  render(){
    // console.log(this.state)
    console.log('Login Page Props', this.props)

    return(
      <div>
        Please Log In!!
        <form onSubmit={this.handleLogin}>
          <input type="text" name="username" onChange={this.handleChange}/>
          <input type="password" name="password" onChange={this.handleChange}/>
          <input type="submit" value="Log In" />
        </form>
        <a href="/signup">Sign Up</a>
      </div>
    )
  }
}

export default LoginPage
