import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
// import './Home.css';
const useStyles = makeStyles(() => {
	return {
		root: {
			background:
				'url("https://media.wnyc.org/i/1000/667/c/80/photologue/photos/mandolinwall.jpg") no-repeat center center',
			backgroundSize: 'cover',
			marginLeft: 35,
			marginRight: 35,
			height: '100vh'
		},
		card: {
			width: '50%',
			marginLeft: 'auto',
			marginRight: 'auto',
			padding: 35
		},
		button: {
			margin: 6
		}
	};
});

function Home() {
	const classes = useStyles();

	return (
		<div class={classes.root}>
			<Paper className={classes.card} fluid>
				<h1 className="display-3">MandoBoutique</h1>
				<p className="lead">Find your first mandolin</p>
				<Button className={classes.button} variant="contained" color="primary">
					<Link to="/mandolins" style={{ textDecoration: 'none', color: 'white' }}>
						Shop Mandolins
					</Link>
				</Button>
				<Button className={classes.button} variant="contained" color="secondary">
					Help me Choose
				</Button>
			</Paper>
		</div>
	);
}

export default Home;
