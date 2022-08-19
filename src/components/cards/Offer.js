import React from 'react';
import { Delete, Edit } from '@mui/icons-material';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
	Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import OfferContent from '../dialogs/OfferContent';

export default function Offer(props) {
	const offer = props.offer;
	const AvatarCustom = styled(Avatar)(({ theme }) => ({
		zIndex: 9,
		width: 37,
		height: 37,
		position: 'absolute',
		left: theme.spacing(3),
		bottom: theme.spacing(7.7),
		// bottom: theme.spacing(21),
	}));
	const BorderAvatar = styled(Box)(({ theme }) => ({
		width: 41,
		height: 41,
		zIndex: 9,
		position: 'absolute',
		left: theme.spacing(2.8),
		bottom: theme.spacing(7.4),
		borderRadius: '50%',
		background: theme.palette.primary.main,
	}));
	return (
		<Card
			sx={{
				bgcolor: 'background.paper',
			}}>
			<OfferContent offer={offer}>
				<CardMedia
					component="img"
					alt={offer.title}
					height="140"
					image={offer.image}></CardMedia>
				<BorderAvatar />
				<AvatarCustom alt={offer.companie.name} src={offer.companie.logo} />
				<CardContent sx={{ mt: 2 }}>
					<Typography
						gutterBottom
						component="div"
						variant="subtitle2"
						noWrap
						sx={{ fontWeight: 'bold' }}>
						{offer.title}
					</Typography>
					<Typography
						variant="body2"
						noWrap
						sx={{ overflow: 'hidden', color: 'text.secondary' }}>
						{offer.discount}
						{offer.discount_type === 'Porcentual' ? '%' : 'Bs.'} de descuento
					</Typography>
				</CardContent>
			</OfferContent>
			<CardActions sx={{ justifyContent: 'end' }}>
				<IconButton size="small">
					<Edit
						sx={{
							color: 'text.icon',
							'&:hover': {
								color: 'warning.light',
							},
						}}></Edit>
				</IconButton>
				<IconButton size="small">
					<Delete
						sx={{
							color: 'text.icon',
							'&:hover': {
								color: 'error.light',
							},
						}}
					/>
				</IconButton>
			</CardActions>
		</Card>
	);
}
