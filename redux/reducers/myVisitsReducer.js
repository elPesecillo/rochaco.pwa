import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function (state = initialState.myVisits, action) {
  switch (action.type) {
    case types.LOAD_MY_VISITS_SUCCESS:
      return action.myVisits;
    case types.DELETE_VISIT_SUCCESS:
      return state.filter(
        (res) =>
          (res.accessControlId !== action.visitId.accessControlId &&
            res.guestId !== action.visitId.guestId) ||
          (res.accessControlId === action.visitId.accessControlId &&
            res.guestId !== action.visitId.guestId)
      );
    default:
      return state;
  }
}
