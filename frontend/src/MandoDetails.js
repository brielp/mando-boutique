import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MandoApi from './api';
import { Container, Row, Col, Button } from 'reactstrap';
import MandoCarousel from './MandoCarousel';

function MandoDetails({ setCartId, cartId }) {
	const { sku } = useParams();
	const [ mando, setMando ] = useState({});
	const [ err, setErr ] = useState();

	useEffect(
		() => {
			async function getMando() {
				try {
					const mandoRes = await MandoApi.getMandolin(sku);
					setMando(mandoRes);
				} catch (e) {
					console.log(e);
					setErr(e[0]);
				}
			}
			getMando();
		},
		[ sku ]
	);

	async function addToCart() {
		if (!cartId) {
			const res = await MandoApi.createCart();
			setCartId(res);
		}
		console.log(cartId);
		const res = await MandoApi.addToCart(cartId, mando.sku);
	}

	function convertPriceString(price) {
		let str = String(price);
		if (str.length > 3) {
			str = str.slice(0, str.length - 3) + ',' + str.slice(str.length - 3);
		}
		return '$' + str + '.00';
	}

	return (
		<Container>
			<Row>
				<Col xs="8">
					<MandoCarousel imgs={mando.images} />
				</Col>
				<Col xs="4">
					<div className="text-align-left">
						<h1 className="display-6 text-left">{mando.title}</h1>
						<p>{convertPriceString(mando.price)}</p>
						{mando.tags ? <div>Tags: {mando.tags.map(t => <p>{t} </p>)}</div> : <p />}
						<p>{mando.description}</p>
						<Link to="/cart">
							<Button color="primary" size="lg" onClick={addToCart}>
								Add to Cart
							</Button>
						</Link>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default MandoDetails;
