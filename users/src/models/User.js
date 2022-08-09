const { DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');
const sequelize = require('./db');

const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			protected: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		hooks: {
			beforeCreate(user) {
				user.id = uuid();
			},
		},
		defaultScope: {
			attributes: { exclude: ['password'] },
		},
		scopes: {
			withPassword: {
				attributes: {},
			},
		},
	}
);

module.exports = User;
