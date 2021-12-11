import * as types from "../constants/actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { getSuburbVisits } from "../../api/AppAdminApi";

export function loadSuburbVisitsSuccess(subVisits) {
  return { type: types.LOAD_VISITS_REPORT, subVisits };
}

export function loadSuburbVisits(suburbId, startDate, finalDate, offset) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return getSuburbVisits(suburbId, startDate, finalDate, offset)
      .then((subVisits) => {
        dispatch(loadSuburbVisitsSuccess(subVisits));
        return subVisits;
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}
