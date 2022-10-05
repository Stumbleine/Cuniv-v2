import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import ShowRoles from '../components/ShowRoles';
import Steps from '../components/Steps';
import WarningVerified from '../components/WarningVerified';
import API from '../conection';
// import socket from '../socket';
import { getCompaniesAsync } from '../store/companiesSlice';
import { getOffersAsync } from '../store/offersSlice';
import { topOffersAsync } from '../store/publicSlice';
import { getUserDataAync } from '../store/userSlice';

function HomePage() {
	const { user } = useSelector(state => state.user);

	const dispatch = useDispatch();
	// useEffect(() => {
	// 	let _lsTotal = 0;
	// 	let _xLen = 0;
	// 	let _x = 0;
	// 	for (_x in localStorage) {
	// 		// eslint-disable-next-line no-prototype-builtins
	// 		if (!localStorage.hasOwnProperty(_x)) {
	// 			continue;
	// 		}
	// 		_xLen = (localStorage[_x].length + _x.length) * 2;
	// 		_lsTotal += _xLen;
	// 		console.log(_x.substr(0, 50) + ' = ' + (_xLen / 1024).toFixed(2) + ' KB');
	// 	}

	// 	console.log('Total = ' + (_lsTotal / 1024).toFixed(2) + ' KB');
	// 	document.title = 'ssansi | inicio';
	// }, []);

	return (
		<Container maxWidth="xl">
			<ShowRoles />
			{user?.companieVerified === false && (
				<WarningVerified>¡Su empresa a un no fue verificado!</WarningVerified>
			)}

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
