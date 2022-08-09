require('dotenv').config();
const http = require('http');
const app = require('./app');
const config = require('./config');
const { sequelize } = require('./models');

(async function start() {
	const server = http.createServer(app);
	await sequelize.authenticate();
	await sequelize.sync({ force: false });
	server.listen(config.PORT, () => {
		console.log(`Server listened on port: ${config.PORT}`);
	});
})().catch((error) => {
	console.error(error);
	process.exit(0);
});
