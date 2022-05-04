import { styled } from '@mui/material/styles';
// import { pink } from '@mui/material/colors';
import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { Typography, AppBar, Container, Toolbar } from '@mui/material';
import { Box } from '@mui/system';

const ContainerStyle = styled('div')(({ theme }) => ({
	// flexGrow: 1,
	overflow: 'auto',
	minHeight: '93vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
}));
const LogoOnlyLayout = () => {
	return (
		<>
			<AppBar
				position="static"
				elevation={0}
				sx={{
					background: 'white',
					zIndex: 'tooltip',
				}}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box
							component="div"
							noWrap
							sx={{
								flexGrow: 1,
								mr: 2,
							}}>
							<RouterLink to="/" style={{ textDecoration: 'none' }}>
								<img
									src="/svgs/logoCuniv.svg"
									style={{ width: 'auto', height: 50 }}
								/>
							</RouterLink>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<ContainerStyle>
				<Outlet />
			</ContainerStyle>
		</>
	);
};
export default LogoOnlyLayout;
