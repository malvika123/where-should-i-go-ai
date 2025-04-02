const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("koio");
  app.use(
    "/api", // Match the endpoint path you want to proxy
    createProxyMiddleware({
      target:
        "http://localhost:4100" || "https://midware-server-wsig.onrender.com",
      changeOrigin: true,
    })
  );
};
