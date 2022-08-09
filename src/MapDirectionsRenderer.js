/* global google */
import React, { useState, useEffect } from "react";
import { DirectionsRenderer } from "react-google-maps";
import { useDispatch, useSelector } from "react-redux";
import { swapLocation, updateLocation } from "./actions/locations";
import { swapPlace, updatePlace } from "./actions/places";

function MapDirectionsRenderer(props) {
    const [directions, setDirections] = useState(null);
    const [legs, setLegs] = useState();
    const [error, setError] = useState(null);
    const locations = useSelector((state) => state.locations)
    const places = useSelector((state) => state.places)
    const dispatch = useDispatch()

    useEffect(() => {
        if (locations[0] != "" && locations[1] != "") {
            const { travelMode } = props;

            const waypoints = locations.slice(2, locations.length)
                .filter(loc => loc != "").map(p => ({
                    location: p,
                    stopover: true
                }));

            const origin = locations[0];
            const destination = locations[1];

            const directionsService = new google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: travelMode,
                    waypoints: waypoints,
                    optimizeWaypoints: true
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        if (locations.length > 2 && result.routes[0].waypoint_order) {
                            dispatch(swapPlace(result.routes[0].waypoint_order))
                        }
                        setDirections(result);
                    } else {
                        setError(result);
                    }
                }
            );
        }
        else
            setDirections(null)
    }, [locations]);

    return (<>
        {directions ? <DirectionsRenderer directions={directions} /> : null}</>
    );
}

export default MapDirectionsRenderer;