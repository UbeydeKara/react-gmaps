import { SET_PLACES, INSERT_PLACE, REMOVE_PLACE, UPDATE_PLACE } from "../actions/types";

const initialState = ["", ""];

export default function (state = initialState, action) {
    const { type, payload, index } = action;
    switch (type) {

        case SET_PLACES:
            return payload;

        case UPDATE_PLACE:
            return [
                ...state.slice(0, index),
                payload,
                ...state.slice(index + 1)
            ];

        case INSERT_PLACE:
            return [
                ...state.slice(0, index),
                payload,
                ...state.slice(index)
            ];

        case REMOVE_PLACE:
            if (state.length == 1)
                return []
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]

        default:
            return state;
    }
}