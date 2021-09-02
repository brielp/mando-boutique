const express = require('express');
const router = new express.Router();
const Mandolin = require('../models/mandolin');
const SEEDPW = require('../secrets');
const { UnauthorizedError } = require('../expressErrors');
const mandolins = require('../data');

router.get('/', async (req, res, next) => {
	try {
		const data = await Mandolin.getAll(req.query);
		res.json(data);
	} catch (e) {
		next(e);
	}
});

router.get('/:sku', async function(req, res, next) {
	try {
		const data = await Mandolin.get(req.params.sku);
		res.json(data);
	} catch (e) {
		console.log(e);
		next(e);
	}
});

router.post('/seed/:password', async (req, res, next) => {
	try {
		if (req.params.password !== SEEDPW) {
			return next(new UnauthorizedError('Incorrect Password'));
		}
		const seedRes = await Mandolin.seed(mandolins);
		res.json(seedRes);
	} catch (e) {
		console.log(e);
		next(e);
	}
});

module.exports = router;
