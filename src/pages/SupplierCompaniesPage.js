import { Add } from '@mui/icons-material';
import { Container, Grid, Typography, Stack, Button } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Offer from '../components/Offer';
import SupplierCompany from '../components/SupplierCompany';

function SupplierCompaniesPage() {
	const companies = useSelector((state) => state.companies.companies);

	return (
		<Container maxWidth="lg">
			<Box>
				<Box>
					<Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
						Empresas
					</Typography>
					<Stack
						direction="row"
						flexWrap="wrap-reverse"
						alignItems="center"
						justifyContent="flex-end"
						sx={{ mb: 3 }}>
						<Link
							to="/admin/createSupplierCompanie"
							style={{ textDecoration: 'none' }}>
							<Button startIcon={<Add />} variant="contained">
								Empresa
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
					{companies.map((companie, index) => (
						<Grid item key={index} xs={6} sm={4} md={3} xl={3}>
							<SupplierCompany companie={companie} />
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
}

export default SupplierCompaniesPage;
