import {
	Button,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRubroAsync, filterRubrosAsync } from '../../store/rubrosSlice';
import DeleteItem from '../dialogs/DeleteItem';
import EditRubro from '../dialogs/EditRubro';
import FilterBar from '../FilterBar';
import SkeletonTable from '../skeletons/SkeletonTable';
import { Transition } from '../../Utils/Transitions';
import { Delete, WarningAmber } from '@mui/icons-material';

/**
 * Tabla que enlista los rubros existentes
 * @component RubrosTable
 * @property {Function} handleSnack llama al componente snackbar (alerta)
 * @exports RubrosTable
 */
export default function RubrosTable({ handleSnack }) {
	const dispatch = useDispatch();

	const { rubros, isLoading, filterLoading, fetchFailed } = useSelector(
		state => state.rubros
	);
	const { accessToken } = useSelector(state => state.login);

	const TABLE_HEAD = [
		{ id: 'nombre', label: 'Nombre', alignRight: false },
		{ id: 'descripcion', label: 'Descripción', alignRight: false },
		{ id: 'acciones', label: 'Acciones', alignRight: false },
	];
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [page, setPage] = useState(0);
	/**
	 * Cambia de pagina en la tabla
	 * @function handleChangePage
	 * @param {Object} event
	 */
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	/**
	 * Cambia la cantidad de rubros a mostrarse en la tabla
	 * @function handleChangeRowsPerPage
	 * @param {Object} event
	 */
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	/**
	 * Busca rubros por caracteres con el buscador del componente <FilterBar/>
	 * @function handleSearch
	 * @param {Object} values
	 */
	const handleSearch = values => {
		dispatch(filterRubrosAsync(accessToken, values.search));
	};
	/**
	 * Realiza dispatch hacia la peticion deleteRubroAsync para eliminar un rubro
	 * @function deleteAsync
	 * @param {Number} id identificador de la locacion
	 */
	const deleteAsync = id => {
		/**
		 * @function {async} delet
		 */
		const delet = async () => {
			await dispatch(deleteRubroAsync(accessToken, id));
		};
		delet()
			.then(r => {
				handleSnack('Rubro eliminado exitosamente.', 'success');
			})
			.catch(e => {
				handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
			});
	};

	return (
		<>
			<FilterBar handleSearch={handleSearch} />
			<TableContainer component={Paper} sx={{ borderRadius: 2, mt: 2 }}>
				<Table size="small">
					<TableHead sx={{ bgcolor: 'primary.main' }}>
						<TableRow>
							{TABLE_HEAD.map(cell => (
								<TableCell key={cell.id} sx={{ color: 'white', py: 1 }}>
									<Typography noWrap> {cell.label}</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rubros && !filterLoading && !fetchFailed
							? rubros
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map(rubro => (
										<TableRow key={rubro.nombre} hover>
											<TableCell component="th" scope="row">
												<Stack alignItems="center" direction="row" spacing={1}>
													<CardMedia
														component="img"
														sx={{ width: 40 }}
														alt={rubro.nombre}
														image={rubro.icono}
													/>

													<Typography noWrap>{rubro.nombre}</Typography>
												</Stack>
											</TableCell>
											<TableCell>{rubro.descripcion}</TableCell>
											<TableCell align="right">
												<Box sx={{ display: 'flex' }}>
													<EditRubro rubro={rubro} handleSnack={handleSnack} />
													{rubro.tieneEmpresas ? (
														<Popup itemName={rubro.nombre} />
													) : (
														<DeleteItem
															deleteAsync={deleteAsync}
															id={rubro.nombre}
															itemName={rubro.nombre}
														/>
													)}
												</Box>
											</TableCell>
										</TableRow>
									))
							: (isLoading || filterLoading) && <SkeletonTable head={TABLE_HEAD} />}
					</TableBody>
				</Table>
				{(fetchFailed || (!rubros && !isLoading && !filterLoading)) && (
					<Box width={1} sx={{ py: 2 }}>
						<Typography textAlign="center" color="textSecondary">
							No se encontraron rubros.
						</Typography>
					</Box>
				)}
				{rubros && (
					<TablePagination
						rowsPerPageOptions={[5, 10]}
						component="div"
						count={rubros?.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				)}
			</TableContainer>
		</>
	);
}

const Popup = ({ itemName }) => {
	const [open, setOpen] = useState(false);

	/**
	 * Cambia el estado open a true (abre el dialogo)
	 * @function handleClickOpen
	 */
	const handleClickOpen = () => {
		setOpen(true);
	};
	/**
	 * Cambia el estado open a false (cierra el dialogo)
	 * @function handleClose
	 */
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<IconButton size="small" onClick={handleClickOpen}>
				<Delete
					sx={{
						color: 'text.icon',
						'&:hover': {
							color: 'error.light',
						},
					}}
				/>
			</IconButton>
			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				TransitionComponent={Transition}
				onClose={handleClose}>
				<DialogTitle>{'Aviso el rubro ' + itemName}</DialogTitle>
				<DialogContent>
					<DialogContentText display="flex" alignItems="center">
						<WarningAmber sx={{ mr: 1 }} />
						No puede ser eliminado, debido a que existen empresas clasificadas con este
						rubro.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cerrar</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
