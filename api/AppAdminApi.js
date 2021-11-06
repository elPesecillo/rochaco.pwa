import Api from "./ApiService";


export const getUserFavs = async (userId) => {
  let response = await Api.get(`/api/service/admin/userInfo/favorites`, {
    userId,
  });
  return response;
};

export const setUserFavs = async (userId, favs) => {
  let response = await Api.post(
    `/api/service/admin/userInfo/addFavorites`,
    {
      userId,
      favs,
    }
  );
  return response;
};

export const deleteUserFavs = async (userId, favs) => {
  let response = await Api.post(
    `/api/service/admin/userInfo/removeFavorites`,
    {
      userId,
      favs,
    }
  );
  return response;
};

export const addUserPushToken = async (userId, pushToken) => {
  let response = await Api.post(
    `/api/service/admin/userInfo/addUserPushToken`,
    { userId, pushToken }
  );
  return response;
};

export const getSuburbInfo = async (suburbId) => {
  let response = await Api.get(`/api/service/admin/suburb/get`, {
    suburbId,
  });
  return response;
};

export const addSuburbInvite = async (
  suburbId,
  name,
  street,
  streetNumber,
  userType
) => {
  let response = await Api.post(
    `/api/service/admin/suburb/addSuburbInvite`,
    {
      suburbId,
      name,
      street,
      streetNumber,
      userType,
    }
  );
  return response;
};

export const getInviteByCode = async (code, captchaToken) => {
  let response = await Api.get(
    `/api/service/admin/suburb/getInviteByCode`,
    {
      code,
      captchaToken,
    }
  );
  return response;
};

export const saveUser = async (
  name,
  lastName,
  loginName,
  email,
  password,
  cellphone,
  facebookId,
  googleId,
  appleId,
  photoUrl,
  suburbId,
  street,
  streetNumber,
  code,
  userType,
  captchaToken
) => {
  let response = await Api.post(`/api/service/admin/saveUserBySuburb`, {
    name,
    lastName,
    loginName,
    email,
    password,
    cellphone,
    facebookId,
    googleId,
    appleId,
    photoUrl,
    suburbId,
    street,
    streetNumber,
    code,
    userType,
    captchaToken,
  });
  return response;
};

export const updateUserPicture = async (userId, photoUrl) => {
  return await Api.post(`/api/service/admin/userInfo/updatePicture`, {
    userId,
    photoUrl,
  });
};

export const getUserInfo = async (userId) => {
  let response = await Api.get(`/api/service/admin/userId`, {
    id: userId,
  });
  return response;
};

export const authByFacebookId = async (facebookId, captchaToken) => {
  let response = await Api.get(
    `/api/service/admin/auth/fbtoken?id=${facebookId}&captchaToken=${captchaToken}`,
    {}
  );
  return response;
};

export const authByGoogleId = async (googleId, captchaToken) => {
  let response = await Api.get(
    `/api/service/admin/auth/googletoken?id=${googleId}&captchaToken=${captchaToken}`,
    {}
  );
  return response;
};

export const authByAppleId = async (appleId, captchaToken) => {
  let response = await Api.get(
    `/api/service/admin/auth/appletoken?id=${appleId}&captchaToken=${captchaToken}`,
    {}
  );
  return response;
};

export const authByUserPass = async (
  user,
  password,
  captchaToken,
  isTemporary
) => {
  let response = await Api.post(`/api/service/admin/checkAuth`, {
    user,
    password,
    captchaToken,
    isTemporary,
  });
  return response;
};

export const sendArriveNotification = async (userId, guest) => {
  let response = await Api.post(`/api/service/admin/notification/arrive`, {
    userId,
    guest,
  });
  return response;
};

export const getStreets = async (suburbId) => {
  let response = await Api.get(`/api/service/admin/suburb/getAllStreets`, {
    suburbId,
  });
  return response;
};

export const getStreetNumbers = async (suburbId, street) => {
  let response = await Api.get(
    `/api/service/admin/suburb/getStreetNumbers`,
    {
      suburbId,
      street,
    }
  );
  return response;
};

export const getUsersInAddress = async (suburbId, street, streetNumber) => {
  let response = await Api.get(
    `/api/service/admin/userInfo/getUsersByAddress`,
    { suburbId, street, streetNumber }
  );
  return response;
};

export const getSuburbConfig = async (suburbId) => {
  let response = await Api.get(`/api/service/admin/suburb/getConfig`, {
    suburbId,
  });
  return response;
};

export const deleteUserInfo = async (userId) => {
  let response = await Api.post(`/api/service/admin/deleteUserInfo`, {
    userId,
  });
  return response;
};

export const getUserTerms = async (userId) => {
  let response = await Api.get(
    `/api/service/admin/userInfo/getSignedUserTerms`,
    { userId }
  );
  return response;
};

export const isPasswordTemporary = async (user, password) => {
  let response = await Api.get(
    `/api/service/admin/userInfo/isPasswordTemp`,
    {
      user,
      password,
    }
  );
  return response;
};

export const signUserTerms = async (userId, termsVersion) => {
  let response = await Api.post(
    `/api/service/admin/userInfo/signUserTerms`,
    {
      userId,
      termsVersion,
    }
  );
  return response;
};

export const generateTempPassword = async (email, captchaToken) => {
  let response = await Api.post(`/api/service/admin/generateTempPassword`, {
    email,
    captchaToken,
  });
  return response;
};

export const updatePassword = async (userId, password, tempPassword) => {
  let response = await Api.post(
    `/api/service/admin/userInfo/updatePassword`,
    {
      userId,
      password,
      tempPassword,
    }
  );
  return response;
};

export const updateCurrentPassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  return await Api.post(
    `/api/service/admin/userInfo/updateCurrentPassword`,
    {
      userId,
      currentPassword,
      newPassword,
    }
  );
};

export const processOCR = async (formData) => {
  return await Api.postForm(`/api/service/admin/vision/ocr`, formData);
};

export const getSuburbVisits = async (suburbId, startDate, endDate, offset) => {
  let response = await Api.get(`/api/service/admin/analytics/GetVisits`, {
    suburbId,
    startDate,
    endDate,
    offset,
  });
  return response;
};

export const getIfUserIsLimited = async (userId) => {
  return await Api.get(`/api/service/admin/userInfo/getIfUserIsLimited`, {
    userId,
  });
};

export const uploadProfilePicture = async (userId, formData) => {
  return await Api.postForm(
    `/api/service/admin/blob/uploadFile?userId=${userId}`,
    formData
  );
};

export const getAddressesWithUsersStates = async (suburbId) => {
  return await Api.get(
    `/api/service/admin/suburb/getAddressesWithUsersStates`,
    { suburbId }
  );
};

export const enableDisableUser = async (userId, enabled) => {
  return await Api.post(`/api/service/admin/userInfo/enableDisable`, {
    userId,
    enabled,
  });
};

export const setLimitedUsersByAddress = async (
  suburbId,
  addressId,
  limited
) => {
  return await Api.post(
    `/api/service/admin/suburb/setLimitedUsersByAddress`,
    {
      suburbId,
      addressId,
      limited,
    }
  );
};
