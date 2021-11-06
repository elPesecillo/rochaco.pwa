import * as types from "../constants/actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { getSuburbConfig } from "../../api/AppAdminApi";

function loadSuburbConfigData(config) {
  return { type: types.LOAD_SUBURB_CONFIG_SUCCESS, config };
}

export function loadSuburbConfig(suburbId) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return getSuburbConfig(suburbId)
      .then((config) => {
        dispatch(loadSuburbConfigData(config));
        return config;
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}
