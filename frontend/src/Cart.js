import React, { useState, useEffect } from 'react';
import MandoApi from './api';
import {
	makeStyles,
	Table,
	TableBody,
	TableHead,
	TableContainer,
	TableCell,
	TableRow,
	Avatar,
	Button
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(() => {
	return {
		container: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'center'
		},
		header: {
			fontWeight: 'bold',
			marginTop: 35
		},
		table: {
			minWidth: 200,
			maxWidth: 950,
			padding: 20
		},
		headerText: {
			fontWeight: 'bold'
		},
		icon: {
			width: 85,
			height: 85
		},
		summary: {
			maxWidth: 380,
			padding: 20
		},
		boldText: {
			fontWeight: 'bold'
		},
		button: {
			marginTop: 20,
			width: '100%'
		}
	};
});

function convertPriceString(price) {
	let str = String(price);
	if (str.length > 3) {
		str = str.slice(0, str.length - 3) + ',' + str.slice(str.length - 3);
	}
	return '$' + str + '.00';
}

function Cart({ cartId }) {
	const [ cart, setCart ] = useState([]);
	const [ err, setErr ] = useState();
	const [ runAgain, setRunAgain ] = useState(false);
	const [ total, setTotal ] = useState();

	async function deleteItem(sku) {
		const res = await MandoApi.deleteItem(sku);
		console.log(res);
		const cartRes = await MandoApi.getCartItems(cartId);
		let totalPrice = cartRes.reduce((accum, next) => {
			return accum + Number(next.price);
		}, 0);
		setTotal(totalPrice);
		setCart(cartRes);
	}

	useEffect(
		() => {
			async function getCart() {
				try {
					if (cartId) {
						const cartRes = await MandoApi.getCartItems(cartId);
						setCart(cartRes);
						let totalPrice = cartRes.reduce((accum, next) => {
							return accum + Number(next.price);
						}, 0);
						setTotal(totalPrice);
						console.log(cart);
					} else {
						setRunAgain(true);
					}
				} catch (e) {
					setErr(e[0]);
					console.log(err);
				}
			}
			getCart();
		},
		[ runAgain, cartId ]
	);

	const classes = useStyles();

	return (
		<div>
			<h1 className={classes.header}>My Cart</h1>
			{cart ? (
				<div className={classes.container}>
					<TableContainer className={classes.table}>
						<Table aria-label="simple table">
							<TableHead className={classes.headerText}>
								<TableRow>
									<TableCell align="right" />
									<TableCell className={classes.boldText}>Product</TableCell>
									<TableCell align="left" />
									<TableCell className={classes.boldText} align="right">
										Price
									</TableCell>
									<TableCell className={classes.boldText} align="right">
										Quantity
									</TableCell>
									<TableCell className={classes.boldText} align="right">
										Total
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{cart.map(item => (
									<TableRow key={item.sku}>
										<TableCell align="right">
											<CancelIcon
												onClick={() => {
													deleteItem(item.sku);
												}}
											/>
										</TableCell>
										<TableCell component="th" scope="row">
											{item.title}
										</TableCell>
										<TableCell align="left">
											<span>
												<Avatar
													className={classes.icon}
													variant="rounded"
													src={item.images[0]}
												/>
											</span>
										</TableCell>
										<TableCell align="right">{convertPriceString(item.price)}</TableCell>
										<TableCell align="right">{1}</TableCell>
										<TableCell align="right">{convertPriceString(item.price)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TableContainer className={classes.summary}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell className={classes.boldText}>Order Summary</TableCell>
									<TableCell />
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell className={classes.boldText}>Total</TableCell>
									<TableCell>{convertPriceString(total)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className={classes.boldText}>Taxes</TableCell>
									<TableCell>{convertPriceString(Math.floor(0.021 * total))}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className={classes.boldText}>The Real Total</TableCell>
									<TableCell>{convertPriceString(Math.floor(0.021 * total) + total)}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
						<Button className={classes.button} color="secondary" variant="contained">
							Checkout
						</Button>
					</TableContainer>
				</div>
			) : (
				<p />
			)}
		</div>
	);
}

export default Cart;
