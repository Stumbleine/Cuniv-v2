import { Add } from '@mui/icons-material';
import { Container, Grid, Typography, Stack, Button } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Offer from '../components/Offer';
import ShowRule from '../components/ShowRule';
import { getCompaniesAsync } from '../store/companiesSlice';
import { getOffersAsync } from '../store/offersSlice';

function OffersPage() {
	const { rulepath, user, rule } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOffersAsync(user.id_empresa, rule));
		document.title = 'cuniv | ofertas';
		console.log(rulepath);
	}, []);

	const offers = useSelector((state) => state.offers.offers);
	const show = () => {
		let s = false;
		if (rule === 'ADM') {
			s = true;
		} else if (rule === 'PRV') {
			if (user.id_empresa) {
				s = true;
			}
		}
		return s;
	};
	return (
		<Container maxWidth="lg">
			{/* <Helmet>
				<title>{title}</title>
			</Helmet> */}
			<ShowRule />

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
					{show() && (
						<Stack
							direction="row"
							flexWrap="wrap-reverse"
							alignItems="center"
							justifyContent="flex-end"
							sx={{ mb: 3 }}>
							<Link
								to={`/${rulepath}/createOffer`}
								style={{ textDecoration: 'none' }}>
								<Button startIcon={<Add />} variant="contained">
									Oferta
								</Button>
							</Link>
						</Stack>
					)}
				</Box>
				{show() ? (
					<Grid
						container
						spacing={2}
						sx={{
							display: 'flex',
							justifyContent: 'center',
						}}>
						{offers ? (
							offers.map((offer, id = offer.id) => (
								<Grid item key={id} xs={6} sm={4} md={3} xl={3}>
									<Offer offer={offer}></Offer>
								</Grid>
							))
						) : (
							<Box>
								<Stack
									maxWidth="lg"
									spacing={2}
									alignItems="center"
									sx={{ mt: 2 }}>
									<Typography>No hay ninguna oferta publicada aun</Typography>
									<Typography color="textSecondary">
										Publique sus ofertas ahora pulsando en + Oferta
									</Typography>
								</Stack>
							</Box>
						)}
					</Grid>
				) : (
					<Box>
						<Stack maxWidth="lg" spacing={2} alignItems="center" sx={{ mt: 2 }}>
							<Typography>No ha registrado su empresa aun</Typography>
							<Typography color="textSecondary">
								registrar su empresa ayudara a que sus ofertas sean facilmente
								relacionadas con su empresa
							</Typography>

							<Button
								component={Link}
								to={`/${rulepath}/registerCompanie`}
								variant="contained">
								Registrar Empresa
							</Button>
						</Stack>
					</Box>
				)}
			</Box>
		</Container>
	);
}

export default OffersPage;
