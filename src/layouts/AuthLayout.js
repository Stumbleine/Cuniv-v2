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
	CircularProgress,
} from '@mui/material';

import { Box } from '@mui/system';

const MainStyle = styled('div')(({ theme }) => ({
	// flexGrow: 1,
	overflow: 'auto',
	minHeight: '92vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	paddingTop: 40,
	// paddingBottom: theme.spacing(10),
	// [theme.breakpoints.up('lg')]: {
	// 	paddingTop: APP_BAR_DESKTOP + 24,
	// 	paddingLeft: theme.spacing(2),
	// 	paddingRight: theme.spacing(2),
	// },
}));
const screenSizes = () => {
	return (
		<>
			<Typography variant="h6" sx={{ display: { xs: 'flex', sm: 'none' } }}>
				[ xs ]
			</Typography>
			<Typography
				variant="6"
				sx={{ display: { xs: 'none', sm: 'flex', md: 'none' } }}>
				[ sm ]
			</Typography>
			<Typography
				variant="h6"
				sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'none' } }}>
				[ md ]
			</Typography>
			<Typography
				variant="h6"
				sx={{
					display: {
						xs: 'none',
						sm: 'none',
						md: 'none',
						lg: 'flex',
						xl: 'none',
					},
				}}>
				[ lg ]
			</Typography>
			<Typography
				variant="h6"
				sx={{
					display: {
						xs: 'none',
						sm: 'none',
						md: 'none',
						lg: 'none',
						xl: 'flex',
					},
				}}>
				[ xl ]
			</Typography>
		</>
	);
};
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
						{/* {screenSizes()} */}

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
									<Button size="small" color="inherit" variant="outlined">
										Iniciar Sesion
									</Button>
								</Link>
								{/* <Link
									underline="none"
									variant="subtitle2"
									component={RouterLink}
									sx={{ color: 'white' }}
									to="/register">
									<Button size="small" variant="outlined" color="inherit">
										Registrarse
									</Button>
								</Link> */}
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
