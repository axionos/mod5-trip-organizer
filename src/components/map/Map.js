import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Marker from "./Marker";

const Map = withScriptjs(withGoogleMap((props) =>{

  const markers = props.items.map( item => <Marker
                    key={item.uid}
                    item={item}
                    location={{lat:item.latitude, lng: item.longitude}}
                    // location={{lat: item.closestPractice.lat, lng: item.closestPractice.lon}}
                  />);
  console.log('Map Props', props);
  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  42.3601, lng: -71.0589 } }
      >
        { markers }
      </GoogleMap>
    );
  }
))

export default Map;
