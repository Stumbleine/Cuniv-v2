import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShowRule from '../components/ShowRule';
import Steps from '../components/Steps';
import API from '../conection';
import { getCompaniesAsync } from '../store/companiesSlice';
import { getOffersAsync } from '../store/offersSlice';
import { topOffersAsync } from '../store/publicSlice';
import { getUserDataAync } from '../store/userSlice';

function HomePage() {
	const iduser = useSelector((state) => state.login.acccesToken);
	const dispatch = useDispatch();
	useEffect(() => {
		document.title = 'cuniv | inicio';
		// dispatch(getUserDataAync(iduser));
		// dispatch(getOffersAsync());
		// dispatch(getCompaniesAsync());
	}, []);

	return (
		<Container maxWidth="xl">
			<ShowRule />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}>
				<Steps />
			</Box>
		</Container>
	);
}

export default HomePage;
