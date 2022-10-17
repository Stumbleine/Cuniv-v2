import { Add, Pending } from '@mui/icons-material';
import {
	Container,
	Grid,
	Typography,
	Stack,
	Button,
	Chip,
	FormControl,
	InputLabel,
	Select,
	OutlinedInput,
	MenuItem,
	CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ShowRoles from '../components/ShowRoles';
import SupplierCompany from '../components/cards/SupplierCompany';
import { hasPrivilege } from '../Utils/RBAC';
import {
	compNotVerifiedAsync,
	filterCompaniesAsync,
	getCompaniesAsync,
	getRubros,
} from '../store/companiesSlice';
import CompanieNV from '../components/cards/CompanieNV';
import SkeletonCompanie from '../components/skeletons/SkeletonCompanie';
import FilterBar from '../components/FilterBar';
import SnackCustom from '../components/SnackCustom';
import { green } from '@mui/material/colors';
/**
 * Pagina que enlista las empresas registradas, aprobadas y que enviaron solicitud de afiliacion
 * @component SupplierCompaniesPage
 * @exports SupplierCompaniesPage
 */
export default function SupplierCompaniesPage() {
	const dispatch = useDispatch();
	const { isLoading, companies, companiesNV, selectRubros, filterLoading } = useSelector(
		state => state.companies
	);
	const { user, isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const [showButton, setShowButton] = useState(false);
	const [showNVCompanies, setNVCompanies] = useState(false);
	const [search, setSearch] = useState('All');
	const [rubro, setRubro] = useState('All');

	useEffect(() => {
		document.title = 'ssansi | empresas';
		if (hasPrivilege(['crear empresa', 'gestionar empresas'], user.permisos) || isAdmin) {
			setShowButton(true);
		}
		dispatch(getCompaniesAsync(accessToken));
		dispatch(compNotVerifiedAsync(accessToken));
		dispatch(getRubros(accessToken));
	}, []);

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
	 * Muestra la lista de empresa no verificadas y rechazadas
	 * @function handleClick
	 */
	const handleClick = () => setNVCompanies(!showNVCompanies);
	/**
	 * Realiza dispatch a filterCompaniesAsync para filtrar empresas segun su rubro
	 * @function handleRubro
	 * @param {Object} event
	 */
	const handleRubro = event => {
		setRubro(event.target.value);
		dispatch(filterCompaniesAsync(accessToken, search, event.target.value));
	};
	/**
	 * Realiza dispatch hacia filterCompaniesAsync para una busqueda de empresas por caracteres ingresados
	 * @function handleSearch
	 * @param {Object} values
	 *
	 */
	const handleSearch = values => {
		setSearch(values.search);
		dispatch(filterCompaniesAsync(accessToken, values.search, rubro));
	};
	/**
	 * Muestra un mensaje en caso de no existir empresas.
	 * @constant {Component} MsgCompaniesNull
	 */
	const MsgCompaniesNull = props => {
		return (
			<Stack spacing={2} justifyContent="center" sx={{ mt: 2, width: 1 }}>
				<Typography align="center">{props.children}</Typography>
			</Stack>
		);
	};
	/**
	 * Lista de empresas no verificadas.
	 * @constant {Component} listCompaniesNV
	 */
	const listCompaniesNV = () => {
		return (
			<>
				{companiesNV ? (
					companiesNV?.pending.map((companie, index) => (
						<Grid item key={index} xs={6} sm={4} md={3}>
							<CompanieNV companie={companie} handleSnack={handleSnack} />
						</Grid>
					))
				) : isLoading ? (
					[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((sk, index) => (
						<Grid item key={index} xs={6} sm={4} md={3}>
							<SkeletonCompanie />
						</Grid>
					))
				) : (
					<MsgCompaniesNull>
						No han llegado nuevas solicitudes de afiliacion
					</MsgCompaniesNull>
				)}
				{companiesNV?.rejected.map((companie, index) => (
					<Grid item key={index} xs={6} sm={4} md={3}>
						<CompanieNV companie={companie} handleSnack={handleSnack} />
					</Grid>
				))}
			</>
		);
	};
	/**
	 * Lista de empresas aprobadas.
	 * @constant {Component} listCompanies
	 */
	const listCompanies = () => {
		return companies ? (
			companies.map((companie, index) => (
				<Grid item key={index} xs={6} sm={4} md={3} xl={3}>
					<SupplierCompany handleSnack={handleSnack} companie={companie} />
				</Grid>
			))
		) : isLoading ? (
			[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((sk, index) => (
				<Grid item key={index} xs={6} sm={4} md={3}>
					<SkeletonCompanie />
				</Grid>
			))
		) : (
			<MsgCompaniesNull>No se han registrado empresas aun.</MsgCompaniesNull>
		);
	};
	return (
		<Container maxWidth="lg">
			<ShowRoles />
			<SnackCustom data={snack} closeSnack={closeSnack} />

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
						Empresas
					</Typography>
					<Stack
						direction={{ xs: 'column', md: 'row' }}
						alignItems="center"
						sx={{ mb: 3 }}
						spacing={2}>
						<FilterBar handleSearch={handleSearch}>
							<FormControl sx={{ minWidth: { xs: 1, sm: 160 } }} size="small">
								<InputLabel id="rubrof-label">Rubro</InputLabel>
								<Select
									labelId="rubrof-label"
									id="rubro-filter"
									defaultValue={'All'}
									onChange={handleRubro}
									input={<OutlinedInput id="rubro-filter" label="Rubro" />}>
									<MenuItem value="All">Todos</MenuItem>
									{selectRubros?.map(r => (
										<MenuItem key={r.nombre} value={r.nombre}>
											{r.nombre}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<Chip
								label={
									<Typography variant="body2" component="span">
										Pendientes ({companiesNV ? companiesNV.pending?.length : '0'})
									</Typography>
								}
								variant={showNVCompanies ? 'filled' : 'outlined'}
								onClick={handleClick}
								icon={<Pending></Pending>}
							/>
						</FilterBar>

						{showButton && (
							<Button
								sx={{ width: { xs: '100%', md: 'auto' } }}
								component={Link}
								to="/main/registerCompanie"
								startIcon={<Add />}
								variant="contained">
								Empresa
							</Button>
						)}
					</Stack>
				</Box>
				<Grid container spacing={2}>
					{filterLoading && (
						<Box sx={{ display: 'flex', justifyContent: 'center', width: 1, py: 2 }}>
							<CircularProgress size={24} sx={{ color: green[500] }} />
						</Box>
					)}
					{showNVCompanies === true ? listCompaniesNV() : listCompanies()}
				</Grid>
			</Box>
		</Container>
	);
}
