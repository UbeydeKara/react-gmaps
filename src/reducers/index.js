import { combineReducers } from "redux";
import places from "./places";
import locations from "./locations";

export default combineReducers({
    places,
    locations
});