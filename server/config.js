require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  FACEBOOK_API_KEY: process.env.FACEBOOK_API_KEY,
  FACEBOOK_API_SECRET: process.env.FACEBOOK_API_SECRET,
  FACEBOOK_CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,
  NODE_ENV: process.env.NODE_ENV,
  ADMIN_API_HOST: process.env.ADMIN_API_HOST,
  SESSION_SECRET: process.env.SESSION_SECRET,
  RECAPTCHA_WEB: process.env.RECAPTCHA_WEB,
  RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,
  GOOGLE_CALLBACK_URl: process.env.GOOGLE_CALLBACK_URl,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  PROJECT_URL: process.env.PROJECT_URL,
};