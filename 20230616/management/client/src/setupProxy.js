const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(proxy("/api", { target: "http://localhost:5000" }));
// };

module.exports = (app) => {
	app.use(
		"/api", //추가
		createProxyMiddleware('/api', {
			target: 'http://localhost:5000', 
			changeOrigin: true,
		})
	);
};