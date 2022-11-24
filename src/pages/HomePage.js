import { Container, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ShowRoles from '../components/ShowRoles';
import Steps from '../components/Steps';
import WarningVerified from '../components/WarningVerified';
/**
 * Pagina de inicio de un usuario
 * @component HomePage
 * @exports HomePage
 */
export default function HomePage() {
	const { user, isAdmin } = useSelector(state => state.user);
	const navigate = useNavigate();
	useEffect(() => {
		isAdmin && navigate('/main/statics');
	}, []);

	return (
		<Container maxWidth="xl">
			<ShowRoles />
			{user?.companieVerified === false && !isAdmin && (
				<WarningVerified>¡Su empresa a un no fue verificado!</WarningVerified>
			)}
			<Stack
				spacing={1}
				sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 2, mt: 2, py: 3 }}
				alignItems="center">
				<Typography
					color="white"
					sx={{
						fontWeight: 'bold',
						lineHeight: 1,
						textAlign: { xs: 'center', md: 'left' },
						fontSize: 40,
						fontFamily: 'Roboto condensed',
					}}>
					AMIGOS DE
				</Typography>
				<Typography
					color="secondary"
					sx={{
						fontWeight: 'bold',
						lineHeight: 1,
						textAlign: { xs: 'center', md: 'left' },
						fontSize: 40,
						fontFamily: 'Roboto condensed',
					}}>
					SAN SIMÓN
				</Typography>
			</Stack>
			<Stack spacing={1} sx={{ mt: 2 }} alignItems="center">
				{/* {isAdmin ? (
					<Stack spacing={1}>
						<Typography variant="h2" fontWeight="bold" aling="center">
							¡Bienvenido administrador!
						</Typography>
					</Stack>
				) : ( */}

				<Stack spacing={1} alignItems="center">
					<Typography variant="h4" fontWeight="bold" textAlign="center">
						¡Hola {user.nombres}, Bienvenido!
					</Typography>
					<Typography variant="h5" color="textSecondary" textAlign="center">
						Estamos contentos de tenerte aqui.
					</Typography>
				</Stack>
				{/* )} */}
				{!isAdmin && <Steps />}
			</Stack>
		</Container>
	);
}
