const { DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');
const {
	notificationStatuses,
	notificationTypes,
	messageTemplates,
} = require('../constants');
const sequelize = require('./db');

const Notification = sequelize.define(
	'Notification',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		type: {
			type: DataTypes.ENUM(...Object.values(notificationTypes)),
			defaultValue: notificationTypes.EMAIL,
		},
		status: {
			type: DataTypes.ENUM(...Object.values(notificationStatuses)),
			defaultValue: notificationStatuses.CREATED,
		},
		template: {
			type: DataTypes.ENUM(...Object.keys(messageTemplates)),
			allowNull: false,
		},
		payload: {
			type: DataTypes.JSON,
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	},
	{
		hooks: {
			async beforeCreate(notification) {
				notification.id = uuid();
			},
		},
	}
);

module.exports = Notification;
