const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

const hashPassword = (password) => {
	return bcrypt.hash(password, 8);
};

const comparePasswords = (userPassword, hashedPassword) => {
	return bcrypt.compare(userPassword, hashedPassword);
};

const generateAccessToken = ({ id }) => {
	return jwt.sign({ id }, config.JWT_SECRET);
};

const wrap = (fn) => {
	return (...args) => fn(...args).catch(args[2]);
};

module.exports = {
	hashPassword,
	comparePasswords,
	generateAccessToken,
	wrap,
};
