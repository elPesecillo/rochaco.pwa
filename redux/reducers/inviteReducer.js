import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function (state = initialState.userInvite, action) {
  switch (action.type) {
    case types.ADD_INVITE_SUCCESS:
      return action.userInvite;
    case types.CLEAN_USER_INVITE:
      return null;
    default:
      return state;
  }
}
