import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import ShowRoles from '../components/ShowRoles';
import SnackCustom from '../components/SnackCustom';
import WarningVerified from '../components/WarningVerified';

export default function OfferPage() {
	const { user, isAdmin } = useSelector(state => state.user);

	const { profile } = useSelector(state => state.companies);
	return (
		<Container maxWidth="lg">
			{/* <SnackCustom data={snack} closeSnack={closeSnack} /> */}

			<ShowRoles />
			<Box>
				<Box>
					<Typography
						variant="h5"
						sx={{
							mb: 3,
							fontWeight: 'bold',
							color: 'text.title',
							fontStyle: 'italic',
						}}>
						Oferta
					</Typography>
				</Box>
				{!isAdmin &&
					(user?.companieVerified === false || profile.companie.verified === false) && (
						<WarningVerified>
							¡Su oferta no es visible para estudiantes, debido a que su empresa a un no
							fue verificado!
						</WarningVerified>
					)}

				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Stack component={Card}></Stack>
					</Grid>
					<Grid item xs={12} md={6}>
						<Stack component={Card}></Stack>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
