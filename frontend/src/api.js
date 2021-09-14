import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class MandoApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${MandoApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return await axios({ url, method, data, params, headers });
		} catch (err) {
			console.error('API Error:', err.response);
			throw new Error(err);
		}
	}

	// Individual API routes

	static async getMandolins() {
		const res = await this.request('mandolins');
		return res.data;
	}

	/** Get details on a mandolin by sku. */

	static async getMandolin(sku) {
		const res = await this.request(`mandolins/${sku}`);
		return res.data;
	}

	static async createCart() {
		const res = await this.request(`carts`, {}, 'post');
		MandoApi.cartId = res.data.id;
		console.log(MandoApi.cartId);
		return MandoApi.cartId;
	}
	/** add item to cart */
	static async addToCart(cartId, itemSku) {
		// add items to cart

		const res = await this.request(`carts/${cartId}/items/${itemSku}`, {}, 'post');
		console.log(res.data);
		// return cart id?
		return res.data;
	}

	static async getCartItems(cartId) {
		const res = await this.request(`carts/${cartId}`);
		return res.data;
	}

	static async deleteItem(sku) {
		const res = await this.request(`carts/${MandoApi.cartId}/items/${sku}`, {}, 'delete');
		return res.data;
	}

	//   static async getUser(user) {
	//     const res = await this.request("auth/token", user, "post");
	//     JoblyApi.token = res.token;
	//     const userRes = await this.request(`users/${user.username}`);
	//     return {user: userRes.user, token: JoblyApi.token};
	//   }

	//   static async signup(userData) {
	//     await this.request("auth/register", userData, "post");
	//     const user = await this.getUser({username: userData.username, password: userData.password});
	//     return user;
	//   }

	//   static logout() {
	//     JoblyApi.token = null;
	//   }

	//   static async editUser(user) {
	//     const res = await this.request(`users/${user.username}`, {firstName: user.firstName, lastName: user.lastName, email: user.email}, "patch");
	//     return res;
	//   }
}

export default MandoApi;
