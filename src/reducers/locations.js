import { SET_LOCATIONS, INSERT_LOCATIONS, REMOVE_LOCATIONS, UPDATE_LOCATIONS } from "../actions/types";

const initialState = ["", ""];

export default function (state = initialState, action) {
    const { type, payload, index } = action;
    switch (type) {

        case SET_LOCATIONS:
            return payload;

        case UPDATE_LOCATIONS:
            return [
                ...state.slice(0, index),
                payload,
                ...state.slice(index + 1)
            ];

        case INSERT_LOCATIONS:
            return [
                ...state.slice(0, index),
                payload,
                ...state.slice(index)
            ];

        case REMOVE_LOCATIONS:
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