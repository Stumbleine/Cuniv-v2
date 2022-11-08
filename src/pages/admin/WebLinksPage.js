import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterBar from '../../components/FilterBar';
import AddLinkForm from '../../components/forms/AddLinkForm';
import ListLinks from '../../components/lists/ListLinks';
import ShowRoles from '../../components/ShowRoles';
import SnackCustom from '../../components/SnackCustom';
import LinksTable from '../../components/tables/LinksTable';
import { getSitesAsync } from '../../store/umssSlice';
/**
 * Pagina para gestionar links del sistema
 * @component WebLinksPage
 * @exports WebLinksPage
 */
export default function WebLinksPage() {
	const { accessToken } = useSelector(state => state.login);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSitesAsync(accessToken, 'All'));
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
	/**
	 * Realiza la busqueda de links segun los caracteres ingresados
	 * @function closeSnack
	 * @param {Object} values
	 */
	const handleSearch = values => {
		dispatch(getSitesAsync(accessToken, values.search));
	};
	return (
		<Container maxWidth="xl">
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
						Links de la universidad
					</Typography>
				</Box>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<FilterBar handleSearch={handleSearch} />
						<LinksTable handleSnack={handleSnack} />
						{/* <Paper
							sx={{
								p: 2,
								mt: 2,
								maxHeight: 600,
								overflow: 'scroll',
								overflowX: 'hidden',
							}}
							className="container">
							<ListLinks handleSnack={handleSnack} />
						</Paper> */}
					</Grid>
					<Grid item xs={12} md={6}>
						<AddLinkForm handleSnack={handleSnack} />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
