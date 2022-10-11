import { Business } from '@mui/icons-material';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import OfferContent from '../dialogs/OfferContent';
import EditOffer from '../dialogs/EditOffer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOfferAsync } from '../../store/offersSlice';
import DeleteItem from '../dialogs/DeleteItem';
import EditOfferPB from '../dialogs/EditOfferPB';
import StatusLabel from '../StatusLabel';

export default function Offer({ offer, handleSnack, companies }) {
	const AvatarCustom = styled(Avatar)(({ theme }) => ({
		width: 37,
		height: 37,
	}));
	const BorderAvatar = styled(Box)(({ theme }) => ({
		width: 45,
		height: 45,
		zIndex: 9,
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		left: theme.spacing(2.8),
		bottom: theme.spacing(7.4),
		borderRadius: '50%',
		background: theme.palette.text.secondary,
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
					sx={{ objectFit: !offer.image && 'fill' }}
					onError={({ target }) => {
						target.onError = null;
						target.src = '/imgs/defaultImg.svg';
					}}
					image={offer?.image || '/imgs/defaultImg.svg'}></CardMedia>
				<StatusLabel elevated={true} status={offer?.status} />
				<BorderAvatar>
					<AvatarCustom src={offer.companie.logo}>
						<Business />
					</AvatarCustom>
				</BorderAvatar>
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
				<EditOfferPB offer={offer} handleSnack={handleSnack} />
				<EditOffer companies={companies} offer={offer} handleSnack={handleSnack} />
				<DeleteItem
					deleteAsync={deleteAsync}
					id={offer.id_offer}
					itemName={offer.title}
				/>
			</CardActions>
		</Card>
	);
}
