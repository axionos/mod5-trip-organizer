import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Marker from "./Marker";

const Map = withScriptjs(withGoogleMap((props) =>{

  const markers = props.items.map( item => <Marker
                    ***REMOVED***={item.id}
                    item={item}
                    location={{lat:parseFloat(item.latitude), lng: parseFloat(item.longitude)}}
                    // location={{lat: item.closestPractice.lat, lng: item.closestPractice.lon}}
                  />);
  console.log('Map Props', props);
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

export default Map;
