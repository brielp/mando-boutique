import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import MandolinList from './MandolinList';
import MandoDetails from './MandoDetails';
import Cart from './Cart';
import MandoApi from './api';

function App() {
	const [ cartId, setCartId ] = useState('');
	const [ cartItems, setCartItems ] = useState(0);

	useEffect(() => {
		const storedId = localStorage.getItem('cartId');
		if (storedId) {
			setCart(storedId);
			console.log('this is running');
		}
	}, []);

	useEffect(
		() => {
			async function getCartItems() {
				const cart = await MandoApi.getCartItems(cartId);
				setCartItems(cart.length);
			}
			if (cartId) {
				getCartItems();
			}
		},
		[ cartId ]
	);

	async function setCart(id) {
		setCartId(id);
		MandoApi.cartId = id;
		localStorage.setItem('cartId', id);
	}

	return (
		<div className="App">
			<BrowserRouter>
				<NavBar cartItems={cartItems} />
				<Switch>
					<Route exact path="/">
						<Home cartId={cartId} />
					</Route>
					<Route exact path="/mandolins">
						<MandolinList cartId={cartId} />
					</Route>
					<Route path="/mandolins/:sku">
						<MandoDetails setCartId={setCart} cartId={cartId} />
					</Route>
					<Route exact path="/cart">
						<Cart cartId={cartId} />
					</Route>
					{/* 
          
          <Route exact path="/signup">
            <SignupForm signup={signup}/>
          </Route>
          <Route exact path="/profile">
            <ProfileForm user={userData} update={updateProfile}/>
          </Route> */}
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
