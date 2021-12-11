import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function (state = initialState.visitsReport, action) {
  switch (action.type) {
    case types.LOAD_VISITS_REPORT:
      return action.subVisits;
    default:
      return state;
  }
}
