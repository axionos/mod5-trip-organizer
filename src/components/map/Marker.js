import React from "react";
import { Marker } from "react-google-maps";
import WatermelonIcon from "../../img/location.png";

export default class DoctorMarker extends React.Component {

  render(){
    return(
        <Marker
          position={this.props.location}
          icon={WatermelonIcon}
        />

    );
  }
}
