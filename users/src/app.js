const express = require('express');
const morgan = require('morgan');
const { authRouter, userRouter } = require('./routes');
const { errorMiddleware } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(morgan('tiny'));
// app.use((req, res, next) => {
// 	console.log(req);
// 	return next();
// });
app.use('/', userRouter);
app.use('/auth', authRouter);

app.use(errorMiddleware);

module.exports = app;
