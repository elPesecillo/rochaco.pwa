import * as types from "../constants/actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import {
  getAddressesWithUsersStates,
  enableDisableUser,
  setLimitedUsersByAddress,
} from "../../api/AppAdminApi";

const getAddressWithUsersStatesSuccess = (addresses) => {
  return { type: types.LOAD_ADDRESSES_STATES_SUCCESS, addresses };
};

export function loadAddressesWithUsersStates(suburbId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getAddressesWithUsersStates(suburbId)
      .then((addresses) => {
        dispatch(getAddressWithUsersStatesSuccess(addresses));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
      });
  };
}

const setEnabledDisabledUserSuccess = (user) => {
  return { type: types.SET_ENABLED_DISABLED_USER_SUCCESS, user };
};

export function setEnabledDisabledUser(userId, enabled) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return enableDisableUser(userId, enabled)
      .then((user) => {
        dispatch(setEnabledDisabledUserSuccess(user));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
      });
  };
}

const limitedUsersByAddressSuccess = (users) => {
  return { type: types.SET_LIMITED_USER_BY_ADDRESS_SUCCESS, users };
};

export function limitedUsersByAddress(suburbId, addressId, limited) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return setLimitedUsersByAddress(suburbId, addressId, limited)
      .then((users) => {
        dispatch(limitedUsersByAddressSuccess(users));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
      });
  };
}
