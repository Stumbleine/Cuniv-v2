import { Grid, Paper, Skeleton, Stack } from '@mui/material';

export default function SkeletonProfile() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={12} md={6} lg={6}>
				<Paper sx={{ p: 2, borderRadius: 2 }}>
					<Stack spacing={1}>
						<Stack alignItems="center" spacing={1}>
							<Skeleton animation="wave" variant="circular" width={150} height={150} />
							<Skeleton animation="wave" variant="text" width={150} />
							<Skeleton animation="wave" variant="text" width={120} />
							<Skeleton animation="wave" variant="rectangular" height={30} width={150} />
						</Stack>
						<Skeleton animation="wave" variant="text" width={150} />
						<Skeleton animation="wave" variant="rectangular" height={55} />
						<Skeleton animation="wave" variant="rectangular" height={55} />
						<Skeleton animation="wave" variant="rectangular" height={55} />
						<Skeleton animation="wave" variant="text" width={150} />
						<Skeleton animation="wave" variant="rectangular" height={55} />
						<Skeleton animation="wave" variant="rectangular" height={55} />
					</Stack>
				</Paper>
			</Grid>

			<Grid item xs={12} sm={12} md={6} lg={6}>
				<Paper sx={{ p: 2, borderRadius: 2 }}>
					{/* lista de sucursales */}
					<Stack spacing={2}>
						{/* lista de productos */}
						<Skeleton animation="wave" variant="text" width={150} />
						<Skeleton animation="wave" variant="rectangular" height={55} />
						<Skeleton animation="wave" variant="rectangular" height={55} />
						<Skeleton animation="wave" variant="rectangular" height={55} />
						{/* lista de ofertas */}
						<Skeleton animation="wave" variant="text" width={150} />
						<Skeleton animation="wave" variant="rectangular" height={55} />
						<Skeleton animation="wave" variant="rectangular" height={55} />
						<Skeleton animation="wave" variant="rectangular" height={55} />
					</Stack>
				</Paper>
			</Grid>
		</Grid>
	);
}
