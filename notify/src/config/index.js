const config = {
	PORT: parseInt(process.env.PORT, 10) || 5000,

	EMAIL_SENDER: process.env.EMAIL_SENDER,
	EMAIL_SENDER_PASSWORD: process.env.EMAIL_SENDER_PASSWORD,
	
	RABBITMQ_QUEUE_NAME: process.env.RABBITMQ_QUEUE_NAME,
	RABBITMQ_SERVER_URL: process.env.RABBITMQ_SERVER_URL,
};

module.exports = config;
