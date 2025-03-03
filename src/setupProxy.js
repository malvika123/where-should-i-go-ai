const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("koio");
  app.use(
    "/api", // Match the endpoint path you want to proxy
    createProxyMiddleware({
      target:
        "https://midware-server-wsig.onrender.com" || "http://localhost:4100",
      changeOrigin: true,
    })
  );
};
