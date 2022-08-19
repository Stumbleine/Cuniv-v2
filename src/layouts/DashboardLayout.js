import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import NavBar from './NavBar';
import SideBar from './SideBar';
import '../styles/scroll.css';
const ContainerStyle = styled('div')(({ theme }) => ({
	overflow: 'auto',
	// minHeight: '92vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
}));
function DashboardLayout() {
	const [openSB, setOpenSB] = useState(false);

	return (
		<>
			<NavBar onOpenSidebar={() => setOpenSB(true)} />
			<SideBar openSideBar={openSB} onCloseSideBar={() => setOpenSB(false)} />
			<ContainerStyle className="container">
				<Outlet />
			</ContainerStyle>
		</>
	);
}

export default DashboardLayout;
