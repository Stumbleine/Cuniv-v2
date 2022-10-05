import { Box, Card, CardHeader, Stack } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function OfferVisits() {
	const data = [
		{
			name: 'Desktops',
			data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
		},
	];
	const chartVisOptions = {
		chart: {
			type: 'line',
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'straight',
		},
		// title: {
		// 	text: 'Visualizaciones por mes',
		// 	align: 'left',
		// },
		grid: {
			row: {
				colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
				opacity: 0.5,
			},
		},
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
		},
	};
	return (
		<Stack component={Card}>
			<CardHeader
				title="Visualizacion de ofertas por estudiantes"
				titleTypographyProps={{ fontSize: 18 }}
				// subheader="(+43%) than last year"
			/>
			<Box sx={{ p: 1 }}>
				<ReactApexChart
					type="line"
					series={data}
					options={chartVisOptions}
					height={450}
				/>
			</Box>
		</Stack>
	);
}
