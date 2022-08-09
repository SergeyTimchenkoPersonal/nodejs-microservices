const { Router } = require('express');
const { wrap } = require('../utils');
const { validateRequest, passportAuthMiddleware } = require('../middlewares');
const { UserController } = require('../controllers');
const { UpdateUserRequest, GetUserRequest } = require('../requests');

const userRouter = Router();

userRouter.get(
	'/',
	wrap(async (req, res) => {
		const users = await UserController.getUsers();
		res.json(users);
	})
);

userRouter.get(
	'/:id',
	validateRequest(null, { params: GetUserRequest }),
	wrap(async (req, res) => {
		const user = await UserController.getUser(req.params.id);
		res.json(user);
	})
);

userRouter.post(
	'/',
	passportAuthMiddleware(),
	validateRequest(UpdateUserRequest),
	wrap(async (req, res) => {
		await UserController.updateUser(req.user.id, req.body);
		res.json({ success: true });
	})
);

userRouter.delete(
	'/',
	passportAuthMiddleware(),
	wrap(async (req, res) => {
		const token = await UserController.deleteUser(req.user.id);
		res.json({ success: true });
	})
);

module.exports = userRouter;
