const { NotFound } = require('http-errors');
const { User } = require('../models');

const getUser = async (id) => {
	const user = await User.findByPk(id);
	if (!user) throw new NotFound('User');
	return user;
};

const getUsers = async () => {
	return User.findAll();
};

const updateUser = async (id, updateData) => {
	console.log(id, updateData);
	await User.update(
		{ ...updateData },
		{
			where: { id },
		}
	);
};

const deleteUser = async (id) => {
	await User.destroy({ where: { id } });
};

module.exports = { getUser, getUsers, updateUser, deleteUser };
