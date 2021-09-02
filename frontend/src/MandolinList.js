import React, { useState, useEffect } from 'react';
import MandoApi from './api';
import MandoCard from './MandoCard';

function MandolinList() {
	const [ mandolins, setMandolins ] = useState([]);
	const [ searchParams, setSearchParams ] = useState();

	useEffect(
		() => {
			async function getCompanies() {
				const mandolins = await MandoApi.getMandolins(searchParams);
				setMandolins(mandolins);
			}
			getCompanies();
		},
		[ searchParams ]
	);

	console.log('Mandolins:', mandolins);

	return (
		<div className="d-flex flex-row flex-wrap justify-content-between">
			{mandolins.map(m => <MandoCard key={m.sku} mandolin={m} />)}
		</div>
	);
}

export default MandolinList;
