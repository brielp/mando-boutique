import React, { useState, useEffect } from 'react';
import MandoApi from './api';
import MandoCard from './MandoCard';
import { Grid } from '@material-ui/core';

function MandolinList() {
	const [ mandolins, setMandolins ] = useState([]);

	useEffect(() => {
		async function getCompanies() {
			const mandolins = await MandoApi.getMandolins();
			setMandolins(mandolins);
		}
		getCompanies();
	}, []);

	console.log('Mandolins:', mandolins);

	return (
		<Grid container direction="row" justifyContent="space-evenly" alignItems="stretch">
			{mandolins.map(m => <MandoCard key={m.sku} mandolin={m} />)}
		</Grid>
	);
}

export default MandolinList;
