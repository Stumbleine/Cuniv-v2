import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const ContainerStyle = styled('div')(({ theme }) => ({
	overflow: 'auto',
	// minHeight: '92vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	paddingTop: theme.spacing(3),
	paddingBottom: theme.spacing(2),
}));
function DashboardLayout() {
	return (
		<>
			<NavBar></NavBar>
			<ContainerStyle>
				<Outlet />
			</ContainerStyle>
		</>
	);
}

export default DashboardLayout;
