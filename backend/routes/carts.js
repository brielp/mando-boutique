'use strict';

/** Routes for authentication. */

const jsonschema = require('jsonschema');

const User = require('../models/user');
const Cart = require('../models/cart');
const express = require('express');
const router = new express.Router();

/// CARTS

router.post('/', async (req, res, next) => {
	try {
		const cart = await Cart.create();

		return res.json(cart);
	} catch (e) {
		return next(e);
	}
});

// add item to cart
router.post('/:id/items/:sku', async (req, res, next) => {
	try {
		const response = await Cart.addItem(req.params.id, req.params.sku);
		return res.json(response);
	} catch (e) {
		return next(e);
	}
});

// delete item from cart
router.delete('/:id/items/:sku', async (req, res, next) => {
	try {
		const response = await Cart.deleteItem(req.params.id, req.params.sku);
		return res.json(response);
	} catch (e) {
		return next(e);
	}
});

// Get cart items
router.get('/:id', async (req, res, next) => {
	try {
		const items = await Cart.getItems(req.params.id);
		return res.json(items);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
