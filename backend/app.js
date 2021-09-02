'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
const { NotFoundError } = require('./expressErrors');
const { authenticateJWT } = require('./middleware/auth');
const mandolinRoutes = require('./routes/mandolins');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/carts');

app.use(authenticateJWT);
app.use(cors());
app.use(express.json());

app.use('/mandolins', mandolinRoutes);
app.use('/users', userRoutes);
app.use('/carts', cartRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function(req, res, next) {
	return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function(err, req, res, next) {
	if (process.env.NODE_ENV !== 'test') console.error(err.stack);
	const status = err.status || 500;
	const message = err.message;

	return res.status(status).json({
		error: { message, status }
	});
});

module.exports = app;
