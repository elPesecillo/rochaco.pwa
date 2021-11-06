var express = require("express");

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const ExternalApi = require("../Utils/externalApi");
const base64 = require("base-64");
var config = require("../config");

var app = express();

//Passport session setup.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: "3437057679886908",
      clientSecret: "bdeb74f380cb91f039754641dd04966a",
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      //enableProof: true
    },
    function (accesToken, refreshToken, profile, done) {
      process.nextTick(function () {
        //Check whether the User exists or not using profile.id
        console.log(profile.id);
        //let callApi = new ExternalApi(config.ADMIN_API_HOST, {})

        return done(null, profile, {
          profileId: profile.id,
          provider: profile.provider,
          displayName: profile.displayName,
          name: profile.name.givenName,
          lastName: profile.name.familyName,
        });
      });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/facebook", function (req, res, next) {
  let { captcha } = req.query;
  var session = req.session;
  session.captcha = captcha;
  passport.authenticate("facebook", { scope: "email" })(req, res, next);
});

app.get("/auth/facebook/callback", function (req, res, next) {
  //passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' })(req, res, next)
  passport.authenticate("facebook", function (err, user, info) {
    var session = req.session;
    //session.token = info.token
    session.user = user.displayName;
    authFacebookUser(info.profileId, session.captcha)
      .then((auth) => {
        session.token = auth.token;
        //res.redirect(`/externalAuth?token=${auth.token}`);
        res.redirect(`/Home`);
      })
      .catch((err) => {
        let encodedInfo = base64.encode(
          JSON.stringify({
            facebookId: user.id,
            displayName: info.displayName,
          })
        );
        res.redirect(`/signup?info=${encodedInfo}`);
      });
  })(req, res, next);
});

const authFacebookUser = async (facebookId, captcha) => {
  try {
    let callApi = new ExternalApi(config.ADMIN_API_HOST, {});
    let response = await callApi.get(
      `/api/auth/fbtoken?id=${facebookId}&captchaToken=${captcha}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = app;
