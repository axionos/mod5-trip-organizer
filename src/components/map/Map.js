import React from "react";
import { connect } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Marker from "./Marker";

const Map = withScriptjs(withGoogleMap((props) =>{

  const markers = props.items.map( item => {
    return <Marker
            ***REMOVED***={item.id}
            item={item}
            location={{lat:parseFloat(item.latitude), lng: parseFloat(item.longitude)}}
          />
  });

  console.log('Map Props', props.items);
  return (
      <React.Fragment>

      {props.items.length === 0 ? null :

      <GoogleMap
        defaultZoom={12}
        center={{ lat:  parseFloat(props.items[0].latitude), lng: parseFloat(props.items[0].longitude) }}
      >
        { markers }
      </GoogleMap>



    }
</React.Fragment>
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
