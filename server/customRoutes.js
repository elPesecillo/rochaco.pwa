//const router = require('express').Router();
const express = require("express");
var app = express();
var config = require("./config");
const ExternalApi = require("./Utils/externalApi");
const commons = require("./Utils/authCommons");

app.post("/auth/byUsrPwd", async (req, res) => {
  try {
    let callApi = new ExternalApi(config.ADMIN_API_HOST, {});
    let { user, password, captchaToken } = req.body;
    let result = await callApi.post(`/api/checkAuth`, {
      user,
      password,
      captchaToken,
    });
    if (result.data.message) {
      req.session.token = result.data.message;
      req.session.user = user;
    }
    res.redirect(`/Start`);
  } catch (err) {
    res.status("401").json(err);
  }
});

app.get("/auth/logout", (req, res) => {
  req.session.destroy(function (err) {
    // cannot access session here
    res.redirect("/auth/Login");
  });
});

app.get("/usr/getInfo", async (req, res) => {
  try {
    let callApi = new ExternalApi(config.ADMIN_API_HOST, {
      authorization: `${req.session.token}`,
    });

    let userId = commons.getJwtPayload(req.session.token).userId;

    let user = (await callApi.get(`/api/userId`, { id: userId })).data;

    user
      ? res.status(200).json({
          userId: user._id,
          email: user.email,
          name: `${user.name} ${user.lastName}`,
          userType: user.userType,
          photoUrl: user.photoUrl,
          streetId: user.streetId,
          limited: user.limited,
          suburb: { id: user.suburb._id, name: user.suburb.name },
          street: {
            id: user.streetId,
            name: user.street,
            number: user.streetNumber,
          },
        })
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status("401").json(err);
  }
});

module.exports = app;
