require('dotenv').config();
const express = require('express');
const amqp = require('amqplib/callback_api');
const morgan = require('morgan');
const config = require('./config');
const nodemailer = require('nodemailer');
const { generateMessage } = require('./utils/generateMessage');
const { notificationStatuses } = require('./constants');
const { Notification } = require('./models');

const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => {
	res.send('Notify service is available');
});

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: config.EMAIL_SENDER,
		pass: config.EMAIL_SENDER_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
	from: `Mail sender <${config.EMAIL_SENDER}>`,
});

amqp.connect(config.RABBITMQ_SERVER_URL, (err, connection) => {
	if (err) {
		console.error(err.stack);
		return process.exit(1);
	}

	connection.createChannel((err, channel) => {
		if (err) {
			console.error(err.stack);
			return process.exit(1);
		}

		channel.assertQueue(
			config.RABBITMQ_QUEUE_NAME,
			{
				durable: true,
			},
			(err) => {
				if (err) {
					console.error(err.stack);
					return process.exit(1);
				}

				channel.prefetch(1);
				channel.consume(config.RABBITMQ_QUEUE_NAME, async (msg) => {
					if (msg === null) {
						return;
					}
					let data = JSON.parse(msg.content.toString());
					console.log('data', data);
					const notification = await Notification.create({
						template: data.action,
						payload: JSON.stringify(data.payload),
						userId: data.payload.userId,
					});
					console.log(notification);
					const message = generateMessage(data.action, data.payload);
					message.to = data.payload.email;

					transporter.sendMail(message, async (err, info) => {
						if (err) {
							console.error(err.stack);
							await Notification.update(
								{ status: notificationStatuses.FAILED },
								{
									where: {
										id: notification.id,
									},
								}
							);
							return channel.nack(msg);
						}
						console.log('Delivered message %s', info.messageId);
						await Notification.update(
							{ status: notificationStatuses.SENT },
							{
								where: {
									id: notification.id,
								},
							}
						);
						channel.ack(msg);
					});
				});
			}
		);
	});
});

module.exports = app;
