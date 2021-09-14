import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		width: 350,
		marginTop: 25
	},
	title: {
		color: 'black'
	}
});

function convertPriceString(price) {
	let str = String(price);
	if (str.length > 3) {
		str = str.slice(0, str.length - 3) + ',' + str.slice(str.length - 3);
	}
	return '$' + str + '.00';
}

function MandoCard({ mandolin }) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<Link to={`/mandolins/${mandolin.sku}`} style={{ textDecoration: 'none' }}>
				<CardMedia
					component="img"
					alt={mandolin.title}
					height="400"
					image={mandolin.images[0]}
					title={mandolin.sku}
				/>
				<CardContent>
					<Typography className={classes.title} variant="h6" component="h4">
						{mandolin.title}
					</Typography>
					<Typography color="textSecondary">{convertPriceString(mandolin.price)}</Typography>
				</CardContent>
			</Link>
		</Card>
	);
}

export default MandoCard;
