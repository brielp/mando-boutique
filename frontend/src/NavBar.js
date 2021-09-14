import React from 'react';
import { Container, Grid, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles(() => {
	return {
		grid: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			height: 75
		},
		text: {
			margin: 0
		},
		link: {
			textDecoration: 'none',
			color: 'black'
		}
	};
});

function NavBar({ cartItems }) {
	const classes = useStyles();
	return (
		<div>
			<Container>
				<Grid className={classes.grid} container>
					<h3 className={classes.text}>
						<a className={classes.link} href="/">
							MandoBoutique
						</a>
					</h3>

					<p className={classes.text}>
						<a className={classes.link} href="/mandolins">
							Shop Mandolins
						</a>
					</p>
					<p className={classes.text}>
						<a className={classes.link} href="/comingsoon">
							Accessories
						</a>
					</p>

					<a className={classes.link} href="/cart">
						<p className={classes.text}>
							<Badge color="secondary" badgeContent={cartItems}>
								<ShoppingCartIcon />
							</Badge>
						</p>
					</a>
				</Grid>
			</Container>
		</div>
	);
}

export default NavBar;
