const db = require('../db');
const { BadRequestError } = require('../expressErrors');

class Mandolin {
	// seed the database
	static async seed(data) {
		const deleteRes = await db.query(`DELETE FROM items`);
		console.log('Deleted items: ', deleteRes.rowCount);

		const resultArray = [];
		try {
			for (let mandolin of data) {
				const { sku, title, url, brand, description, video, price, images, tags, features } = mandolin;
				const result = await db.query(
					`INSERT INTO items
           (sku, title, url, brand, description, video, price, images, tags, features)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           RETURNING *`,
					[ sku, title, url, brand, description, video, price, images, tags, features ]
				);
				resultArray.push(result.rows[0]);
			}
		} catch (e) {
			resultArray.push(e.message);
			console.log(e);
		}

		return resultArray;
	}

	// get mandolin by SKU
	static async get(sku) {
		const mandolinRes = await db.query(`SELECT * FROM items WHERE sku iLIKE $1`, [ sku ]);
		return mandolinRes.rows[0];
	}

	// get all Mandolins. Filter by:
	// title/general query
	// brand
	// price-high.
	// price-low
	// style
	static async getAll({ title = null, minPrice = 0, maxPrice = 100000, brand = null, style = null }) {
		let query = `SELECT * FROM items`;
		const whereExpressions = [];
		const queryValues = [];

		// handle if min price is greater than max price
		if (Number(minPrice) > Number(maxPrice)) {
			throw new BadRequestError('Min price cannot be greater than max');
		}

		queryValues.push(minPrice);
		whereExpressions.push(`price >= $${queryValues.length}`);
		queryValues.push(maxPrice);
		whereExpressions.push(`price <= $${queryValues.length}`);

		//handle title
		if (title) {
			queryValues.push(`%${title}%`);
			queryValues.push(`%${title}%`);
			whereExpressions.push(
				`(title iLIKE $${queryValues.length - 1} OR description iLIKE $${queryValues.length})`
			);
		}

		// handle brand
		if (brand) {
			queryValues.push(brand.toLowerCase());
			whereExpressions.push(`brand = $${queryValues.length}`);
		}

		// handle style
		if (style) {
			queryValues.push(style);
			whereExpressions.push(`$${queryValues.length} iLIKE any (tags)`);
		}

		if (whereExpressions.length > 0) {
			query += ` WHERE ` + whereExpressions.join(' AND ');
		}

		const mandolinRes = await db.query(query, queryValues);
		return mandolinRes.rows;
	}
}

module.exports = Mandolin;
