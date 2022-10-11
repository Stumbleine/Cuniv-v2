import { Add } from '@mui/icons-material';
import {
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ShowRoles from '../components/ShowRoles';
import UsersTable from '../components/tables/UsersTable';
import API from '../conection';
import { filterUsersAsync, usersAsync } from '../store/usersSlice';

function UsersPage() {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const [roles, setRoles] = useState([
		{ name: 'PRV', label: 'Proveedor' },
		{ name: 'ADM', label: 'Administrador' },
		{ name: 'SADM', label: 'SuperAdministrador' },
		{ name: 'EST', label: 'Estudiante' },
		{ name: 'CJRO', label: 'Cajero' },
	]);

	const [search, setSearch] = useState('All');
	const [rol, setRol] = useState('All');
	const [sesion, setSesion] = useState('All');

	useEffect(() => {
		document.title = 'ssansi | usuarios';
		dispatch(usersAsync(accessToken));
		const getRoles = async () => {
			const r = await API.get('select/roles', {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setRoles(r.data);
		};
		getRoles();
	}, []);

	const handleRol = event => {
		setRol(event.target.value);
		dispatch(filterUsersAsync(accessToken, search, event.target.value, sesion));
	};

	const handleSesion = event => {
		setSesion(event.target.value);
		dispatch(filterUsersAsync(accessToken, search, rol, event.target.value));
	};
	const handleSearch = values => {
		setSearch(values.search);
		dispatch(filterUsersAsync(accessToken, values.search, rol, sesion));
	};

	return (
		<Container maxWidth="lg">
			<ShowRoles />
			<Box>
				<Box>
					<Typography
						variant="h5"
						sx={{
							mb: 2,
							fontWeight: 'bold',
							color: 'text.title',
							fontStyle: 'italic',
						}}>
						Usuarios
					</Typography>
					<Stack
						direction={{ xs: 'column', md: 'row' }}
						alignItems="center"
						sx={{
							mb: 3,
						}}
						spacing={2}>
						<FilterBar handleSearch={handleSearch}>
							<FormControl sx={{ minWidth: { xs: 1, sm: 160 } }} size="small">
								<InputLabel id="role-label">Rol</InputLabel>
								<Select
									labelId="role-label"
									id="role-filter"
									defaultValue={'All'}
									onChange={handleRol}
									input={<OutlinedInput id="role-filter" label="Rol" />}>
									<MenuItem value="All">Todos</MenuItem>
									{roles?.map(r => (
										<MenuItem key={r.name} value={r.name}>
											{r.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl sx={{ minWidth: { xs: 1, sm: 160 } }} size="small">
								<InputLabel id="sesion-label">Estado</InputLabel>
								<Select
									labelId="sesion-label"
									id="sesion-filter"
									defaultValue={'All'}
									onChange={handleSesion}
									input={<OutlinedInput id="sesion-filter" label="Estado" />}>
									<MenuItem value="All">Todos</MenuItem>
									<MenuItem value="online">Online</MenuItem>
									<MenuItem value="offline">Offline</MenuItem>
								</Select>
							</FormControl>
						</FilterBar>

						<Button
							to={`/main/createUser`}
							component={Link}
							sx={{ textDecoration: 'none', width: { xs: '100%', md: 'auto' } }}
							startIcon={<Add />}
							variant="contained">
							Usuario
						</Button>
					</Stack>
				</Box>
				<UsersTable></UsersTable>
			</Box>
		</Container>
	);
}

export default UsersPage;
