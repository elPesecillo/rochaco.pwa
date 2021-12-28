var express = require("express");
var app = express();
var proxy = require("express-http-proxy");
const proxyRouter = require("./Utils/proxyRouter");

const getMap = (url) => {
  let proxyMap = proxyRouter;
  let urlParts = url.split("/");
  let foundMap = null;
  for (let i = 0; i <= urlParts.length; i++) {
    if (!foundMap) {
      let innerArray = Array.apply(null, {
        length: i + 1,
      }).map(Function.call, Number);
      let uri = "";
      innerArray.forEach((element) => {
        uri += urlParts[element] !== "" ? `/${urlParts[element]}` : "";
      });
      foundMap = proxyMap[uri];
    }
  }
  return foundMap;
};

const addApiKey = (path, key) => {
  return path.includes("?") ? `${path}&code=${key}` : `${path}?code=${key}`;
};

const rewriteURL = (host, url) => {
  let completeUrl = `${host}${url}`;
  let path = getMap(url);
  if (path) {
    let regex = new RegExp(Object.keys(path.pathRewrite)[0]);
    var replaced = completeUrl.replace(
      regex,
      path.pathRewrite[Object.keys(path.pathRewrite)[0]]
    );
    return `${path.target}${
      path.code ? addApiKey(replaced, path.code) : replaced
    }`;
  } else return completeUrl;
};

const proxyHandler = async (req, res, next) => {
  try {
    const { token } = req.session;
    req.headers = { ...req.headers, Authorization: `${token}` };
    const map = getMap(req.baseUrl);
    console.log(
      "accediendo a:",
      rewriteURL(`${req.protocol}://${req.get("Host")}`, req.originalUrl)
    );
    if (map) {
      proxy(map.target, {
        proxyReqPathResolver: function (req) {
          return rewriteURL(
            `${req.protocol}://${req.get("Host")}`,
            req.originalUrl
          );
        },
        proxyErrorHandler: function (err, res, next) {
          console.log("proxy error:", err);
          switch (err && err.code) {
            case "ECONNRESET": {
              return res.status(405).json({ message: "Method not allowed" });
            }
            case "ECONNREFUSED": {
              return res.status(503).json({ message: "Service unavailable" });
            }
            default: {
              next(err);
            }
          }
        },
      })(req, res, next);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

app.use("/api/service/*", proxyHandler);

module.exports = app;
