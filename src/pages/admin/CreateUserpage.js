import { ArrowBack } from '@mui/icons-material';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserCreateForm from '../../components/forms/UserCreateForm';
import ShowRoles from '../../components/ShowRoles';
import SnackCustom from '../../components/SnackCustom';
/**
 * Pagina con formulario para registrar usuarios
 * @component CreateUserpage
 * @exports CreateUserpage
 */
export default function CreateUserpage() {
	const { user } = useSelector(state => state.user);

	const [snack, setSnack] = useState({
		open: false,
		msg: '',
		severity: 'success',
		redirectPath: null,
	});
	const [isSADM, setSADM] = useState(false);
	const [isADM, setADM] = useState(false);

	const recognizeRole = () => {
		user?.roles.forEach(r => {
			if (r.name === 'SADM') {
				setSADM(true);
			}
			if (r.name === 'ADM') {
				setADM(true);
			}
		});
	};

	useEffect(() => {
		recognizeRole();
	}, [isSADM]);

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
		<Container>
			<ShowRoles />
			<SnackCustom data={snack} closeSnack={closeSnack} />

			<Box>
				<Typography
					variant="h5"
					sx={{
						mb: 3,
						fontWeight: 'bold',
						color: 'text.title',
						fontStyle: 'italic',
					}}>
					{isSADM ? 'Registro de usuarios' : isADM && 'Registro de proveedor'}
				</Typography>
			</Box>
			<Grid container spacing={2} justifyContent="center" justifyItems="center">
				<Grid item xs={12} sm={10} md={7} lg={6}>
					<Button
						sx={{ mb: 1 }}
						component={Link}
						to="/main/users"
						startIcon={<ArrowBack></ArrowBack>}>
						Volver
					</Button>
					<UserCreateForm handleSnack={handleSnack} isSADM={isSADM} isADM={isADM} />
				</Grid>
			</Grid>
		</Container>
	);
}
