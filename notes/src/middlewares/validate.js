const { BadRequest } = require('http-errors');

const validateRequest = (
	bodyValidationSchema,
	additionalValidationSchemas = {}
) => {
	return async (req, res, next) => {
		if (bodyValidationSchema) {
			additionalValidationSchemas.body = bodyValidationSchema;
		}

		const requestFieldsToValidate = Object.keys(
			additionalValidationSchemas
		);
		const validationErrors = [];

		const validatePromises = requestFieldsToValidate.map(
			async (requestField) => {
				const validationSchema =
					additionalValidationSchemas[requestField];
				const isValid = await validationSchema
					.validate(req[requestField])
					.catch((error) => {
						validationErrors.push(error.message);
						return false;
					});
				if (!isValid) return;
				req[requestField] = validationSchema.cast(req[requestField], {
					stripUnknown: true,
				});
			}
		);

		await Promise.all(validatePromises);
		if (validationErrors.length === 0) {
			return next();
		}

		return next(new BadRequest(validationErrors.join('. ')));
	};
};

module.exports = validateRequest;
