const config = {
	PORT: parseInt(process.env.PORT, 10) || 5000,

	JWT_SECRET: process.env.JWT_SECRET,
	RABBITMQ_SERVER_URL: process.env.RABBITMQ_SERVER_URL,
};

module.exports = config;
