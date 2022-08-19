import { Delete, Edit, Warning } from '@mui/icons-material';
import {
	Stack,
	Typography,
	Card,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Avatar,
	IconButton,
	TableHead,
	TablePagination,
	Paper,
	CircularProgress,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SkeletonTable from '../skeletons/SkeletonTable';
function UsersTable() {
	const { users, isLoading, filterLoading, fetchFailed } = useSelector(
		state => state.users
	);

	const TABLE_HEAD = [
		{ id: 'nombres', label: 'Nombres', alignRight: false },
		{ id: 'role', label: 'Roles', alignRight: false },
		{ id: 'entidad', label: 'Entidad', alignRight: false },
		{ id: 'fechaRegistro', label: 'Fecha Registro', alignRight: false },
		{ id: 'estado', label: 'Estado', alignRight: false },
		{ id: 'acciones', label: 'Acciones', alignRight: false },
	];
	const [rowsPerPage, setRowsPerPage] = useState(10);
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
	return (
		<TableContainer component={Paper} sx={{ borderRadius: 2 }}>
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
					{filterLoading && (
						<TableRow>
							<TableCell component="th" scope="row" />
							<TableCell component="th" scope="row"></TableCell>
							<TableCell component="th" scope="row">
								<CircularProgress size={24} sx={{ color: green[500] }} />
							</TableCell>
							<TableCell component="th" scope="row"></TableCell>
						</TableRow>
					)}
					{users
						? users
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((user, index = user.id) => (
									<TableRow key={index} hover>
										<TableCell component="th" scope="row">
											<Stack direction="row" alignItems="center" spacing={2}>
												<Avatar alt={user.nombres} src={user.picture} />
												<Box>
													<Typography variant="subtitle2">
														{user.nombres + ' ' + user.apellidos}
													</Typography>

													<Typography
														variant="subtitle2"
														sx={{ color: 'text.secondary' }}>
														{user.email}
													</Typography>
												</Box>
											</Stack>
										</TableCell>
										<TableCell align="left">
											{user.roles?.map(e => (
												<Typography key={e.name}>{e.label}</Typography>
											))}
										</TableCell>
										<TableCell align="left">{user.empresa}</TableCell>
										<TableCell align="center">{user.created_at}</TableCell>

										{/* <TableCell align="center">Si</TableCell> */}
										<TableCell align="center">
											<Box
												sx={{
													p: 0.5,
													px: 1,
													borderRadius: 2,
													width: 'auto',
													background: !user.sesion_status ? red[400] : green[500],
												}}>
												<Typography
													variant="body2"
													sx={{ color: 'white', lineHeight: 1, letterSpacing: 0.5 }}>
													{user.sesion_status ? 'online' : 'offline'}
												</Typography>
											</Box>
										</TableCell>
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
			{!users && !isLoading && !fetchFailed && (
				<Box width={1} sx={{ py: 2 }}>
					<Typography textAlign="center" color="textSecondary">
						No se encontraron usuarios
					</Typography>
				</Box>
			)}
			{fetchFailed && (
				<Box
					width={1}
					sx={{ py: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Warning color="error" sx={{ mr: 2 }} />

					<Typography textAlign="center" color="error">
						Error del servidor
					</Typography>
				</Box>
			)}
			{users && (
				<TablePagination
					sx={{
						background: 'white',
						// borderBottomLeftRadius: 2,
						// borderBottomRightRadius: 2,
					}}
					rowsPerPageOptions={[10, 15]}
					component="div"
					count={users?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</TableContainer>
	);
}

export default UsersTable;
