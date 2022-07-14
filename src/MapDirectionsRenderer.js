/* global google */
import React, { useState, useEffect } from "react";
import { DirectionsRenderer } from "react-google-maps";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "./actions/locations";
import { updatePlace } from "./actions/places";

function MapDirectionsRenderer(props) {
    const [directions, setDirections] = useState(null);
    const [error, setError] = useState(null);
    const locations = useSelector((state) => state.locations)
    const dispatch = useDispatch()

    useEffect(() => {
        if (locations[0] != "" && locations[1] != "") {
            const { travelMode } = props;

            const waypoints = locations.slice(2, locations.length).filter(loc => loc != "").map(p => ({
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
                    waypoints: waypoints
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                        dispatch(updatePlace(result.routes[0].legs[0].start_address, 0))
                        dispatch(updatePlace(result.routes[0].legs[result.routes[0].legs.length - 1].end_address, 1))

                        for (var i = 0; i < result.routes[0].legs.length; i++) {
                            dispatch(updatePlace(result.routes[0].legs[i].end_address, i + 1))
                        }
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