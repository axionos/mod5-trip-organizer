import React from 'react';
import Navbar from './Navbar'



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
      <div>
        <Navbar user={this.state.user}/>
      </div>
    )
  }
}

export default App;
