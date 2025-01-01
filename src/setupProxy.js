const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Match the endpoint path you want to proxy
    createProxyMiddleware({
      target: "https://midware-server-wsig.onrender.com",
      changeOrigin: true,
    })
  );
};
