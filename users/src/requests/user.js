const yup = require('yup');

const GetUserRequest = yup.object().required().shape({
	id: yup.string().required(),
});

const UpdateUserRequest = yup
	.object()
	.required()
	.shape({
		firstName: yup.string(),
		lastName: yup.string(),
		email: yup
			.string()
			.email()
			.transform((value) => value.toLowerCase()),
		password: yup.string(),
	});

module.exports = {
	GetUserRequest,
	UpdateUserRequest,
};
