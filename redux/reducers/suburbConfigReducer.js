import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function (state = initialState.suburbConfig, action) {
  switch (action.type) {
    case types.LOAD_SUBURB_CONFIG_SUCCESS:
      return action.config;
    default:
      return state;
  }
}
