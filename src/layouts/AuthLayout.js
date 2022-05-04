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
	Stack,
} from '@mui/material';

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
const screenSizes = () => {
	return (
		<>
			<Typography
				sx={{ display: { xs: 'flex', sm: 'none' }, color: 'text.primary' }}>
				[ xs ]
			</Typography>
			<Typography
				sx={{
					display: { xs: 'none', sm: 'flex', md: 'none' },
					color: 'text.primary',
				}}>
				[ sm ]
			</Typography>
			<Typography
				sx={{
					display: { xs: 'none', sm: 'none', md: 'flex', lg: 'none' },
					color: 'text.primary',
				}}>
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
					color: 'text.primary',
				}}>
				[ lg ]
			</Typography>
			<Typography
				sx={{
					display: {
						xs: 'none',
						sm: 'none',
						md: 'none',
						lg: 'none',
						xl: 'flex',
					},
					color: 'text.primary',
				}}>
				[ xl ]
			</Typography>
		</>
	);
};
export default function AuthLayout() {
	const { pathname } = useLocation();
	return (
		<>
			<AppBar position="static" sx={{ background: 'white' }}>
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
								<img
									src="/svgs/logoCuniv.svg"
									style={{ width: 'auto', height: 50 }}
								/>
							</RouterLink>
						</Box>
						{screenSizes()}

						{pathname === '/login' ? (
							<Stack direction="row" spacing={2}>
								<Typography color="textPrimary">
									Aun no tiene una cuenta?
								</Typography>
								<Link
									// underline="none"
									// variant="subtitle1"
									component={RouterLink}
									to="/register">
									Registrarse
								</Link>
							</Stack>
						) : pathname === '/register' ? (
							<Stack direction="row" spacing={2}>
								<Typography color="textPrimary">
									Ya tiene una cuenta?
								</Typography>
								<Link
									// underline="none"
									// variant="subtitle1"
									component={RouterLink}
									to="/login">
									Iniciar Sesion
								</Link>
							</Stack>
						) : null}
						{pathname === '/index' ? (
							<Box sx={{ display: 'flex' }}>
								<Link
									underline="none"
									variant="subtitle2"
									component={RouterLink}
									sx={{ mr: 2 }}
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
			<ContainerStyle>
				<Outlet />
			</ContainerStyle>
		</>
	);
}
