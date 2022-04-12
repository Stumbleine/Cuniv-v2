import { styled } from '@mui/material/styles';
// import { pink } from '@mui/material/colors';
import React from 'react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import {
	Typography,
	AppBar,
	Container,
	Toolbar,
	Link,
	Button,
} from '@mui/material';

import { Box } from '@mui/system';

const MainStyle = styled('div')(({ theme }) => ({
	// flexGrow: 1,
	overflow: 'auto',
	minHeight: '92vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	// paddingTop: APP_BAR_MOBILE + 24,
	// paddingBottom: theme.spacing(10),
	// [theme.breakpoints.up('lg')]: {
	// 	paddingTop: APP_BAR_DESKTOP + 24,
	// 	paddingLeft: theme.spacing(2),
	// 	paddingRight: theme.spacing(2),
	// },
}));
export default function AuthLayout({ children }) {
	const { pathname } = useLocation();
	return (
		<>
			<AppBar position="static">
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
						{pathname === '/login' ? (
							<Typography
								variant="body1"
								sx={{
									display: { xs: 'none', sm: 'block' },
									mt: { md: -2 },
								}}>
								Aun no tiene una cuenta? &nbsp;
								<Link
									underline="none"
									variant="subtitle2"
									component={RouterLink}
									to="/register"
									sx={{ color: 'white' }}>
									Registrarse
								</Link>
							</Typography>
						) : pathname === '/register' ? (
							<Typography
								variant="body1"
								sx={{
									display: { xs: 'none', sm: 'block' },
									mt: { md: -2 },
								}}>
								Ya tiene una cuenta? &nbsp;
								<Link
									underline="none"
									variant="subtitle2"
									component={RouterLink}
									to="/login"
									sx={{ color: 'white' }}>
									Iniciar Sesion
								</Link>
							</Typography>
						) : null}

						{pathname === '/index' ? (
							<Box sx={{ display: 'flex' }}>
								<Link
									underline="none"
									variant="subtitle2"
									component={RouterLink}
									sx={{ color: 'white', mr: 2 }}
									to="/login">
									<Button color="inherit">Iniciar Sesion</Button>
								</Link>
								<Link
									underline="none"
									variant="subtitle2"
									component={RouterLink}
									sx={{ color: 'white' }}
									to="/register">
									<Button variant="outlined" color="inherit">
										Registrarse
									</Button>
								</Link>
							</Box>
						) : null}
					</Toolbar>
				</Container>
			</AppBar>
			<MainStyle>
				<Outlet />
			</MainStyle>
		</>
	);
}
