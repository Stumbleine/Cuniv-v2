import { Book, HelpCenter, School, Warning } from '@mui/icons-material';
import {
	Box,
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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLocationAsync } from '../../store/umssSlice';
import DeleteItem from '../dialogs/DeleteItem';
import EditLocation from '../dialogs/EditLocation';
import SkeletonTable from '../skeletons/SkeletonTable';
/**
 * Tabla que enlista las locaciones
 * @component LocationsTable
 * @exports LocationsTable
 */
export default function LocationsTable({ handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);

	const { locations, isLoading, filterLoading, fetchFailed } = useSelector(
		state => state.umss
	);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(0);
	const TABLE_HEAD = [
		{ id: 'location', label: 'Locacion' },
		{ id: 'cor', label: 'Coordenadas' },
		{ id: 'actions', label: 'Acciones' },
	];
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	/**
	 * Realiza dispatch hacia la peticion deleteLocationAsync para eliminar una locacion
	 * @function deleteAsync
	 * @param {Number} id identificador de la locacion
	 */
	const deleteAsync = id => {
		/**
		 * @function {async} delet
		 */
		const delet = async () => {
			return await dispatch(deleteLocationAsync(accessToken, id));
		};
		delet()
			.then(r => {
				handleSnack('Locacion eliminado exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};

	return (
		<TableContainer component={Paper} sx={{ borderRadius: 2, mt: 2 }}>
			<Table size="small">
				<TableHead sx={{ bgcolor: 'primary.main' }}>
					<TableRow>
						{TABLE_HEAD.map(cell => (
							<TableCell key={cell.id} sx={{ color: 'white', py: 1 }}>
								<Typography noWrap>{cell.label}</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{filterLoading ? (
						<SkeletonTable head={TABLE_HEAD} />
					) : locations ? (
						locations
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(location => (
								<TableRow key={location.id} hover>
									<TableCell component="th" scope="row">
										<Stack alignItems="center" direction="row" spacing={1}>
											{location.type === 'Biblioteca' && <Book />}
											{location.type === 'Aula' && <School />}
											{location.type === 'Otro' && <HelpCenter />}
											<Box>
												<Typography
													style={{
														maxWidth: 220,
														whiteSpace: 'nowrap',
														textOverflow: 'ellipsis',
														overflow: 'hidden',
													}}>
													{location.name}
												</Typography>

												<Typography
													variant="body2"
													sx={{ color: 'text.secondary' }}
													noWrap>
													{location.type}
												</Typography>
											</Box>
										</Stack>
									</TableCell>
									<TableCell>
										<Typography variant="body2">{location.lat}</Typography>
										<Typography variant="body2">{location.lng}</Typography>
									</TableCell>
									<TableCell align="right">
										<Box sx={{ display: 'flex' }}>
											<EditLocation location={location} handleSnack={handleSnack} />
											<DeleteItem
												deleteAsync={deleteAsync}
												id={location.id}
												itemName="Locacion"
											/>
										</Box>
									</TableCell>
								</TableRow>
							))
					) : (
						isLoading && <SkeletonTable head={TABLE_HEAD} />
					)}
				</TableBody>
			</Table>
			{!locations && !isLoading && !fetchFailed && (
				<Box width={1} sx={{ py: 2 }}>
					<Typography textAlign="center" color="textSecondary">
						No se encontraron ubicaciones
					</Typography>
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
			{locations && (
				<TablePagination
					rowsPerPageOptions={[10]}
					component="div"
					count={locations?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</TableContainer>
	);
}
