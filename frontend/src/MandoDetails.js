import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MandoApi from './api';
import MandoCarousel from './MandoCarousel';
import { Grid, Chip, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(() => {
	return {
		grid: {
			marginTop: 35
		},
		tags: {
			display: 'flex',
			justifyContent: 'left',
			flexWrap: 'wrap',
			'& > *': {
				marginRight: 8,
				marginBottom: 8
			},
			marginBottom: 15
		},
		description: {
			maxWidth: '35%',
			textAlign: 'left'
		},
		title: {
			fontWeight: 'bold',
			marginBottom: 20
		},
		button: {
			marginBottom: 20,
			width: '100%'
		},
		price: {
			fontSize: '18px',
			color: '#383838'
		}
	};
});

function MandoDetails({ setCartId, cartId }) {
	const { sku } = useParams();
	const [ mando, setMando ] = useState({});
	const [ err, setErr ] = useState();

	const classes = useStyles();

	useEffect(
		() => {
			async function getMando() {
				try {
					const mandoRes = await MandoApi.getMandolin(sku);
					setMando(mandoRes);
				} catch (e) {
					setErr(e[0]);
					console.log(err);
				}
			}
			getMando();
		},
		[ sku, err ]
	);

	async function addToCart() {
		if (!cartId) {
			const res = await MandoApi.createCart();
			setCartId(res);
		} else {
			const cart = await MandoApi.getCartItems(cartId);
			console.log('CART', cart);
			let notInCart = cart.every(item => item.sku !== mando.sku);
			if (notInCart) {
				const res = await MandoApi.addToCart(cartId, mando.sku);
				console.log(res);
			}
		}
	}

	function convertPriceString(price) {
		let str = String(price);
		if (str.length > 3) {
			str = str.slice(0, str.length - 3) + ',' + str.slice(str.length - 3);
		}
		return '$' + str + '.00';
	}

	return (
		<Grid className={classes.grid} container direction="row" justifyContent="space-evenly" alignItems="flex-start">
			<MandoCarousel imgs={mando.images} />

			<div className={classes.description}>
				<h1 className={classes.title}>{mando.title}</h1>
				<p className={classes.price}>{convertPriceString(mando.price)}</p>
				<Link style={{ textDecoration: 'none' }} to="/cart">
					<Button className={classes.button} color="secondary" variant="contained" onClick={addToCart}>
						Add to Cart
					</Button>
				</Link>
				{mando.tags ? (
					<div className={classes.tags}>{mando.tags.map(t => <Chip label={t} key={t} />)}</div>
				) : (
					<p />
				)}
				<p>{mando.description}</p>
			</div>
		</Grid>
	);
}

export default MandoDetails;
