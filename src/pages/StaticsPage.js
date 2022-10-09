import {
	Card,
	CardHeader,
	CircularProgress,
	Container,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import CodeGenerated from '../components/charts/CodeGenerated';
import CodeRedeemed from '../components/charts/CodeRedeemed';
import OffersViewTable from '../components/charts/OffersViewTable';
import OfferVisits from '../components/charts/OfferVisits';
import ResumePie from '../components/charts/ResumePie';
import ShowRoles from '../components/ShowRoles';
import { summaryAsync } from '../store/statisticsSlice';

function StaticsPage() {
	const dispatch = useDispatch();

	const { accessToken } = useSelector(state => state.login);
	const { summary } = useSelector(state => state.statics);

	const [status, setStatus] = useState({
		error: false,
		success: false,
		isLoading: false,
	});

	useEffect(() => {
		document.title = 'ssansi | estadisticas';
		const fetch = async () => {
			setStatus({ ...status, isLoading: true });
			return await dispatch(summaryAsync(accessToken));
		};
		fetch()
			.then(r => {
				setStatus({ isLoading: false, error: false, success: true });
			})
			.catch(e => {
				setStatus({ isLoading: false, error: true, success: false });
			});
	}, []);

	return (
		<Container maxWidth="xl">
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
						{status.isLoading ? (
							<CircularProgress
								size={24}
								sx={{
									color: green[500],
								}}
							/>
						) : (
							<Typography sx={{ fontSize: 30, lineHeight: 1, fontWeight: 'bold' }}>
								{summary?.total_views ? summary.total_views : status.error && '?'}
							</Typography>
						)}
						<Typography variant="body2" color="textSecondary">
							visualizaciones totales
						</Typography>
					</Box>
					<Box sx={{ textAlign: 'center', alingItems: 'center', p: 2 }} component={Card}>
						{status.isLoading ? (
							<CircularProgress
								size={24}
								sx={{
									color: green[500],
								}}
							/>
						) : (
							<Typography sx={{ fontSize: 30, lineHeight: 1, fontWeight: 'bold' }}>
								{summary?.total_codes ? summary.total_codes : status.error && '?'}
							</Typography>
						)}
						<Typography variant="body2" color="textSecondary">
							codigos generados totales
						</Typography>
					</Box>
					<Box sx={{ textAlign: 'center', p: 2 }} component={Card}>
						{status.isLoading ? (
							<CircularProgress
								size={24}
								sx={{
									color: green[500],
								}}
							/>
						) : (
							<Typography sx={{ fontSize: 30, lineHeight: 1, fontWeight: 'bold' }}>
								{summary?.total_redeemed ? summary.total_redeemed : status.error && '?'}
							</Typography>
						)}
						<Typography color="textSecondary" variant="body2">
							codigo cajeados totales
						</Typography>
					</Box>
				</Stack>
				<Grid container spacing={2}>
					<Grid item xs={12} md={8}>
						<OfferVisits />
					</Grid>
					<Grid item xs={12} md={4}>
						<OffersViewTable />
					</Grid>
					<Grid item xs={12} md={6}>
						<CodeGenerated />
					</Grid>
					<Grid item xs={12} md={6}>
						<CodeRedeemed />
					</Grid>
					{/* <Grid item xs={12} md={6}>
						<ResumePie />
					</Grid> */}
				</Grid>
			</Box>
		</Container>
	);
}

export default StaticsPage;
