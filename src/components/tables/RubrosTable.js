import { Delete, Edit, Warning } from '@mui/icons-material';
import {
	Avatar,
	CircularProgress,
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
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterRubrosAsync } from '../../store/rubrosSlice';
import FilterBar from '../FilterBar';
import SkeletonTable from '../skeletons/SkeletonTable';

function RubrosTable() {
	const dispatch = useDispatch();

	const { rubros, isLoading, filterLoading, fetchFailed } = useSelector(
		state => state.rubros
	);
	const { accessToken } = useSelector(state => state.login);

	const [search, setSearch] = useState('All');

	const TABLE_HEAD = [
		{ id: 'nombre', label: 'Nombre rubro', alignRight: false },
		{ id: 'descripcion', label: 'Descripcion', alignRight: false },
		{ id: 'acciones', label: 'Acciones', alignRight: false },
	];
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
		console.log('CantPerpage', event.target.value);
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleSearch = values => {
		setSearch(values.search);
		dispatch(filterRubrosAsync(accessToken, values.search));
	};
	return (
		<>
			<FilterBar handleSearch={handleSearch} />
			<TableContainer component={Paper} sx={{ borderRadius: 2 }}>
				<Table>
					<TableHead sx={{ bgcolor: 'primary.main' }}>
						<TableRow>
							{TABLE_HEAD.map(cell => (
								<TableCell key={cell.id} sx={{ color: 'white' }}>
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
													<Avatar alt={rubro.nombre} src={rubro.picture} />

													<Typography noWrap>{rubro.nombre}</Typography>
												</Stack>
											</TableCell>
											<TableCell>{rubro.descripcion}</TableCell>
											<TableCell align="right">
												<Box sx={{ display: 'flex' }}>
													<IconButton>
														<Edit></Edit>
													</IconButton>
													<IconButton>
														<Delete></Delete>
													</IconButton>
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

export default RubrosTable;
