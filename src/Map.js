/* global google */
import React from "react";
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker
} from "react-google-maps";
import MapDirectionsRenderer from "./MapDirectionsRenderer";

const Map = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultCenter={props.defaultCenter}
            defaultZoom={props.defaultZoom}
            onClick={props.drawMarker}>
            <Marker position={props.markerLoc} />
            <MapDirectionsRenderer travelMode={google.maps.TravelMode.DRIVING} />
        </GoogleMap>
    ))
)

export default Map;
