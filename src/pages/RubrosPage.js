import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import RubroAddForm from '../components/forms/RubroAddForm';
import RubrosTable from '../components/tables/RubrosTable';
import ShowRoles from '../components/ShowRoles';
import { useDispatch, useSelector } from 'react-redux';
import { rubrosAsync } from '../store/rubrosSlice';
import SnackCustom from '../components/SnackCustom';
/**
 * Pagina para mostrar los rubros existentes, y agregar rubros
 * @component RubrosPage
 * @exports RubrosPage
 */
export default function RubrosPage() {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);

	useEffect(() => {
		dispatch(rubrosAsync(accessToken));
		document.title = 'ssansi | rubros';
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
			<ShowRoles />
			<SnackCustom data={snack} closeSnack={closeSnack} />

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
						Rubros
					</Typography>
				</Box>
				<Grid container spacing={2}>
					<Grid item xs={12} md={7}>
						<RubrosTable handleSnack={handleSnack} />
					</Grid>
					<Grid item xs={12} md={5}>
						<RubroAddForm handleSnack={handleSnack} />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
