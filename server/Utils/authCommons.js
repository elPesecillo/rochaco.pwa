const Base64 = require("base-64");

const getJwtPayload = (token) => {
  try {
    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      return JSON.parse(Base64.decode(base64));
    } else {
      return {};
    }
  } catch (err) {
    console.log(err);
    return {};
  }
};

const isValidToken = (token) => {
  let payload = getJwtPayload(token);
  let expirationDate = new Date(payload.exp * 1000);
  let currentDate = new Date();
  return token && expirationDate > currentDate ? true : false;
};

const isValidPage = async (ctx, serverSideTranslations) => {
  let { req, locale } = ctx;
  const { token, user } = req.session;
  const tokenValid = isValidToken(token);
  const translations = await serverSideTranslations(locale);
  return !tokenValid
    ? {
        redirect: {
          destination: "/auth/Login",
          permanent: false,
        },
      }
    : { props: { user, ...translations } };
};

module.exports = {
  getJwtPayload,
  isValidToken,
  isValidPage,
};
