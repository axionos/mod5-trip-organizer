import React from 'react';
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends React.Component {
  static defaultProps = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };

  render(){
    // console.log('Map State', this.state)
    // console.log('Map Props', this.props)

    return(

      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ ***REMOVED***: 'AIzaSyBaGD-h-zdNd5SLcDto3jevpeaHXCNRpz4' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getTrip: trip => {
    //   dispatch(getTrip(trip))
    // }
  }
}

const mapStateToProps = state => {
  return {
    // trips: state.trips,
    // days: state.days
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
