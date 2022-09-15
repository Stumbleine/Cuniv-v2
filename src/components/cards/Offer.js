import React, { useState } from 'react';
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
import EditOffer from '../dialogs/EditOffer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOfferAsync, updateOfferAsync } from '../../store/offersSlice';
import DeleteItem from '../dialogs/DeleteItem';

export default function Offer({ offer, handleSnack }) {
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
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);

	const deleteAsync = id => {
		const delet = async () => {
			await dispatch(deleteOfferAsync(accessToken, id));
		};
		delet()
			.then(r => {
				handleSnack('Oferta eliminada exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};
	const updateAsync = (values, file) => {
		const update = async () => {
			return await dispatch(updateOfferAsync(accessToken, values, file));
		};
		update()
			.then(r => {
				handleSnack('Oferta actualizada exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};

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
				<EditOffer offer={offer} updateAsync={updateAsync} />
				<DeleteItem
					deleteAsync={deleteAsync}
					id={offer.id_offer}
					itemName={offer.title}
				/>
			</CardActions>
		</Card>
	);
}
