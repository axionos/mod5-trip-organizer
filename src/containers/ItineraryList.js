import React from 'react';
// import { Link } from 'react-router-dom'

class ItineraryList extends React.Component {

  // SEND A GET REQUEST TO THE PROFILE WITH THE TOKEN
  componentDidMount(){
    if (!localStorage.getItem("token")) {
      window.location.replace("http://localhost:3001/login")
    }

    fetch('http://localhost:3000/profile', {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(resp => resp.json())
    .then(console.log)
  } // END SENDING





  render() {
    console.log('Index Props', this.props)
    return (
      <div>
        Hello {this.props.user.username} from ItineraryList
        
      </div>
    )
  }
}
export default ItineraryList
