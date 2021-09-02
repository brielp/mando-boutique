const db = require('../db');
const { BCRYPT_WORK_FACTOR } = require('../config.js');
const bcrypt = require('bcrypt');
const { NotFoundError } = require('../expressErrors');

class User {
	// register new user
	static async register({ username, password, name, email }) {
		const duplicateCheck = await db.query(
			`SELECT username
           FROM users
           WHERE username = $1`,
			[ username ]
		);

		if (duplicateCheck.rows[0]) {
			throw new BadRequestError(`Duplicate username: ${username}`);
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

		const result = await db.query(
			`INSERT INTO users
           (username,
            password,
            name,
            email)
           VALUES ($1, $2, $3, $4)
           RETURNING id, username, name, email`,
			[ username, hashedPassword, name, email ]
		);

		const user = result.rows[0];

		return user;
	}
	// authenticate
	static async authenticate(username, password) {
		// try to find the user first
		const result = await db.query(
			`SELECT id, username,
                  password,
                  name,
                  email
           FROM users
           WHERE username = $1`,
			[ username ]
		);

		const user = result.rows[0];

		if (user) {
			// compare hashed password to a new hash from password
			const isValid = await bcrypt.compare(password, user.password);
			if (isValid === true) {
				delete user.password;
				return user;
			}
		}

		throw new UnauthorizedError('Invalid username/password');
	}
	// get user by id
	static async get(username) {
		const result = await db.query(`SELECT id, username, name, email FROM users WHERE username = $1`, [ username ]);

		const user = result.rows[0];
		if (!user) {
			throw new NotFoundError('No user found by that username');
		}
		return user;
	}
	// update
	// delete
}

module.exports = User;
