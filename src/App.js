import React from 'react';
import Navbar from './components/Navbar'
import TripList from './containers/TripList'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ItineraryList from './containers/ItineraryList'
import { getUser } from './actions'
import NoMatch from './NoMatch'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Container, Menu, Icon, Search, Button, Segment, Sidebar, Header, Image } from 'semantic-ui-react'


class App extends React.Component {
  state = {
    user: {},
    visible: false
  }

  // FETCHING USER INFO
  componentDidMount(){
    if(!!localStorage.token){
      fetch('http://localhost:3000/profile', {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      })
      .then(resp => resp.json())
      .then(user => {
        // console.log('user info:', user);
        this.props.getUser(user)

      })
    }
  } // END FETCHING

  handleShowClick = () => this.setState({ visible: !this.state.visible })

  render(){
    const { visible } = this.state
    // console.log('App Props', this.props)
    console.log('App state', this.state)

    return(
      <div class='root-wrapper'>
      <Sidebar.Pushable as={Segment}>
        <Sidebar.Pusher>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='paper plane' />
              My Trips
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='sign out' />
              Sign Out
            </Menu.Item>
          </Sidebar>
          <Navbar
            user={this.props.user}
            toggleSidebar={this.handleShowClick}
          />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/itinerary" component={ItineraryList}/>
            <Route exect
              path="/"
              render={props => <TripList {...props}
                user={this.props.user} />}
            />
            <Route component={NoMatch} />
          </Switch>

        </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: user => {
      dispatch(getUser(user))
    }
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App;
