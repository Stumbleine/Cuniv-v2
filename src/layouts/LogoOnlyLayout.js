import { styled } from '@mui/material/styles';
// import { pink } from '@mui/material/colors';
import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { Typography, AppBar, Container, Toolbar } from '@mui/material';
import { Box } from '@mui/system';

const HeaderStyle = styled('header')(({ theme }) => ({
	top: 0,
	left: 0,
	lineHeight: 0,
	backgroundColor: theme.palette.primary.main,
	width: '100%',
	position: 'absolute',
	// padding: theme.spacing(3, 3, 0),
	// [theme.breakpoints.up('sm')]: {
	// 	padding: theme.spacing(5, 5, 0),
	// },
}));

const LogoOnlyLayout = () => {
	return (
		<>
			{/* <HeaderStyle>
				<RouterLink to="/">
					<Box>
						<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
							CUNIV-LOGO
						</Typography>
					</Box>
				</RouterLink>
			</HeaderStyle> */}
			<AppBar
				position="static"
				elevation={0}
				sx={{
					background: 'grey',
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
								// display: {
								// 	xs: 'none',
								// 	md: 'flex',
								// },
								textDecoration: 'none',
							}}>
							<RouterLink to="/" style={{ textDecoration: 'none' }}>
								<Typography
									variant="h5"
									sx={{
										fontWeight: 'bold',
										color: 'white',
									}}>
									CUNIV-LOGO
								</Typography>
							</RouterLink>
						</Box>
						<RouterLink to="/" style={{ textDecoration: 'none' }}>
							asdas
						</RouterLink>
					</Toolbar>
				</Container>
			</AppBar>
			<div>
				<Outlet />
			</div>
		</>
	);
};
export default LogoOnlyLayout;
