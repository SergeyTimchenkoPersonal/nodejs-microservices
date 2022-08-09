const express = require('express');
const morgan = require('morgan');
const { noteRouter } = require('./routes');
const { errorMiddleware } = require('./middlewares');

const app = express();

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());
app.use(morgan('tiny'));

app.use('/', noteRouter);

app.use(errorMiddleware);

module.exports = app;
