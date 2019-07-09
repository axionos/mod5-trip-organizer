import React from 'react';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'

class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    error: false
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
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Please check your username and password.');
      }
    })
    .then(data => {
      // take the token back from the data
      localStorage.setItem('token', data.token)

      if (localStorage.getItem("token") === "undefined") {
        localStorage.clear()
      }else if (!!localStorage.getItem("token")) {
        window.location.replace(`http://localhost:3001/`)
      }
    })
    .catch((error) => {
      this.setState({error: true})
    });

  } // END SAVING


  render(){
    // console.log('Login Page State', this.state)
    // console.log('Login Page Props', this.props)

    return(
      <div className='login-wrapper'>
        <div className='cover' />
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form error size='large' onSubmit={this.handleLogin} className='attached fluid segment'>
              <Header as='h2' textAlign='center' className='login-header'>
                <Icon name='paper plane' className='login-plane'/>
                  Login to your account
              </Header>
              { this.state.error ? <Message
                error
                header='Something went wrong!'
                content='Please check your username and password.'
                /> : null
              }

              <Segment stacked>
                <Form.Input
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  name='username'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={this.handleChange}
                />

                <Button className='login-btn' fluid size='large'>
                  Login
                </Button>
              </Segment>

            </Form>
            <Message attached='bottom'>
              New to us? <a href='/signup'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
export default LoginPage

// OLD FORM
// <div>
//   Please Log In!!
//   <form onSubmit={this.handleLogin}>
//     <div>
//       Username
//       <input type="text" name="username" onChange={this.handleChange}/>
//     </div>
//     <div>
//       Password
//       <input type="password" name="password" onChange={this.handleChange}/>
//     </div>
//     <input type="submit" value="Log In" />
//   </form>
//   <a href="/signup">Sign Up</a>
// </div>
