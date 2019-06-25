import React from 'react';
import { Link } from 'react-router-dom'

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
    console.log('Index Props', this.props)
    return (
      <div>
        Hello {this.props.user.username} from IndexPage
        <Link to="/messages">See Messages</Link>
      </div>
    )
  }
}
export default IndexPage
