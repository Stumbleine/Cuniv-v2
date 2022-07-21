import { Grid, Paper, Skeleton, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function SkeletonProfile() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={12} md={5} lg={5}>
				<Paper sx={{ p: 2 }}>
					<Stack spacing={1}>
						<Stack alignItems="center" spacing={1}>
							<Skeleton animation="wave" variant="circular" width={150} height={150} />
							<Skeleton animation="wave" variant="text" width={150} />
							<Skeleton animation="wave" variant="text" width={120} />
							<Skeleton animation="wave" variant="rectangular" height={30} width={150} />
						</Stack>
						<Skeleton animation="wave" variant="text" width={150} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
						<Skeleton animation="wave" variant="text" width={150} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
					</Stack>
				</Paper>
			</Grid>

			<Grid item xs={12} sm={12} md={7} lg={7}>
				<Paper sx={{ p: 2 }}>
					{/* lista de sucursales */}
					<Stack spacing={2}>
						{/* lista de productos */}
						<Skeleton animation="wave" variant="text" width={150} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
						{/* lista de ofertas */}
						<Skeleton animation="wave" variant="text" width={150} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
						<Skeleton animation="wave" variant="rectangular" height={65} />
					</Stack>
				</Paper>
			</Grid>
		</Grid>
		// <Stack spacing={1}>
		// 	<Skeleton animation="wave"  variant="text" />
		// 	<Skeleton animation="wave"  variant="circular" width={40} height={40} />
		// 	<Skeleton animation="wave"  variant="rectangular" width={210} height={118} />
		// </Stack>
	);
}
