const { legacyCreateProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/viajes-rebollo/api',
    legacyCreateProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};