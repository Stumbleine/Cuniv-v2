import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
const MainStyle = styled('div')(({ theme }) => ({
	overflow: 'auto',
	// minHeight: '92vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	paddingTop: theme.spacing(3),
	paddingBottom: theme.spacing(3),
}));
function DashboardLayout() {
	return (
		<>
			<NavBar></NavBar>
			<MainStyle>
				<Outlet />
			</MainStyle>
		</>
	);
}

export default DashboardLayout;
