import { Button, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import ShowRoles from '../components/ShowRoles';
import CompanieRegisterForm from '../components/forms/CompanieRegisterForm';
import { ArrowBack } from '@mui/icons-material';
import WarningVerified from '../components/WarningVerified';
import { Link } from 'react-router-dom';
import SnackCustom from '../components/SnackCustom';
/**
 * Pagina con formulario registrar una empresa
 * @component CreateSupplierCompanyPage
 * @exports CreateSupplierCompanyPage
 */
export default function CreateSupplierCompanyPage() {
	const { user, isAdmin } = useSelector(state => state.user);
	useEffect(() => {
		document.title = 'ssansi | registro empresa';
	}, []);

	const [snack, setSnack] = useState({
		open: false,
		msg: '',
		severity: 'success',
		redirectPath: null,
	});
	/**
	 * Cierra una alerta <SnackCustom/>
	 * @function closeSnack
	 */
	const closeSnack = () => {
		setSnack({ ...snack, open: false });
	};
	/**
	 * Muestra una alerta <SnackCustom/> con su mensaje
	 * @function handleSnack
	 * @param {String} msg mensaje que se mostrara en la alerta
	 * @param {String} sv tipo de severidad/evento afecta al color de la alerta.
	 * @param {String} [path] ruta de redireccion
	 */
	const handleSnack = (msg, sv, path) => {
		setSnack({ ...snack, open: true, msg: msg, severity: sv, redirectPath: path });
	};
	return (
		<Container maxWidth="lg">
			<SnackCustom data={snack} closeSnack={closeSnack} />
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
					<CompanieRegisterForm handleSnack={handleSnack} />
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
