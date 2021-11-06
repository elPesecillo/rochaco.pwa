var express = require('express');

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const ExternalApi = require("../Utils/externalApi");
const base64 = require("base-64");
var config = require("../config");

var app = express();

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URl
}, function (token, tokenSecret, profile, done) {
    //over here check if the user is valid
    let callApi = new ExternalApi(config.ADMIN_API_HOST, {});
    callApi.get(`/api/auth/googletoken?id=${profile.id}`).then(result => {
        return done(null, profile, { token: result.data.token });
    }, err => {
        return done(null, profile, {
            provider: profile.provider,
            displayName: profile.displayName,
            name: profile.name.givenName,
            lastName: profile.name.familyName
        });

    });
}));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
app.get('/auth/google',
    // Save the url of the user's current page so the app can redirect back to
    // it after authorization
    (req, res, next) => {
        if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }
        next();
    },

    passport.authenticate('google', { scope: ['email', 'profile'] })
);


// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', function (req, res, next) {
    //passport.authenticate('google', { failureRedirect: '/' }),
    passport.authenticate('google', function (err, user, info) {
        var session = req.session;
        if (info.token) {
            session.token = info.token;
            session.user = user.displayName;
            //over here add a new view to authenticate from external proividers
            res.redirect(`/externalAuth?token=${info.token}`);
        }
        else {
            //over here redirect to register user
            let encodedInfo = base64.encode(JSON.stringify({
                googleId: user.id,
                displayName: info.displayName,
                name: info.name,
                lastName: info.lastName
            }));
            res.redirect(`/signup?info=${encodedInfo}`);
        }
    })(req, res, next);
});

module.exports = app;