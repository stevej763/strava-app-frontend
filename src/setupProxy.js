const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/api",
    proxy({
      target: "https://running-dashboard-backend.herokuapp.com",
      changeOrigin: true
    })
  );
};