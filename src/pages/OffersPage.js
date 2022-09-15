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
import { filterOffersAsync, getOffersAsync } from '../store/offersSlice';
import { hasPrivilege } from '../Utils/RBAC';

function OffersPage() {
	const { user, isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const { isLoading, filterLoading, offers } = useSelector(state => state.offers);
	const dispatch = useDispatch();

	// const [offers, setOffers] = useState(null);
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
	const closeSnack = () => {
		setSnack({ ...snack, open: false });
	};
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

	const handleCompanie = event => {
		setIDC(event.target.value);
		dispatch(filterOffersAsync(accessToken, search, event.target.value, status));
	};

	const handleStatus = event => {
		setStatus(event.target.value);
		dispatch(filterOffersAsync(accessToken, search, idc, event.target.value));
	};
	const handleSearch = values => {
		setSearch(values.search);
		dispatch(filterOffersAsync(accessToken, values.search, idc, status));
		// const leter = 'HOLALA';
		// console.log(leter.toLocaleLowerCase());
	};

	const listOffers = () => {
		return (
			<Grid container spacing={2}>
				{offers
					? offers.map(offer => (
							<Grid item key={offer.id_offer} xs={6} sm={4} md={3} xl={3}>
								<Offer offer={offer} handleSnack={handleSnack} />
							</Grid>
					  ))
					: isLoading
					? [1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((sk, index) => (
							<Grid item key={index} xs={6} sm={4} md={3} xl={3}>
								<SkeletonOffer />
							</Grid>
					  ))
					: msgOffersNull()}
			</Grid>
		);
	};

	const msgOffersNull = () => {
		return (
			<Stack
				// maxWidth="lg"
				width={1}
				spacing={2}
				alignItems="center"
				sx={{ mt: 2 }}>
				<Typography>No hay ninguna oferta publicada aun</Typography>
				<Typography color="textSecondary">
					Publique sus ofertas ahora pulsando en + Oferta
				</Typography>
			</Stack>
		);
	};

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
						// justifyContent="flex-end"
						sx={{ mb: 3 }}>
						{/* {offers && ( */}
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
									{/* {providers.map(r => (
										<MenuItem key={r.id} value={r.id}>
											{r.nombres} {r.apellidos}
										</MenuItem>
									))} */}
									<MenuItem value="All">Todos</MenuItem>
									<MenuItem value="vigente">Vigente</MenuItem>
									<MenuItem value="expirado">Expirado</MenuItem>
								</Select>
							</FormControl>
						</FilterBar>
						{/* )} */}

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
				{user?.companieVerified === false && (
					<WarningVerified>
						¡Sus productos no son visibles para estudiantes, debido a que su empresa a un
						no fue verificado!
					</WarningVerified>
				)}
				{filterLoading && (
					<Box sx={{ display: 'flex', justifyContent: 'center', width: 1 }}>
						<CircularProgress size={24} sx={{ color: green[500] }} />
					</Box>
				)}
				{showList && listOffers()}

				{user.companie === null && !isAdmin ? msgCompanyNull() : null}
			</Box>
		</Container>
	);
}

export default OffersPage;
