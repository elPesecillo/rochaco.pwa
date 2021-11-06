import * as types from "../constants/actionTypes";
import AppApi from "../../api/AppServiceApi";
import {
  getStreets,
  getStreetNumbers,
  getUsersInAddress,
} from "../../api/AppAdminApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

function loadStreetsSuccess(streets) {
  return { type: types.LOAD_STREETS_SUCCESS, streets };
}

function loadStreetNumbersSuccess(streetNumbers) {
  return { type: types.LOAD_STREET_NUMBERS_SUCCESS, streetNumbers };
}

function loadPendingVisitsSuccess(pendingVisits) {
  return { type: types.LOAD_PENDING_VISITS_SUCCESS, pendingVisits };
}

function loadUsersByAddressSuccess(usersInAddress) {
  return { type: types.LOAD_USERS_IN_ADDRESS_SUCCESS, usersInAddress };
}

export function setSelectedPendingVisit(pendingVisit) {
  return { type: types.SET_SELECTED_PENDING_VISIT, pendingVisit };
}

export function cleanStreets() {
  return { type: types.CLEAN_STREETS };
}

export function cleanStreetNumbers() {
  return { type: types.CLEAN_STREET_NUMBERS };
}

export function cleanUsersInAddress() {
  return { type: types.CLEAN_USERS_IN_ADDRESS };
}

export function cleanPendingVisits() {
  return { type: types.CLEAN_PENDING_VISITS };
}

export function loadStreets(suburbId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getStreets(suburbId)
      .then((streets) => {
        dispatch(loadStreetsSuccess(streets));
        return streets;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function loadStreetNumbers(suburbId, street) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getStreetNumbers(suburbId, street)
      .then((streetNumbers) => {
        dispatch(loadStreetNumbersSuccess(streetNumbers));
        return streetNumbers;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function loadUsersByAddress(suburbId, street, streetNumber) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getUsersInAddress(suburbId, street, streetNumber)
      .then((users) => {
        dispatch(loadUsersByAddressSuccess(users));
        return users;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function loadPendingVisits(users) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return AppApi.getServicesByUsers(users)
      .then((services) => {
        dispatch(loadPendingVisitsSuccess(services));
        return services;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}
