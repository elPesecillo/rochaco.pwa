import * as types from "../constants/actionTypes";
import {
  getPaymentPeriods,
  getPaymentPeriodsBySuburb,
  getPaymentsByAddress,
  uploadPayment,
  getPaymentsBalanceByAddress,
  approveRejectPayment,
} from "../../api/ApiPayments.js";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function setTotalAmount(totalAmount) {
  return { type: types.SET_TOTAL_AMOUNT, totalAmount };
}

export function loadPaymentHistorySuccess(paymentHistory) {
  return { type: types.LOAD_PAYMENT_HISTORY_SUCCESS, paymentHistory };
}

export function loadPaymentHistory(suburbId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getPaymentPeriodsBySuburb(suburbId)
      .then((paymentHistory) => {
        dispatch(loadPaymentHistorySuccess(paymentHistory));
        return paymentHistory;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function loadPaymentsByAddressSuccess(payments) {
  return { type: types.LOAD_PAYMENT_BY_ADDRESS_SUCCESS, payments };
}

export function loadPaymentsByAddress(
  suburbId,
  addressId,
  numberOfPeriods = 1
) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getPaymentsByAddress(suburbId, addressId, numberOfPeriods)
      .then((payments) => {
        dispatch(loadPaymentsByAddressSuccess(payments));
        return payments;
      })
      .catch((err) => {
        console.log(err);
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function loadPaymentPeriodsSuccess(paymentPeriods) {
  return { type: types.LOAD_PAYMENT_PERIODS_SUCCESS, paymentPeriods };
}

export function loadPaymentPeriods(suburbId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getPaymentPeriods(suburbId)
      .then((paymentPeriods) => {
        dispatch(loadPaymentPeriodsSuccess(paymentPeriods));
        return paymentPeriods;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function uploadPaymentReceiptSuccess(paymentPeriod) {
  return { type: types.UPLOAD_PAYMENT_SUCCESS, paymentPeriod };
}

export function uploadPaymentReceipt(obj, paymentPeriod) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return uploadPayment(obj.formData)
      .then((result) => {
        dispatch(uploadPaymentReceiptSuccess(paymentPeriod));
        return result;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function loadPaymentBalanceSuccess(obj) {
  return { type: types.LOAD_PAYMENT_BALANCE_SUCCESS, obj };
}

export function loadPaymentBalance(suburbId, addressId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getPaymentsBalanceByAddress(suburbId, addressId)
      .then((obj) => {
        dispatch(loadPaymentBalanceSuccess(obj));
        return obj;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function approveRejectSuccess(obj) {
  return { type: types.APPROVE_REJECT_PAYMENT_SUCCESS, obj };
}

export function approveReject(
  id,
  approved,
  userId,
  comment,
  paymentId,
  amount = "0.00"
) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return approveRejectPayment(paymentId, approved, userId, comment)
      .then((obj) => {
        dispatch(approveRejectSuccess({ id, approved, amount: amount }));
        return obj;
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}
