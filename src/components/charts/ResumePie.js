import { Card, CardHeader, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ResumePie() {
	const data = [44, 55, 13, 43, 22];
	const options = {
		chart: {
			width: 380,
			type: 'pie',
		},
		labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200,
					},
					legend: {
						position: 'bottom',
					},
				},
			},
		],
	};

	return (
		<Stack component={Card}>
			<CardHeader
				title="Visualizacion de ofertas por estudiantes"
				titleTypographyProps={{ fontSize: 18 }}

				// subheader="(+43%) than last year"
			/>
			<Box sx={{ p: 1 }} dir="ltr">
				<ReactApexChart type="pie" series={data} options={options} />
			</Box>
		</Stack>
	);
}
