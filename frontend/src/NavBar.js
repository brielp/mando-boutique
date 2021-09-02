import React from 'react';
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Badge } from 'reactstrap';

function NavBar({ cartItems }) {
	return (
		<div>
			<Navbar color="light" light expand="lg">
				<Container>
					<NavbarBrand href="/">MandoBoutique</NavbarBrand>
					<Nav className="mr-2" navbar>
						<NavItem>
							<NavLink href="/mandolins">Shop Mandolins</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/comingsoon">Accessories</NavLink>
						</NavItem>
					</Nav>
					<NavLink href="/cart">
						Cart <span>{cartItems}</span>
					</NavLink>
				</Container>
			</Navbar>
		</div>
	);
}

export default NavBar;
