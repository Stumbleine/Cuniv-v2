import { Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
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

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}>
				{isAdmin ? (
					<Stack spacing={1}>
						<Typography variant="h2" fontWeight="bold" aling="center">
							¡Bienvenido administrador!
						</Typography>
						{/* <Typography color="textSecondary"  aling="center"></Typography> */}
					</Stack>
				) : (
					<Steps />
				)}
			</Box>
		</Container>
	);
}
