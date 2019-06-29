import React from 'react';
import { Button, Form, Grid, Header, Image, Segment, Message, Icon } from 'semantic-ui-react'


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
      // this.props.history.push('/')

      // if username or password are NOT empty, redirect to login
      if (this.state.username.length !== 0 && this.state.password.length !== 0) {
        window.location.replace(`http://localhost:3001/login`)
      } else {
        // alert('Username and password cannot be blank')
        return <Message negative>
          <Message.Header>We're sorry we can't apply that discount</Message.Header>
          <p>That offer has expired</p>
        </Message>
      }
      // alert
      // or push them back to login
    })
  }

  render(){
    return(

      <div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' / > Sign Up
            </Header>
            <Form size='large' onSubmit={this.handleSignUp} className='attached fluid segment'>
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

                <Button color='teal' fluid size='large'>
                  Sign Up
                </Button>

              </Segment>
            </Form>
            <Message attached='bottom' warning>
              <Icon name='help' />
              Already signed up?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
            </Message>

          </Grid.Column>
        </Grid>
      </div>

    )
  }
}

export default SignupPage


//
// <div>
//   Please Sign Up!
//   <form onSubmit={this.handleSignUp}>
//     <div>
//       Username
//       <input type="text" name="username" onChange={this.handleChange}/>
//     </div>
//     <div>
//       Password
//       <input type="password" name="password" onChange={this.handleChange}/>
//     </div>
//     <input type="submit" value="Sign Up" />
//   </form>
// </div>
