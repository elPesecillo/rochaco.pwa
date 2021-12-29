const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const express = require("express");
const session = require("express-session");

const facebookAuth = require("./Auth/facebookAuth");
const MongoStore = require("connect-mongo");
const customRoutes = require("./customRoutes");
const proxy = require("./proxy");

const config = require("./config");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;
const { MONGO_SESSION_CONNECTION } = process.env;

app
  .prepare()
  .then(() => {
    const server = express()
      .use(
        session({
          store: MongoStore.create({ mongoUrl: MONGO_SESSION_CONNECTION }),
          secret: config.SESSION_SECRET,
          saveUninitialized: true,
          resave: true,
        })
      )
      .use(express.json())
      .use(facebookAuth)
      .use(customRoutes)
      .use(proxy);

    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
