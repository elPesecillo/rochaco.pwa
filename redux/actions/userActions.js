import * as types from "../constants/actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import {
  getUserFavs,
  setUserFavs,
  deleteUserFavs,
  getSuburbInfo,
  addSuburbInvite,
  getInviteByCode,
  getUserTerms,
  signUserTerms,
  updatePassword,
  uploadProfilePicture,
} from "../../api/AppAdminApi";
import Api from "../../api/ApiService";

export function loadFavData(favs) {
  return { type: types.LOAD_USER_FAVS_SUCCESS, favs };
}

export function loadUserFavs(userId) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return getUserFavs(userId)
      .then((favs) => {
        dispatch(loadFavData(favs));
        return favs;
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function addFavData(favs) {
  return { type: types.ADD_USER_FAV_SUCCESS, favs };
}

export function addUserFavs(userId, favs) {
  return function (dispatch) {
    dispatch(beginApiCall);
    setUserFavs(userId, favs)
      .then((res) => {
        dispatch(addFavData(favs));
        return favs;
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function removeUserFavData(favs) {
  return { type: types.REMOVE_USER_FAV_SUCCESS, favs };
}

export function removeUserFavs(userId, favs) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return deleteUserFavs(userId, favs)
      .then((res) => {
        dispatch(removeUserFavData(favs));
        return favs;
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function addUserGuest(guests) {
  return { type: types.ADD_USER_GUEST, guests };
}

export function removeUserGuests(guests) {
  return { type: types.REMOVE_USER_GUEST, guests };
}

export function cleanUserGuests() {
  return { type: types.CLEAN_USER_GUEST };
}

export function updateUserGuest(guest) {
  return { type: types.UPDATE_USER_GUEST, guest };
}

export function setPasswordTemporary(isTemporary) {
  return { type: types.SET_TEMPORARY_PASS, isTemporary };
}

export function savePasswordTemporary(tempPass) {
  return { type: types.SAVE_TEMP_PASS, tempPass };
}

export function getUserSuburbData(suburb) {
  return { type: types.GET_SUBURB_DATA_SUCCESS, suburb };
}

export function getUserSuburb(suburbId) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return getSuburbInfo(suburbId)
      .then((res) => {
        dispatch(getUserSuburbData(res));
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function addInviteData(suburbInvite) {
  return { type: types.ADD_SUBURB_INVITE_SUCCESS, suburbInvite };
}

export function addSubInvite(suburbId, name, street, streetNumber, userType) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return addSuburbInvite(suburbId, name, street, streetNumber, userType)
      .then((res) => {
        dispatch(addInviteData(res.code));
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function clearSubInvite() {
  return { type: types.CLEAR_SUBURB_INVITE };
}

export function getInviteData(inviteSignIn) {
  return { type: types.GET_INVITE_BY_CODE_SUCCESS, inviteSignIn };
}

export function getInvite(code, captchaToken) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return getInviteByCode(code, captchaToken)
      .then((res) => {
        dispatch(getInviteData(res));
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

export function getUserInfoByIdData(data) {
  return { type: types.GET_USER_INFO_SUCCESS, data };
}

export function getUserInfo() {
  return function (dispatch) {
    dispatch(beginApiCall);
    return (
      Api.get("/usr/getInfo")
        //return getUserInfo(userId)
        .then((res) => {
          dispatch(getUserInfoByIdData(res));
        })
        .catch((err) => {
          dispatch(apiCallError);
          throw err;
        })
    );
  };
}

export function getUserTermsData(terms) {
  return { type: types.GET_TERMS_SUCCESS, terms };
}

export function getTerms(userId) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return getUserTerms(userId)
      .then((res) => {
        dispatch(getUserTermsData(res));
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function signUserTermsData(terms) {
  return { type: types.SING_TERMS_SUCCESS, terms };
}

export function signTerms(userId, termsVersion) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return signUserTerms(userId, termsVersion)
      .then((res) => {
        dispatch(signUserTermsData(res));
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function updateUserPas(userId, password, tempPass) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return updatePassword(userId, password, tempPass)
      .then((res) => {
        dispatch(setPasswordTemporary(false));
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function updateUserPictureSuccess(photoUrl) {
  return { type: types.UPDATE_USER_PICTURE_SUCCESS, photoUrl };
}

export function updateUserPicture(userId, formData) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return uploadProfilePicture(userId, formData)
      .then((res) => {
        dispatch(updateUserPictureSuccess(res[0]?.url));
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}
