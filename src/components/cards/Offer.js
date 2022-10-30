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

/**
 * Tarjeta de oferta que muestra informacion de una oferta, con la imagen, titulo, descuento y estado.
 * Ademas de incluir las acciones de editar y eliminar.
 * @component Offer
 * @property {Object} offer datos de la oferta, que incluye datos de la empresa a la que pertenece.
 * @property {Object} companies conjunto de empresas con id y razon social, es necesario para ustilizarlo en los componentes de edicion.
 * @property {Function} handleSnack funcion que llamar a un SnackBar Alert, para mostrar el resultado de una accion
 * @exports Offer
 */
export default function Offer({ offer, handleSnack, companies }) {
	/**
	 * Componente Box estilizado con el theme de MUI que es un contenedor del logo de empresa de una oferta,
	 * ubicada sobre el componente Image, con posicion absolute.
	 * @component BorderAvatar
	 * @property {Object} theme objeto de funciones que devuelven valores predeterminados del tema de MUI
	 * @exports BorderAvatar
	 */
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
	/**
	 * Ejecuta el dispatch hacia la funcion deleteOfferAsync que hace la peticion DELETE para una oferta.
	 * @funcion deleteAsync
	 */
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
					image={offer?.image || '/imgs/defaultImg.svg'}
				/>
				<StatusLabel elevated={true} status={offer?.status} />
				<BorderAvatar>
					<Avatar sx={{ width: 37, height: 37 }} src={offer.companie.logo}>
						<Business />
					</Avatar>
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
