import React, { useState, useEffect } from 'react';
import MandoApi from './api';

function Cart({ cartId }) {
	const [ cart, setCart ] = useState([]);
	const [ err, setErr ] = useState();

	async function deleteItem(sku) {
		const res = await MandoApi.deleteItem(sku);
		const cartRes = await MandoApi.getCartItems(cartId);
		setCart(cartRes);
	}

	useEffect(
		() => {
			async function getCart() {
				try {
					if (cartId) {
						const cartRes = await MandoApi.getCartItems(cartId);
						setCart(cartRes);
					}
				} catch (e) {
					console.log(e);
					setErr(e[0]);
				}
			}
			getCart();
		},
		[ cartId ]
	);

	return (
		<div>
			<h1>Cart</h1>
			<p>
				{cart ? (
					<div>
						{cart.map(item => (
							<div>
								<p>{item.title}</p>
								<p>{item.price}</p>
								<p
									onClick={() => {
										deleteItem(item.sku);
									}}
								>
									Delete
								</p>
							</div>
						))}
					</div>
				) : (
					<p />
				)}
			</p>
		</div>
	);
}

export default Cart;
