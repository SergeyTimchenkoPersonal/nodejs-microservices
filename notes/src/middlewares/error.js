const { NotFound, ServiceUnavailable } = require('http-errors');

const ErrorHandler = (err, req, res, next) => {
	let { message } = err;
	let { statusCode } = err;

	if (!statusCode) {
		statusCode = 500;
	}

	if (err instanceof NotFound) {
		if (message === 'user') {
			message = 'Such user is not registered, please sign up first';
		} else {
			message = `${message} not found`;
		}
	}

	if (statusCode >= 500) {
		if (err instanceof ServiceUnavailable) {
			message = `${message}`;
		} else {
			console.error(err);
			message = 'Internal Server Error';
		}
	}

	res.status(statusCode).json({ message });
};

module.exports = ErrorHandler;
