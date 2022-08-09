const passportAuthMiddleware = require('./passport');
const validateRequest = require('./validate');
const errorMiddleware = require('./error');

module.exports = {
	passportAuthMiddleware,
	validateRequest,
	errorMiddleware,
};
