import { Box, Card, CardHeader, Stack } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

function OfferRedeem() {
	const data = [
		{
			name: 'Codigos generados',
			type: 'area',
			data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
		},
		{
			name: 'Canjeados',
			type: 'line',
			data: [50, 10, 35, 51, 70, 30, 69, 91, 50],
		},
	];
	const chartVisOptions = {
		chart: {
			type: 'line',
			zoom: {
				enabled: false,
			},
		},
		// dataLabels: {
		// 	enabled: false,
		// },
		stroke: {
			curve: 'straight',
		},
		fill: {
			type: 'solid',
			opacity: [0.35, 1],
		},
		grid: {
			row: {
				colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
				opacity: 0.5,
			},
		},
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
		// xaxis: {
		// 	categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
		// },
	};
	return (
		<Stack component={Card}>
			<CardHeader
				title="Canjeo de ofertas"
				titleTypographyProps={{ fontSize: 18 }}

				// subheader="(+43%) than last year"
			/>
			<Box sx={{ p: 1 }} dir="ltr">
				<ReactApexChart
					// type="line"
					series={data}
					options={chartVisOptions}
					height={390}
				/>
			</Box>
		</Stack>
	);
}

export default OfferRedeem;
