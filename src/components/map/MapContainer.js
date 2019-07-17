
import React from "react";
import Map from "./Map";


export default class MapContainer extends React.Component {

	render() {
    // console.log('Map Container Props', this.props)
		return (
				<Map
					items={this.props.items}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div className='map-container' style={{ height: `500px`, width: `100%`}} />}
					mapElement={<div style={{ height: `100%` }} />}
				/>

		);
	}
}
