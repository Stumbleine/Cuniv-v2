import { styled } from '@mui/material/styles';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import {
	Typography,
	AppBar,
	Container,
	Toolbar,
	Link,
	Button,
	Stack,
} from '@mui/material';

import { Box } from '@mui/system';

import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function AuthLayout() {
	const { pathname } = useLocation();

	const Page = styled('div')(({ theme }) => ({
		overflow: 'auto',
		minHeight: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',

		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(10),
	}));
	const LandingPage = styled('div')(({ theme }) => ({
		overflow: 'auto',
		minHeight: '100vh',
		position: 'relative',
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(10),
	}));

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

								textDecoration: 'none',
							}}>
							<Logo />
						</Box>
						{pathname === '/login' ? (
							<Stack direction="row" spacing={2}>
								<Typography color="textPrimary">¿No tiene una cuenta?</Typography>
								<Link component={RouterLink} to="/register">
									Registrarse
								</Link>
							</Stack>
						) : pathname === '/register' ? (
							<Stack direction="row" spacing={2}>
								<Typography color="textPrimary">¿Ya tiene una cuenta?</Typography>
								<Link component={RouterLink} to="/login">
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
									<Button size="small" color="inherit">
										Iniciar Sesion
									</Button>
								</Link>
								<Link
									underline="none"
									variant="subtitle2"
									component={RouterLink}
									to="/register">
									<Button size="small" variant="outlined" color="inherit">
										Registrarse
									</Button>
								</Link>
							</Box>
						) : null}
					</Toolbar>
				</Container>
			</AppBar>

			{pathname === '/index' ? (
				<LandingPage>
					<Outlet />
					<Footer />
				</LandingPage>
			) : (
				<Page>
					<Outlet />
					<Footer />
				</Page>
			)}
		</>
	);
}
