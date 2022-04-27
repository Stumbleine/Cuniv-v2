import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API from '../conection';
import { getCompaniesAsync } from '../store/companiesSlice';
import { getOffersAsync } from '../store/offersSlice';
import { topOffersAsync } from '../store/publicSlice';

function HomePage() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOffersAsync());
		dispatch(getCompaniesAsync());
	}, []);

	return <div>HomePage</div>;
}

export default HomePage;
