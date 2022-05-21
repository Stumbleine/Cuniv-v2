import { Check } from '@mui/icons-material';
import {
	Button,
	CardActionArea,
	Dialog,
	DialogActions,
	DialogContent,
	Slide,
	CardMedia,
	Typography,
	Avatar,
	List,
	ListItem,
	ListItemText,
	Divider,
	ListItemIcon,
	Chip,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOfferDetailAsync } from '../store/offersSlice';
import StatusLabel from './StatusLabel';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function OfferContent(props) {
	const [open, setOpen] = React.useState(false);

	const [offer, setOffer] = useState(null);
	const [company, setCompany] = useState(null);
	const [sucursales, setSucursales] = useState(null);
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchOffer = async () => {
			const data = await dispatch(getOfferDetailAsync(props.offer.id_oferta));
			setOffer(data);
		};
		fetchOffer();
	}, []);
	useEffect(() => {
		setCompany(offer?.empresa);
		setSucursales(offer?.sucursales);
		console.log('offerContetn', offer?.condiciones);
	}, [offer]);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<CardActionArea onClick={handleClickOpen}>
				{props.children}
			</CardActionArea>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				maxWidth="xs"
				aria-describedby="alert-dialog-slide-description">
				<Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
					<Avatar
						alt="logo"
						// src="/mock-images/avatars/avatar_3.jpg"
						src={company?.logo}
						sx={{ width: 32, height: 32 }}
					/>
					<Typography
						component="div"
						variant="subtitle1"
						sx={{ fontWeight: 'bold', ml: 1, flexGrow: 1 }}>
						{offer?.empresa?.razon_social}
					</Typography>
					<StatusLabel status={offer?.status} />
				</Box>

				<Box sx={{ width: 420 }}>
					{' '}
					<CardMedia
						height="200"
						component="img"
						alt="green iguana"
						image={offer?.image}
					/>
					<DialogContent sx={{ p: 2 }}>
						<Box>
							<Typography
								component="div"
								variant="subtitle1"
								noWrap
								sx={{ fontWeight: 'bold', flexGrow: 1 }}>
								{offer?.titulo}
							</Typography>

							<Typography gutterBottom sx={{ ml: 1 }} variant="body2">
								{offer?.descuento}{' '}
								{offer?.tipo_descuento === 'Porcentual' ? '%' : 'Bs.'} de
								descuento
							</Typography>
						</Box>
						<Box>
							<Typography
								gutterBottom
								component="div"
								variant="subtitle2"
								sx={{ fontWeight: 'bold' }}>
								Duracion
							</Typography>
							<Typography
								sx={{ ml: 1 }}
								gutterBottom
								component="div"
								variant="body2">
								{offer?.fecha_inicio + ' / ' + offer?.fecha_fin}
							</Typography>
						</Box>
						{offer?.condiciones ? (
							<Box>
								<Typography
									gutterBottom
									variant="subtitle2"
									sx={{ fontWeight: 'bold' }}>
									Condiciones de reclamo
								</Typography>

								<Typography
									sx={{ ml: 1 }}
									gutterBottom
									component="div"
									variant="body2">
									{offer?.condiciones}
								</Typography>
							</Box>
						) : null}
						<Box>
							<Typography
								gutterBottom
								component="div"
								variant="subtitle2"
								noWrap
								sx={{ fontWeight: 'bold' }}>
								Productos incluidos
							</Typography>
							{offer?.productos.map((p) => (
								<Chip key={p.id_producto} label={p.nombre} sx={{ ml: 1 }} />
							))}
						</Box>
						<Box>
							<Typography
								gutterBottom
								component="div"
								variant="subtitle2"
								noWrap
								sx={{ fontWeight: 'bold' }}>
								Disponible en:
							</Typography>
							<List sx={{ width: '100%', borderRadius: 2 }} disablePadding>
								{sucursales?.map((sucursal, index) => (
									<Box key={index}>
										<ListItem alignItems="flex-start" sx={{ py: 0, px: 2 }}>
											<ListItemIcon
												sx={{
													mt: 2,
												}}>
												<Check />
											</ListItemIcon>
											<ListItemText
												primary={
													<Typography variant="body1">
														{sucursal?.nombre}
													</Typography>
												}
												secondary={
													<Typography
														variant="body2"
														sx={{ fontStyle: 'italic' }}>
														{sucursal?.direccion}
													</Typography>
												}
											/>
										</ListItem>
										<Divider sx={{ ml: 2, mr: 2 }} component="li" />
									</Box>
								))}
							</List>
						</Box>
					</DialogContent>
				</Box>
				<DialogActions>
					<Button onClick={handleClose}>Cerrar</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default OfferContent;
