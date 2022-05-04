import { Delete, Edit, OpenInFull } from '@mui/icons-material';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
	Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

import React from 'react';
import BgAvatar from './BgAvatar';
import OfferContent from './OfferContent';

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
				/* width: 240, height: 270, */ bgcolor: 'background.paper',
			}}>
			<OfferContent offer={offer}>
				<CardMedia
					component="img"
					alt={offer.titulo}
					height="140"
					image={offer.image}></CardMedia>
				{/* <BgAvatar
					color="paper"
					src="/mock-images/avatars/shape-avatar.svg"
					sx={{
						width: 80,
						height: 35,
						zIndex: 9,
						bottom: 64,
						position: 'absolute',
					}}
				/> */}
				{/* <AvatarCustom alt="hello" src="/mock-images/avatars/avatar_3.jpg" /> */}
				<BorderAvatar />
				<AvatarCustom alt={offer.rz_empresa} src={offer.logo_empresa} />
				<CardContent sx={{ mt: 2 }}>
					<Typography
						gutterBottom
						component="div"
						variant="subtitle2"
						noWrap
						sx={{ fontWeight: 'bold' }}>
						{offer.titulo}
					</Typography>
					<Typography
						variant="body2"
						noWrap
						sx={{ overflow: 'hidden', color: 'text.secondary' }}>
						{offer.descuento}
						{offer.tipo_descuento === 'Porcentual' ? '%' : 'Bs.'} de descuento
					</Typography>
				</CardContent>{' '}
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
