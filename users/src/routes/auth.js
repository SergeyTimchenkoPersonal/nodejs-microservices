const { Router } = require('express');
const { wrap } = require('../utils');
const { validateRequest } = require('../middlewares');
const { AuthController } = require('../controllers');
const { RegisterUserRequest, LoginUserRequest } = require('../requests');

const authRouter = Router();

authRouter.post(
	'/register',
	validateRequest(RegisterUserRequest),
	wrap(async (req, res) => {
		console.log(req.body);
		await AuthController.registerUser(req.body);
		res.json({ success: true });
	})
);

authRouter.post(
	'/login',
	validateRequest(LoginUserRequest),
	wrap(async (req, res) => {
		const token = await AuthController.loginUser(req.body);
		res.json({ token });
	})
);

module.exports = authRouter;
