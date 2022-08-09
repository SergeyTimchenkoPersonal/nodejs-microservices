const dbConfig = {
	port: parseInt(process.env.DB_PORT, 10),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	dialect: 'postgres',
	logging: false,
};

module.exports = dbConfig;
