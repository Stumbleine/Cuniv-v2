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
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonTable from '../skeletons/SkeletonTable';
import 'moment/locale/es';
import { deleteUserAsync } from '../../store/usersSlice';
import SnackCustom from '../SnackCustom';
import Edituser from '../dialogs/EditUser';
import DeleteItem from '../dialogs/DeleteItem';
import { hasPrivilege } from '../../Utils/RBAC';
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
	const { user, isAdmin } = useSelector(state => state.user);

	const privilegeEdit = hasPrivilege(
		['gestionar usuarios', 'editar usuario'],
		user.permisos
	);

	const privilegeDelete = hasPrivilege(
		['gestionar usuarios', 'eliminar usuario'],
		user.permisos
	);
	const TABLE_HEAD = [
		{ id: 'nombres', label: 'Nombres', alignRight: false },
		{ id: 'role', label: 'Roles', alignRight: false },
		{ id: 'entidad', label: 'Entidad', alignRight: false },
		{ id: 'fechaRegistro', label: 'Fecha Registro', alignRight: false },
		{ id: 'estado', label: 'Estado', alignRight: false },
	];
	if (privilegeEdit || privilegeDelete) {
		TABLE_HEAD.push({ id: 'acciones', label: 'Acciones', alignRight: false });
	}

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
				handleSnack('Usuario eliminado exitosamente.', 'success');
			})
			.catch(e => {
				handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
			});
	};
	const Actions = ({ user }) => {
		const [isProvider, setIsProvider] = useState(false);
		useEffect(() => {
			user?.roles.forEach(r => {
				if (r.name === 'PRV') {
					setIsProvider(true);
				}
			});
		}, [user]);
		return (
			<Box sx={{ display: 'flex' }}>
				<Edituser user={user} handleSnack={handleSnack} disabled={!isProvider} />
				<DeleteItem
					deleteAsync={deleteAsync}
					id={user.id}
					itemName={user.nombres}
					disabled={!isProvider}
				/>
			</Box>
		);
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
					{users && !filterLoading && !fetchFailed
						? users.map((user, index = user.id) => (
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

												<Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
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
									{(privilegeEdit || privilegeDelete) && (
										<TableCell align="right">
											{/* <Actions user={user} /> */}
											<Box sx={{ display: 'flex' }}>
												{privilegeEdit && (
													<Edituser
														user={user}
														handleSnack={handleSnack}
														// disabled={!isProvider}
													/>
												)}
												{privilegeDelete && (
													<DeleteItem
														deleteAsync={deleteAsync}
														id={user.id}
														itemName={user.nombres}
														// disabled={!isProvider}
													/>
												)}
											</Box>
										</TableCell>
									)}
								</TableRow>
						  ))
						: (isLoading || filterLoading) && <SkeletonTable head={TABLE_HEAD} />}
				</TableBody>
			</Table>
			{(fetchFailed || (!users && !isLoading && !filterLoading)) && (
				<Box width={1} sx={{ py: 2 }}>
					<Typography textAlign="center" color="textSecondary">
						No se encontraron usuarios.
					</Typography>
				</Box>
			)}
		</TableContainer>
	);
}
