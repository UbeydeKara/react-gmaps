import { SET_LOCATIONS, INSERT_LOCATIONS, REMOVE_LOCATIONS, UPDATE_LOCATIONS } from "./types";

export const setLocations = (locations) => ({
    type: SET_LOCATIONS,
    payload: locations
});

export const updateLocation = (locations, index) => ({
    type: UPDATE_LOCATIONS,
    payload: locations,
    index: index
});

export const insertLocation = (locations, index) => ({
    type: INSERT_LOCATIONS,
    payload: locations,
    index: index
});

export const removeLocation = (index) => ({
    type: REMOVE_LOCATIONS,
    index: index
});