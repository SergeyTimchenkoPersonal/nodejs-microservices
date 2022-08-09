require('dotenv').config();
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('tiny'));

const { USER_SERVICE_URL, NOTE_SERVICE_URL, NOTIFY_SERVICE_URL, PORT } =
	process.env;

app.use('/api/users', proxy(USER_SERVICE_URL));

app.use('/api/notes', proxy(NOTE_SERVICE_URL));

app.use('/api/notify', proxy(NOTIFY_SERVICE_URL));

app.use(express.json());

app.listen(PORT, () => {
	console.log(`Gateway is Listening to Port ${PORT}`);
});
