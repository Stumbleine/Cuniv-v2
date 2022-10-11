import { Button, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import ShowRoles from '../components/ShowRoles';
import CompanieRegisterForm from '../components/forms/CompanieRegisterForm';
import { ArrowBack } from '@mui/icons-material';
import WarningVerified from '../components/WarningVerified';
import { Link } from 'react-router-dom';

function CreateSupplierCompanyPage() {
	const { user, isAdmin } = useSelector(state => state.user);

	useEffect(() => {
		document.title = 'ssansi | registro empresa';
	}, []);

	return (
		<Container maxWidth="lg">
			<ShowRoles />
			<Box>
				<Box>
					<Typography
						variant="h5"
						sx={{
							mb: 3,
							fontWeight: 'bold',
							color: 'text.title',
							fontStyle: 'italic',
						}}>
						{isAdmin ? 'Añadir empresa proveedora' : 'Registrar empresa'}
					</Typography>
				</Box>
				{isAdmin || user.companie === null ? (
					<CompanieRegisterForm />
				) : (
					<Stack spacing={2} alignItems="center">
						<Typography>
							Su empresa fue registrado, ahora puede crear ofertas y productos para
							beneficiar estudiantes.
						</Typography>
						{(!user.companieVerified || !isAdmin) && (
							<WarningVerified>
								AVISO: Los administradores revisaran la solicitud de afiliacion de su
								empresa a los beneficios estudiantiles, este proceso dura 48 Hrs. Nos
								pondremos en contacto a su correo electronico una vez terminada la
								revision.
							</WarningVerified>
						)}
						<Button
							component={Link}
							variant="outlined"
							to="/"
							startIcon={<ArrowBack></ArrowBack>}>
							Volver a Inicio
						</Button>
					</Stack>
				)}
			</Box>
		</Container>
	);
}

export default CreateSupplierCompanyPage;
