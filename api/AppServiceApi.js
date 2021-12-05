import Api from "./ApiService";

export const AddArrive = async (arriveData) => {
  return await Api.post(`/api/service/services/AccessControl`, arriveData);
};
export const addInvite = async (inviteData) => {
  return await Api.post(
    `/api/service/services/AddVisit`,
    { ...inviteData }
    // ({
    //   userId,
    //   userName,
    //   suburbId,
    //   validFrom,
    //   validTo,
    //   street,
    //   streetNumber,
    //   guests,
    //   useTimeInterval,
    //   personalQR,
    // } = inviteData)
  );
};
export const DeactivateQRCode = async (data) => {
  return await Api.post(
    `/api/service/services/DeactivateQRCode`,
    ({ accessControlId, guestId } = data)
  );
};

export const getArriveCodeInfo = async (codeId, suburbId) => {
  return await Api.get(`/api/service/services/Visit`, {
    suburbId,
    codeId,
  });
};

export const getMyVisits = async (userId) => {
  return await Api.get(`/api/service/services/MyVisits`, {
    userId,
  });
};
export const getUrlQR = async (accessControlId) => {
  return await Api.get(`/api/service/services/GetUrlQR`, {
    accessControlId,
  });
};
export const getServicesByUsers = async (users) => {
  return await Api.get(`/api/service/services/GetVisitsByUserId`, {
    users,
  });
};
