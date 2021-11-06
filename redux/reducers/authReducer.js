import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function (state = initialState.auth, action) {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return action.token;
    case types.AUTH_LOGOUT:
      return "";
    default:
      return state;
  }
}
