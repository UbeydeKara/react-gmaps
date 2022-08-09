import { SET_PLACES, INSERT_PLACE, REMOVE_PLACE, UPDATE_PLACE, SWAP_PLACE } from "./types";

export const setPlaces = (places) => ({
    type: SET_PLACES,
    payload: places
});

export const updatePlace = (places, index) => ({
    type: UPDATE_PLACE,
    payload: places,
    index: index
});

export const insertPlace = (places, index) => ({
    type: INSERT_PLACE,
    payload: places,
    index: index
});

export const removePlace = (index) => ({
    type: REMOVE_PLACE,
    index: index
});

export const swapPlace = (order) => ({
    type: SWAP_PLACE,
    order: order
});