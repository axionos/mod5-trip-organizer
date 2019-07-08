
import React from "react";
import Map from "./Map";

export default class MapContainer extends React.Component {

	render() {
    console.log('Map Container Props', this.props)
		return (
			<Map
				items={this.props.items}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBaGD-h-zdNd5SLcDto3jevpeaHXCNRpz4&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px`, width: `100%`, border: `1px solid #aaa` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}
