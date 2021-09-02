import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardImg, CardTitle } from 'reactstrap';

function MandoCard({ mandolin }) {
	function convertPriceString(price) {
		let str = String(price);
		if (str.length > 3) {
			str = str.slice(0, str.length - 3) + ',' + str.slice(str.length - 3);
		}
		return '$' + str + '.00';
	}

	return (
		<Card>
			<Link to={`/mandolins/${mandolin.sku}`}>
				<CardImg height="200px" top src={mandolin.images[0]} alt="Card image cap" />
			</Link>
			<CardBody>
				<Link to={`/mandolins/${mandolin.sku}`}>
					<CardTitle tag="h5">{mandolin.title}</CardTitle>
				</Link>
				<CardSubtitle tag="h6" className="mb-2 text-muted text-center">
					{convertPriceString(mandolin.price)}
				</CardSubtitle>
			</CardBody>
		</Card>
	);
}

export default MandoCard;
