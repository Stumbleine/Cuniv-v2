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
		width: 32,
		height: 32,
		position: 'absolute',
		left: theme.spacing(3),
		bottom: theme.spacing(8),
		// bottom: theme.spacing(21),
	}));
	return (
		<Card
			sx={{
				/* width: 240, height: 270, */ bgcolor: 'background.paper',
				borderRadius: 2,
			}}>
			<OfferContent offer={offer}>
				<CardMedia
					component="img"
					alt="green iguana"
					height="140"
					image={offer.image}></CardMedia>
				<BgAvatar
					color="paper"
					src="/mock-images/avatars/shape-avatar.svg"
					sx={{
						width: 80,
						height: 36,
						zIndex: 9,
						bottom: 64,
						position: 'absolute',
					}}
				/>
				{/* <AvatarCustom alt="hello" src="/mock-images/avatars/avatar_3.jpg" /> */}
				<AvatarCustom alt={offer.rz_empresa} src={offer.logo_empresa} />
				<CardContent sx={{ p: 1, mt: 1.5 }}>
					<Typography
						gutterBottom
						component="div"
						variant="subtitle2"
						noWrap
						sx={{ fontWeight: 'bold' }}>
						{offer.titulo}
					</Typography>
					<Typography
						gutterBottom
						component="div"
						variant="body2"
						noWrap
						sx={{ overflow: 'hidden' }}>
						{offer.descuento}
						{offer.tipo_descuento === 'Porcentual' ? '%' : 'Bs.'} de descuento
					</Typography>
				</CardContent>{' '}
			</OfferContent>
			<CardActions sx={{ p: 0, pb: 0.5, justifyContent: 'end' }}>
				<IconButton size="small">
					<Edit
						sx={{
							color: 'text.icon',
							'&:hover': {
								color: 'primary.main',
							},
						}}></Edit>
				</IconButton>
				<IconButton size="small">
					<Delete
						sx={{
							color: 'text.icon',
							'&:hover': {
								color: 'primary.main',
							},
						}}
					/>
				</IconButton>
			</CardActions>
		</Card>
	);
}
