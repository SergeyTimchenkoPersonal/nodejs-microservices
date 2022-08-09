const { Unauthorized, Forbidden } = require('http-errors');
const { User } = require('../models');
const {
	comparePasswords,
	hashPassword,
	generateAccessToken,
} = require('../utils');
const { publishToQueue } = require('../services/rabbitmq');

const registerUser = async (userData) => {
	const { firstName, lastName, email, password } = userData;
	let user = await User.findOne({
		where: { email },
	});

	if (user) {
		throw new Forbidden(`The user with email ${email} already exists.`);
	}

	user = await User.create({
		email,
		firstName,
		lastName,
		password: await hashPassword(password),
	});

	publishToQueue('emailQueue', {
		action: 'REGISTRATION',
		payload: {
			email: email,
			username: firstName,
			userId: user.id,
		},
	});
};

const loginUser = async (userData) => {
	const { email, password } = userData;

	const user = await User.scope('withPassword').findOne({ where: { email } });

	if (!user) throw new Unauthorized('Invalid email or password');

	const isAuthorized = await comparePasswords(password, user.password);
	if (!isAuthorized) throw new Unauthorized('Invalid email or password');

	const token = generateAccessToken(user);
	return { token: `Bearer ${token}`, id: user.id };
};

module.exports = {
	registerUser,
	loginUser,
};
