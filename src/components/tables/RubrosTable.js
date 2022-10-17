import { Warning } from '@mui/icons-material';
import {
	CardMedia,
	CircularProgress,
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
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRubroAsync, filterRubrosAsync } from '../../store/rubrosSlice';
import DeleteItem from '../dialogs/DeleteItem';
import EditRubro from '../dialogs/EditRubro';
import FilterBar from '../FilterBar';
import SkeletonTable from '../skeletons/SkeletonTable';
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
		{ id: 'nombre', label: 'Nombre rubro', alignRight: false },
		{ id: 'descripcion', label: 'Descripcion', alignRight: false },
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
				handleSnack('Rubro eliminado exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
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
						{filterLoading && (
							<TableRow>
								<TableCell component="th" scope="row" />
								<TableCell component="th" scope="row">
									<CircularProgress size={24} sx={{ color: green[500] }} />
								</TableCell>
							</TableRow>
						)}
						{rubros
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
													<DeleteItem
														deleteAsync={deleteAsync}
														id={rubro.nombre}
														itemName={rubro.nombre}
													/>
												</Box>
											</TableCell>
										</TableRow>
									))
							: isLoading && <SkeletonTable head={TABLE_HEAD} />}
					</TableBody>
				</Table>
				{!rubros && !isLoading && !fetchFailed && (
					<Box sx={{ width: '100%', textAlign: 'center', mt: 2, mb: 2 }}>
						<Typography color="textSecondary">No se encontraron rubros</Typography>
					</Box>
				)}
				{fetchFailed && (
					<Box
						width={1}
						sx={{
							py: 2,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Warning color="error" sx={{ mr: 2 }} />
						<Typography textAlign="center" color="error">
							Error del servidor
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
