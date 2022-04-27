import { Add } from '@mui/icons-material';
import { Container, Grid, Typography, Stack, Button } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Offer from '../components/Offer';

function OffersPage() {
	const offers = useSelector((state) => state.offers.offers);
	return (
		<Container maxWidth="lg">
			<Box>
				<Box>
					<Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
						Ofertas
					</Typography>
					<Stack
						direction="row"
						flexWrap="wrap-reverse"
						alignItems="center"
						justifyContent="flex-end"
						sx={{ mb: 2 }}>
						<Link to="/provider/createOffer" style={{ textDecoration: 'none' }}>
							<Button startIcon={<Add />} variant="contained">
								Oferta
							</Button>
						</Link>
					</Stack>
				</Box>
				<Grid
					container
					spacing={2}
					sx={{
						display: 'flex',
						justifyContent: 'center',
					}}>
					{offers.map((offer, id = offer.id) => (
						<Grid item key={id} xs={6} sm={4} md={3} xl={3}>
							<Offer offer={offer}></Offer>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
}

export default OffersPage;
