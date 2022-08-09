const amqp = require('amqplib/callback_api');
const config = require('../config');

const RABBITMQ_SERVER_URL = config.RABBITMQ_SERVER_URL;
let ch = null;
amqp.connect(RABBITMQ_SERVER_URL, function (err, conn) {
	if (err) throw err;

	conn.createChannel(function (err, channel) {
		if (err) throw err;
		ch = channel;
	});
});

const publishToQueue = async (queueName, data) => {
	ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
};

process.on('exit', (code) => {
	ch.close();
	console.log(`Closing rabbitmq channel`);
});

module.exports = {
	publishToQueue,
};
