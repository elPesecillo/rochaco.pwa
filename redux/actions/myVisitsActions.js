import * as types from "../constants/actionTypes";
import { getMyVisits, DeactivateQRCode } from "../../api/AppServiceApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadMyVisitsSuccess(myVisits) {
  return { type: types.LOAD_MY_VISITS_SUCCESS, myVisits };
}

export function deleteVisitSuccess(visitId) {
  return { type: types.DELETE_VISIT_SUCCESS, visitId };
}

export function loadMyVisits(userId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getMyVisits(userId)
      .then((myVisits) => {
        dispatch(loadMyVisitsSuccess(myVisits));
        return myVisits;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function dropVisit(accessControlId, guestId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return DeactivateQRCode({ accessControlId, guestId })
      .then((myVisits) => {
        dispatch(deleteVisitSuccess({ accessControlId, guestId }));
        return myVisits;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}
