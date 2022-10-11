import { Card, CardActions, CardContent, CardMedia, Skeleton } from '@mui/material';

export default function SkeletonOffer() {
	return (
		<Card>
			<CardMedia>
				<Skeleton animation="wave" variant="rectangular" height={140} />
				<Skeleton
					sx={{
						zIndex: 9,
						width: 40,
						height: 40,
						position: 'absolute',
						left: 20,
						bottom: 100,
					}}
					animation="wave"
					variant="circular"
				/>
			</CardMedia>
			<CardContent sx={{ pt: 2.5 }}>
				<Skeleton animation="wave" variant="text" width={125} />
				<Skeleton animation="wave" variant="text" width={50} />
			</CardContent>
			<CardActions sx={{ justifyContent: 'end' }}>
				<Skeleton animation="wave" variant="circular" width={25} height={25} />
				<Skeleton animation="wave" variant="circular" width={25} height={25} />
			</CardActions>
		</Card>
	);
}
