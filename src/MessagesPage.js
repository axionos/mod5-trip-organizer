import React from 'react';
import { Link } from 'react-router-dom'

class MessagesPage extends React.Component {

  render(){
    console.log('MessagesPage Props', this.props)
    return(
      <div>
        Hello {this.props.user.username} from IndexPage
        <Link to="/">See Index</Link>
      </div>
    )
  }
}

export default MessagesPage
