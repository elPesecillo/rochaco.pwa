import * as types from "../constants/actionTypes";
import {
  authByFacebookId,
  authByGoogleId,
  authByUserPass,
  authByAppleId,
  generateTempPassword,
} from "../../api/AppAdminApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function authToken(token) {
  return { type: types.AUTH_SUCCESS, token };
}

export function generateTempPasswordSuccess(password) {
  return { type: types.GENERATE_TEMP_PASS_SUCCESS, password };
}

export function facebookAuth(facebookId, captchaToken) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return authByFacebookId(facebookId, captchaToken)
      .then((auth) => {
        dispatch(authToken(auth.token));
        return auth.token;
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function googleAuth(googleId, captchaToken) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return authByGoogleId(googleId, captchaToken)
      .then((auth) => {
        dispatch(authToken(auth.token));
        return auth.token;
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function appleAuth(appleId, captchaToken) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return authByAppleId(appleId, captchaToken)
      .then((auth) => {
        dispatch(authToken(auth.token));
        return auth.token;
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function userAuth(user, password, captchaToken, isTemporary) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return authByUserPass(user, password, captchaToken, isTemporary)
      .then((auth) => {
        dispatch(authToken(auth.message));
        return auth.message;
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function generateTempPass(email, captchaToken) {
  return function (dispatch) {
    dispatch(beginApiCall);
    return generateTempPassword(email, captchaToken)
      .then((password) => {
        dispatch(generateTempPasswordSuccess(password));
        return password;
      })
      .catch((err) => {
        dispatch(apiCallError);
        throw err;
      });
  };
}

export function logout() {
  return { type: types.AUTH_LOGOUT };
}
