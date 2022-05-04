import { Delete, Edit, Label } from '@mui/icons-material';
import {
	Container,
	Stack,
	Typography,
	Button,
	Card,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Avatar,
	IconButton,
	TableHead,
	TableSortLabel,
	TablePagination,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useSelector } from 'react-redux';
function UsersTable() {
	const users = useSelector((state) => state.users.users);

	const TABLE_HEAD = [
		{ id: 'nombres', label: 'Nombres', alignRight: false },
		{ id: 'role', label: 'Roles', alignRight: false },
		{ id: 'entidad', label: 'Entidad', alignRight: false },
		{ id: 'fechaRegistro', label: 'Fecha Registro', alignRight: false },
		{ id: 'verificado', label: 'Verificado', alignRight: false },
		{ id: 'estado', label: 'Estado', alignRight: false },
		{ id: 'acciones', label: 'Acciones', alignRight: false },
	];
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		console.log('CantPerpage', event.target.value);
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<Box>
			{/* <Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}>
					<Typography variant="h4" gutterBottom>
						User
					</Typography>
					<Button variant="contained" to="#">
						Crear Usuario
					</Button>
				</Stack> */}
			<Card>
				<TableContainer>
					<Table>
						<TableHead sx={{ bgcolor: 'primary.main' }}>
							<TableRow>
								{TABLE_HEAD.map((cell) => (
									<TableCell key={cell.id} sx={{ color: 'white' }}>
										<Typography noWrap>{cell.label}</Typography>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{users
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((user, index = user.id) => (
									<TableRow key={index} hover>
										<TableCell component="th" scope="row">
											<Stack direction="row" alignItems="center" spacing={2}>
												<Avatar alt={user.nombres} src={user.picture} />
												<Box>
													<Typography variant="subtitle2" noWrap>
														{user.nombres + ' ' + user.apellidos}
													</Typography>

													<Typography
														variant="subtitle2"
														sx={{ color: 'text.secondary' }}
														noWrap>
														{user.email}
													</Typography>
												</Box>
											</Stack>
										</TableCell>
										<TableCell align="left">
											{user.rules?.find((e) => e === 'PRV')
												? 'Proveedor'
												: user.rules?.find((e) => e === 'ADM')
												? 'Administrador'
												: 'Cajero'}
										</TableCell>
										<TableCell align="left">
											{user?.empresa?.razon_social}
										</TableCell>
										<TableCell align="center">{user.create_at}</TableCell>

										<TableCell align="center">Si</TableCell>
										<TableCell align="center">
											<Box
												sx={{
													p: 0.5,
													borderRadius: 2,
													width: 'auto',
													background:
														user.status === 'offline' ? red[400] : green[400],
												}}>
												<Typography
													variant="body2"
													sx={{ color: 'white', lineHeight: 1 }}>
													{user.status}
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
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10]}
					component="div"
					count={users.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Card>
		</Box>
	);
}

export default UsersTable;
