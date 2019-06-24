import React from 'react';

class IndexPage extends React.Component {

  // SEND A GET REQUEST TO THE PROFILE WITH THE TOKEN
  componentDidMount(){
    fetch('http://localhost:3000/profile', {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(resp => resp.json())
    .then(console.log)
  } // END SENDING

  render() {
    return "Hello from Index Page"
  }
}
export default IndexPage
