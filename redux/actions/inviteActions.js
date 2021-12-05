import * as types from "../constants/actionTypes";
import { addInvite } from "../../api/AppServiceApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function addInviteData(userInvite) {
  return { type: types.ADD_INVITE_SUCCESS, userInvite };
}

export function invite(
  userId,
  userName,
  suburbId,
  validFrom,
  validTo,
  street,
  streetNumber,
  guests,
  useTimeInterval
) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return addInvite({
      userId,
      userName,
      suburbId,
      validFrom,
      validTo,
      street,
      streetNumber,
      guests,
      useTimeInterval,
      personalQR: false,
    })
      .then((inv) => {
        dispatch(addInviteData(inv));
        return inv;
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function cleanInvite() {
  return { type: types.CLEAN_USER_INVITE };
}
