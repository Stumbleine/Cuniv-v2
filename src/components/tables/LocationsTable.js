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
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLocationAsync } from '../../store/umssSlice';
import DeleteDialog from '../dialogs/DeleteDialog';
import EditLocation from '../dialogs/EditLocation';
import SkeletonTable from '../skeletons/SkeletonTable';
import SnackCustom from '../SnackCustom';

export default function LocationsTable() {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);

	const { locations, isLoading, filterLoading, fetchFailed } = useSelector(
		state => state.umss
	);
	const [rowsPerPage, setRowsPerPage] = useState(7);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const TABLE_HEAD = [
		{ id: 'location', label: 'Locacion' },
		// { id: 'type', label: 'Tipo' },
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

	const deleteAsync = async id => {
		console.log('delete', id);

		return await dispatch(deleteLocationAsync(accessToken, id));
	};

	return (
		<TableContainer component={Paper} sx={{ borderRadius: 2, mt: 2 }}>
			<Table>
				<TableHead sx={{ bgcolor: 'primary.main' }}>
					<TableRow>
						{TABLE_HEAD.map(cell => (
							<TableCell key={cell.id} sx={{ color: 'white' }}>
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
												<Typography noWrap>{location.name}</Typography>

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
									{/* <TableCell></TableCell> */}
									<TableCell align="right">
										<Box sx={{ display: 'flex' }}>
											<EditLocation location={location} />
											<DeleteDialog
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
					rowsPerPageOptions={[7]}
					component="div"
					count={locations?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					// onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</TableContainer>
	);
}
