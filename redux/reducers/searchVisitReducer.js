import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function (state = initialState.searchVisit, action) {
  switch (action.type) {
    case types.LOAD_STREETS_SUCCESS:
      return { ...state, streets: action.streets };
    case types.LOAD_STREET_NUMBERS_SUCCESS:
      return { ...state, streetNumbers: action.streetNumbers };
    case types.LOAD_USERS_IN_ADDRESS_SUCCESS:
      return { ...state, usersInAddress: action.usersInAddress };
    case types.LOAD_PENDING_VISITS_SUCCESS:
      return { ...state, pendingVisits: action.pendingVisits };
    case types.SET_SELECTED_PENDING_VISIT:
      return { ...state, pendingVisitSelected: action.pendingVisit };
    case types.CLEAN_STREETS:
      return { ...state, streets: [] };
    case types.CLEAN_STREET_NUMBERS:
      return { ...state, streetNumbers: [] };
    case types.CLEAN_USERS_IN_ADDRESS:
      return { ...state, usersInAddress: [] };
    case types.CLEAN_PENDING_VISITS:
      return { ...state, pendingVisits: [] };
    default:
      return state;
  }
}
