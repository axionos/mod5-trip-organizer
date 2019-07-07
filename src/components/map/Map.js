import React from "react";
import { connect } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Marker from "./Marker";

const Map = withScriptjs(withGoogleMap((props) =>{

  const markers = props.items.map( item => {
    // return item.map(theItem => {
    //   return <Marker
    //           key={theItem.id}
    //           item={theItem}
    //           location={{lat:parseFloat(theItem.latitude), lng: parseFloat(theItem.longitude)}}
    //         />
    // })

      return <Marker
              key={item.id}
              item={item}
              location={{lat:parseFloat(item.latitude), lng: parseFloat(item.longitude)}}
            />

  });

  console.log('Map Props', props);
  // debugger
  return (
      <GoogleMap
        defaultZoom={12}
        center={ { lat:  40.7127753, lng: -74.0059728 } }
      >
        { markers }
      </GoogleMap>
    );
  }
))

const mapDispatchToProps = dispatch => {
  return {
    // getTrip: trip => {
    //   dispatch(getTrip(trip))
    // }
  }
}

const mapStateToProps = state => {
  return {
    // items: state.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
