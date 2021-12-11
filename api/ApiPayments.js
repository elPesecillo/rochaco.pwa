import Api from "./ApiService";

export const getPaymentPeriods = async (suburbId) => {
  try {
    let response = await Api.get(`/api/service/payments/GetPaymentPeriods`, {
      suburbId,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const getPaymentPeriodsBySuburb = async (suburbId) => {
  try {
    let response = await Api.get(
      `/api/service/payments/GetPaymentsBalanceBySuburb`,
      {
        suburbId,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getPaymentsByAddress = async (
  suburbId,
  addressId,
  numberOfPeriods
) => {
  try {
    let response = await Api.get(`/api/service/payments/GetPaymentsByAddress`, {
      suburbId,
      addressId,
      numberOfPeriods,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const getPaymentsBalanceByAddress = async (suburbId, addressId) => {
  try {
    let response = await Api.get(
      `/api/service/payments/GetPaymentBalanceByAddress`,
      {
        suburbId,
        addressId,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const uploadPaymentConfig = async (suburbId, periods) => {
  try {
    let response = await Api.post(
      `/api/service/payments/UploadPaymentConfig`,
      {
        suburbId,
        periods,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const approveRejectPayment = async (
  paymentId,
  status,
  userId,
  comment
) => {
  try {
    let response = await Api.post(
      `/api/service/payments/ApproveRejectPayment`,
      {
        paymentId,
        status,
        userId,
        comment,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const uploadPayment = async (formData) => {
  try {
    let response = await Api.postForm(
      `/api/service/payments/UploadPayment`,
      formData
    );
    return response;
  } catch (err) {
    throw err;
  }
};

