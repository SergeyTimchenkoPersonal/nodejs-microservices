const { DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');
const sequelize = require('./db');

const Note = sequelize.define(
	'Note',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	},
	{
		hooks: {
			async beforeCreate(note) {
				note.id = uuid();
			},
		},
	}
);

module.exports = Note;
