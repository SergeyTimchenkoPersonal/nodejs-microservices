const yup = require('yup');

const LoginUserRequest = yup
	.object()
	.required()
	.shape({
		email: yup
			.string()
			.email()
			.transform((value) => value.toLowerCase())
			.required(),
		password: yup.string().required(),
	});

const RegisterUserRequest = yup
	.object()
	.required()
	.shape({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		email: yup
			.string()
			.email()
			.transform((value) => value.toLowerCase())
			.required(),
		password: yup.string().required(),
	});

module.exports = {
	LoginUserRequest,
	RegisterUserRequest,
};
