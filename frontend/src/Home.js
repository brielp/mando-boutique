import React from 'react';
import { Button, Jumbotron, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
	return (
		<div class="Home">
			<Jumbotron className="h-100" fluid>
				<Container className="my-auto" fluid>
					<h1 className="display-3">MandoBoutique</h1>
					<p className="lead">Find your first mandolin</p>
					<Button outline color="primary">
						<Link to="/mandolins">Shop Mandolins</Link>
					</Button>{' '}
					<Button outline color="secondary">
						Help me Choose
					</Button>{' '}
				</Container>
			</Jumbotron>
		</div>
	);
}

export default Home;
