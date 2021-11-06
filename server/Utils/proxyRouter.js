const proxyRouter = {
  "/api/service/admin": {
    target: `${process.env.ADMIN_API_HOST}`,
    pathRewrite: {
      "^.+api/service/admin": "/api",
    },
    changeOrigin: true,
  },
  "/api/service/services": {
    target: `${process.env.SERVICES_API}`,
    pathRewrite: {
      "^.+api/service/services": "/api",
    },
    changeOrigin: true,
  },
  "/api/service/blob": {
    target: `${process.env.BLOB_API}`,
    pathRewrite: {
      "^.+api/service/blob": "/api",
    },
    changeOrigin: true,
  },
  "/api/service/payments": {
    target: `${process.env.PAYMENTS_API}`,
    pathRewrite: {
      "^.+api/service/payments": "/api",
    },
    changeOrigin: true,
  },
};

module.exports = proxyRouter;
