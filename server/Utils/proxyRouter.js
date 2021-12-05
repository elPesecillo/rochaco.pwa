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
    code: `${process.env.SERVICES_API_CODE}`,
    pathRewrite: {
      "^.+api/service/services": "/api",
    },
    changeOrigin: true,
  },
  "/api/service/blob": {
    target: `${process.env.BLOB_API}`,
    code: `${process.env.BLOB_API_CODE}`,
    pathRewrite: {
      "^.+api/service/blob": "/api",
    },
    changeOrigin: true,
  },
  "/api/service/payments": {
    target: `${process.env.PAYMENTS_API}`,
    code: `${process.env.PAYMENTS_API_CODE}`,
    pathRewrite: {
      "^.+api/service/payments": "/api",
    },
    changeOrigin: true,
  },
};

module.exports = proxyRouter;
