import { Add } from '@mui/icons-material';
import { Container, Grid, Typography, Stack, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Offer from '../components/cards/Offer';
import ShowRoles from '../components/ShowRoles';
import SkeletonOffer from '../components/skeletons/SkeletonOffer';
import WarningVerified from '../components/WarningVerified';
import { getOffersAsync } from '../store/offersSlice';
import { hasPrivilege } from '../Utils/RBAC';

function OffersPage() {
	const { user, isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const { isLoading, offers } = useSelector(state => state.offers);
	const dispatch = useDispatch();

	// const [offers, setOffers] = useState(null);
	const [showButton, setShowButton] = useState(false);
	const [disabledBtn, setDisabledBtn] = useState(false);
	const [showList, setShowList] = useState(false);

	useEffect(() => {
		document.title = 'cuniv | ofertas';
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

	const listOffers = () => {
		console.log(isLoading);
		return (
			<Grid container spacing={2}>
				{offers
					? offers.map(offer => (
							<Grid item key={offer.id_offer} xs={6} sm={4} md={3} xl={3}>
								<Offer offer={offer} />
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
						direction="row"
						flexWrap="wrap-reverse"
						alignItems="center"
						justifyContent="flex-end"
						sx={{ mb: 3 }}>
						{showButton && (
							<Button
								disabled={disabledBtn}
								component={Link}
								to={`/main/createOffer`}
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

				{showList && listOffers()}

				{user.companie === null || isAdmin ? msgCompanyNull() : null}
			</Box>
		</Container>
	);
}

export default OffersPage;
