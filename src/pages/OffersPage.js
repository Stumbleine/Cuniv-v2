import { Add } from '@mui/icons-material';
import {
	Container,
	Grid,
	Typography,
	Stack,
	Button,
	FormControl,
	InputLabel,
	Select,
	OutlinedInput,
	MenuItem,
	CircularProgress,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Offer from '../components/cards/Offer';
import FilterBar from '../components/FilterBar';
import ShowRoles from '../components/ShowRoles';
import SkeletonOffer from '../components/skeletons/SkeletonOffer';
import SnackCustom from '../components/SnackCustom';
import WarningVerified from '../components/WarningVerified';
import API from '../conection';
import { filterOffersAsync, getOffersAsync } from '../store/offersSlice';
import { hasPrivilege } from '../Utils/RBAC';
/**
 * Pagina que muestra la lista de ofertas registradas
 * @component OffersPage
 * @exports OffersPage
 */
export default function OffersPage() {
	const { user, isAdmin } = useSelector(state => state.user);
	const { profile } = useSelector(state => state.companies);
	const { accessToken } = useSelector(state => state.login);
	const { isLoading, filterLoading, offers, fetchFailed } = useSelector(
		state => state.offers
	);
	const dispatch = useDispatch();

	const [showButton, setShowButton] = useState(false);
	const [disabledBtn, setDisabledBtn] = useState(false);
	const [showList, setShowList] = useState(false);
	const [search, setSearch] = useState('All');
	const [idc, setIDC] = useState('All');
	const [status, setStatus] = useState('All');
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

	useEffect(() => {
		document.title = 'ssansi | ofertas';
		dispatch(getOffersAsync(accessToken));
	}, []);

	useEffect(() => {
		if (hasPrivilege(['crear oferta', 'gestionar ofertas'], user.permisos) || isAdmin) {
			setShowButton(true);
		}
		if (user.companie !== null || isAdmin) {
			setDisabledBtn(false);
			setShowButton(true);
		} else {
			setDisabledBtn(true);
		}
		if (hasPrivilege(['gestionar ofertas', 'listar ofertas'], user.permisos) || isAdmin) {
			setShowList(true);
			user.companie && setDisabledBtn(false);
		}
		if (user.companie !== null || isAdmin) {
			setShowList(true);
		} else {
			setShowList(false);
		}
	}, [offers, user]);
	/**
	 * Realiza dispatch hacia filterOffersAsync para filtrar ofertas por empresa
	 * @function handleCompanie
	 * @param {Object} event
	 */
	const handleCompanie = event => {
		setIDC(event.target.value);
		dispatch(filterOffersAsync(accessToken, search, event.target.value, status));
	};
	/**
	 * Realiza dispatch hacia filterOffersAsync para filtrar ofertas por su estado "VIGENTE" o "EXPIRADO"
	 * @function handleStatus
	 * @param {Object} event
	 */
	const handleStatus = event => {
		setStatus(event.target.value);
		dispatch(filterOffersAsync(accessToken, search, idc, event.target.value));
	};
	/**
	 * Realiza dispatch hacia filterOffersAsync para buscar ofertas por caracteres ingresados
	 * @function handleSearch
	 * @param {Object} values
	 */
	const handleSearch = values => {
		setSearch(values.search);
		dispatch(filterOffersAsync(accessToken, values.search, idc, status));
	};

	const [companies, setCompanies] = useState(null);
	useEffect(() => {
		/**
		 * Hace una peticion al servidor para traer empresas, que es usado en el filtrador por empresa
		 * @function getCompanies
		 */
		const getCompanies = async () => {
			const r = await API.get('select/companies', {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setCompanies(r.data);
		};
		isAdmin && getCompanies();
	}, []);
	/**
	 * Enlista las ofertas existentes
	 * @constant {Component} listOffers
	 */
	const listOffers = () => {
		return (
			<Grid container spacing={2}>
				{offers && !filterLoading && !fetchFailed
					? offers.map(offer => (
							<Grid item key={offer.id_offer} xs={6} sm={4} md={3} xl={3}>
								<Offer offer={offer} handleSnack={handleSnack} companies={companies} />
							</Grid>
					  ))
					: (isLoading || filterLoading) &&
					  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((sk, index) => (
							<Grid item key={index} xs={6} sm={4} md={3} xl={3}>
								<SkeletonOffer />
							</Grid>
					  ))}
				{(fetchFailed || (!offers && !isLoading && !filterLoading)) && msgOffersNull()}
			</Grid>
		);
	};
	/**
	 * Mensaje que se muestra en caso no se encontraron ofertas
	 * @constant {Component} msgOffersNull
	 */
	const msgOffersNull = () => {
		return (
			<Stack width={1} spacing={2} alignItems="center" sx={{ mt: 2 }}>
				<Typography>No se encontraron ofertas</Typography>
				<Typography color="textSecondary">
					Publique ofertas ahora pulsando en + Oferta
				</Typography>
			</Stack>
		);
	};
	/**
	 * Mensaje que indica que no se ha registrado aun su empresa (siendo proveedor)
	 * @constant {Component} listOffers
	 */

	const msgCompanyNull = () => {
		return (
			<Stack maxWidth="lg" spacing={2} width={1} alignItems="center" sx={{ mt: 2 }}>
				<Typography>No ha registrado su empresa aun</Typography>
				<Typography color="textSecondary">
					registrar su empresa ayudara a que sus ofertas sean facilmente relacionadas con
					su empresa
				</Typography>
				<Button component={Link} to={`/main/registerCompanie`} variant="contained">
					Registrar Empresa
				</Button>
			</Stack>
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
						Ofertas
					</Typography>
					<Stack
						direction={{ xs: 'column', md: 'row' }}
						alignItems="center"
						spacing={2}
						sx={{ mb: 3 }}>
						<FilterBar handleSearch={handleSearch}>
							{isAdmin && (
								<FormControl sx={{ minWidth: { xs: 1, sm: 160 } }} size="small">
									<InputLabel id="companie-label">Empresa</InputLabel>
									<Select
										labelId="companie-label"
										id="companie-filter"
										defaultValue={'All'}
										onChange={handleCompanie}
										input={<OutlinedInput id="companie-filter" label="Empresa" />}>
										<MenuItem value="All">Todos</MenuItem>
										<MenuItem value={5}>Panchita</MenuItem>
										<MenuItem value={14}>Jugos tropicales</MenuItem>
										<MenuItem value={6}>Cine Center</MenuItem>
										<MenuItem value={12}>Sky Box</MenuItem>
										<MenuItem value={8}>Optica America</MenuItem>
									</Select>
								</FormControl>
							)}

							<FormControl sx={{ minWidth: { xs: 1, sm: 160 } }} size="small">
								<InputLabel id="offerStatus-label">Estado</InputLabel>
								<Select
									labelId="offerStatus-label"
									id="offerStatus-filter"
									defaultValue={'All'}
									onChange={handleStatus}
									input={<OutlinedInput id="offerStatus-filter" label="Estado" />}>
									<MenuItem value="All">Todos</MenuItem>
									<MenuItem value="VIGENTE">Vigente</MenuItem>
									<MenuItem value="EXPIRADO">Expirado</MenuItem>
								</Select>
							</FormControl>
						</FilterBar>

						{showButton && (
							<Button
								sx={{ width: { xs: '100%', md: 'auto' } }}
								disabled={disabledBtn}
								component={Link}
								to="/main/createOffer"
								startIcon={<Add />}
								variant="contained">
								Oferta
							</Button>
						)}
					</Stack>
				</Box>
				{!isAdmin &&
					(user?.companieVerified === false || profile?.companie?.verified === false) && (
						<WarningVerified>
							¡Sus ofertas no son visibles para estudiantes, debido a que su empresa a un
							no fue verificado!
						</WarningVerified>
					)}

				{showList && listOffers()}

				{user.companie === null && !isAdmin ? msgCompanyNull() : null}
			</Box>
		</Container>
	);
}
