import { Card, CardHeader, Container, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import OfferRedeem from '../components/charts/OfferRedeem';
import OfferVisits from '../components/charts/OfferVisits';
import ResumePie from '../components/charts/ResumePie';
import ShowRoles from '../components/ShowRoles';

function StaticsPage() {
	useEffect(() => {
		document.title = 'ssansi | estadisticas';
	}, []);


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
						Analitica
					</Typography>
				</Box>
				<Stack
					sx={{ mb: 2, justifyContent: 'center' }}
					spacing={2}
					direction={{ xs: 'column', sm: 'row' }}>
					<Box sx={{ textAlign: 'center', p: 2 }} component={Card}>
						<Typography sx={{ fontSize: 30, lineHeight: 1, fontWeight: 'bold' }}>
							123
						</Typography>
						<Typography variant="body2" color="textSecondary">
							visualizaciones totales
						</Typography>
					</Box>
					<Box sx={{ textAlign: 'center', p: 2 }} component={Card}>
						<Typography sx={{ fontSize: 30, lineHeight: 1, fontWeight: 'bold' }}>
							523
						</Typography>
						<Typography variant="body2" color="textSecondary">
							codigos generados totales
						</Typography>
					</Box>
					<Box sx={{ textAlign: 'center', p: 2 }} component={Card}>
						<Typography sx={{ fontSize: 30, lineHeight: 1, fontWeight: 'bold' }}>
							45
						</Typography>
						<Typography color="textSecondary" variant="body2">
							codigo cajeados totales
						</Typography>
					</Box>
				</Stack>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<OfferVisits />
					</Grid>

					<Grid item xs={12} md={6}>
						<OfferRedeem />
					</Grid>
					<Grid item xs={12} md={6}>
						<ResumePie />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default StaticsPage;
