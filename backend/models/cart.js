const db = require('../db');

class Cart {
	// create new cart for a specific user
	static async create(userId) {
		// check for existing cart
		let result;

		result = await db.query(`INSERT INTO carts (user_id) VALUES ($1) RETURNING *`, [ userId ]);

		return result.rows[0];
	}
	// get cart items for a cart
	static async getItems(cartId) {
		const result = await db.query(
			`SELECT c.cart_id, i.sku, i.title, i.price FROM cart_items AS c INNER JOIN items AS i ON c.item_sku = i.sku WHERE c.cart_id = $1`,
			[ cartId ]
		);
		return result.rows;
	}
	// add item to cart
	static async addItem(cartId, itemSku) {
		const result = await db.query(`INSERT INTO cart_items (cart_id, item_sku) VALUES ($1, $2) RETURNING *`, [
			cartId,
			itemSku
		]);
		return result.rows[0];
	}
	// delete item from cart
	static async deleteItem(cartId, itemSku) {
		const result = await db.query(`DELETE FROM cart_items WHERE cart_id = $1 AND item_sku = $2`, [
			cartId,
			itemSku
		]);
		return result;
	}
	// clear entire cart
}

module.exports = Cart;
