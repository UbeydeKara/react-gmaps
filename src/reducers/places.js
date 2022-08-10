import { SET_PLACES, INSERT_PLACE, REMOVE_PLACE, UPDATE_PLACE, SWAP_PLACE } from "../actions/types";

const initialState = ["Hacıkara, Karapınar 3. Sk. Özlem Koop.", "Hacıkara, Karapınar 3. Sk. Özlem Koop."
    , "Hacıkara, Karapınar 3. Sk. Özlem Koop.", "Hacıkara, Karapınar 3. Sk. Özlem Koop.", "Hacıkara, Karapınar 3. Sk. Özlem Koop."
    , "Hacıkara, Karapınar 3. Sk. Özlem Koop.", "Hacıkara, Karapınar 3. Sk. Özlem Koop.", "Hacıkara, Karapınar 3. Sk. Özlem Koop.", "Hacıkara, Karapınar 3. Sk. Özlem Koop."];

export default function (state = initialState, action) {
    const { type, payload, index, order } = action;
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

        case SWAP_PLACE:
            let data = [...state];
            let ordered_data = [...state];

            for (var i = 0; i < order.length; i++) {
                ordered_data[i + 2] = data[order[i] + 2];
            }

            return ordered_data;

        default:
            return state;
    }
}