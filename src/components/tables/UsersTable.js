import { Warning } from '@mui/icons-material';
import {
	Stack,
	Typography,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Avatar,
	TableHead,
	TablePagination,
	Paper,
	CircularProgress,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonTable from '../skeletons/SkeletonTable';
import 'moment/locale/es';
import { deleteUserAsync } from '../../store/usersSlice';
import SnackCustom from '../SnackCustom';
import Edituser from '../dialogs/EditUser';
import DeleteItem from '../dialogs/DeleteItem';
/**
 * Tabla que enlista usuarios del sistema
 * @component UsersTable
 * @exports UsersTable
 */
export default function UsersTable() {
	const dispatch = useDispatch();
	const { users, isLoading, filterLoading, fetchFailed } = useSelector(
		state => state.users
	);
	const { accessToken } = useSelector(state => state.login);

	const TABLE_HEAD = [
		{ id: 'nombres', label: 'Nombres', alignRight: false },
		{ id: 'role', label: 'Roles', alignRight: false },
		{ id: 'entidad', label: 'Entidad', alignRight: false },
		{ id: 'fechaRegistro', label: 'Fecha Registro', alignRight: false },
		{ id: 'estado', label: 'Estado', alignRight: false },
		{ id: 'acciones', label: 'Acciones', alignRight: false },
	];
	const [rowsPerPage, setRowsPerPage] = useState(15);
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
	 * Cambia la cantidad de usuarios a mostrarse en la tabla
	 * @function handleChangeRowsPerPage
	 * @param {Object} event
	 */
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 20));
		setPage(0);
	};

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
	 * Realiza dispatch hacia la peticion deleteUserAsync para eliminar un usuario
	 * @function deleteAsync
	 * @param {Number} id identificador de la locacion
	 */
	const deleteAsync = id => {
		/**
		 * @function {async} delet
		 */
		const delet = async () => {
			await dispatch(deleteUserAsync(accessToken, id));
		};
		delet()
			.then(r => {
				handleSnack('Usuario eliminado exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};

	return (
		<TableContainer component={Paper} sx={{ borderRadius: 2 }}>
			<SnackCustom data={snack} closeSnack={closeSnack} />

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
													<Typography
														sx={{
															maxWidth: 200,
															whiteSpace: 'nowrap',
															textOverflow: 'ellipsis',
															overflow: 'hidden',
														}}
														variant="subtitle2">
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
										<TableCell align="left">
											{moment(user.created_at).format('LL')}
										</TableCell>

										<TableCell align="center">
											<Box
												sx={{
													p: 0.5,
													px: 1,
													borderRadius: 2,
													width: 'auto',
													background:
														user.sesion_status === 'offline' ? red[400] : green[500],
												}}>
												<Typography
													variant="body2"
													sx={{ color: 'white', lineHeight: 1, letterSpacing: 0.5 }}>
													{user.sesion_status}
												</Typography>
											</Box>
										</TableCell>
										<TableCell align="right">
											<Box sx={{ display: 'flex' }}>
												<Edituser user={user} handleSnack={handleSnack} />
												<DeleteItem
													deleteAsync={deleteAsync}
													id={user.id}
													itemName={user.nombres}
												/>
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
					rowsPerPageOptions={[15, 20]}
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
