const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Match the endpoint path you want to proxy
    createProxyMiddleware({
      target: "http://localhost:4100",
      changeOrigin: true,
    })
  );
};
