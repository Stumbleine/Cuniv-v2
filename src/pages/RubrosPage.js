import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import RubroAddForm from '../components/forms/RubroAddForm';
import RubrosTable from '../components/tables/RubrosTable';
import ShowRoles from '../components/ShowRoles';

function RubrosPage() {
	return (
		<Container maxWidth="lg">
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
						Rubros
					</Typography>
				</Box>
				<Grid container spacing={2}>
					<Grid item xs={12} md={7}>
						<RubrosTable />
					</Grid>
					<Grid item xs={12} md={5}>
						<RubroAddForm />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default RubrosPage;
