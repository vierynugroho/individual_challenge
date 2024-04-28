const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use(express.json());

app.use(apiRouter);

//* Error Response Handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		status: err.status || 500,
		message: err.message,
	});
});

//* 404 Response Handler
app.use((req, res) => {
	const url = req.url;
	const method = req.method;
	res.status(404).json({
		status: false,
		method,
		url,
		message: 'Not Found!',
	});
});

module.exports = app;
