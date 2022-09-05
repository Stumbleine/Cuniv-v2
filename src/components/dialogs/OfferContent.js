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
	Stack,
} from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StatusLabel from '../StatusLabel';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function OfferContent(props) {
	moment.locale('es');
	const [open, setOpen] = React.useState(false);

	const [offer, setOffer] = useState(props.offer);
	const dispatch = useDispatch();
	// useEffect(() => {
	// }, []);
	// useEffect(() => {
	// 	console.log('offerContetn', offer);
	// }, [offer]);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<CardActionArea onClick={handleClickOpen}>{props.children}</CardActionArea>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description">
				<Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
					<Avatar
						alt="logo"
						// src="/mock-images/avatars/avatar_3.jpg"
						src={offer.companie?.logo}
						sx={{ width: 32, height: 32 }}
					/>
					<Typography
						component="div"
						variant="subtitle1"
						sx={{ fontWeight: 'bold', ml: 1, flexGrow: 1 }}>
						{offer.companie?.razon_social}
					</Typography>
					<StatusLabel status={offer?.status} />
				</Box>

				<CardMedia
					height="200"
					component="img"
					alt={offer.companie}
					image={offer?.image}
				/>
				<DialogContent sx={{ px: 2, py: 1, minWidth: 420, maxWidth: 450 }}>
					<Stack spacing={1}>
						<Box sx={{}}>
							<Typography
								component="div"
								variant="subtitle1"
								noWrap
								sx={{ fontWeight: 'bold', flexGrow: 1 }}>
								{offer?.title}
							</Typography>
							<Typography color="textSecondary" variant="body2">
								{offer?.discount} {offer?.discount_type === 'Porcentual' ? '%' : 'Bs.'} de
							</Typography>
						</Box>
						<Typography
							gutterBottom
							component="div"
							variant="subtitle2"
							sx={{ fontWeight: 'bold' }}>
							Duracion
						</Typography>
						<Typography sx={{ ml: 1 }} gutterBottom component="div" variant="body2">
							{moment(offer?.start_date).format('LL') +
								' hasta ' +
								moment(offer?.end_date).format('LL')}
						</Typography>
						{offer?.conditions ? (
							<Box>
								<Typography gutterBottom variant="subtitle2" sx={{ fontWeight: 'bold' }}>
									Condiciones de reclamo
								</Typography>

								<Typography sx={{ ml: 1 }} gutterBottom component="div" variant="body2">
									{offer?.conditions}
								</Typography>
							</Box>
						) : null}
						<Typography
							gutterBottom
							component="div"
							variant="subtitle2"
							noWrap
							sx={{ fontWeight: 'bold' }}>
							Productos incluidos
						</Typography>
						<Box>
							{offer.products?.map((p, index) => (
								<Chip key={index} label={p.name} sx={{ ml: 1 }} />
							))}
						</Box>
						<Typography
							gutterBottom
							component="div"
							variant="subtitle2"
							noWrap
							sx={{ fontWeight: 'bold' }}>
							Disponible en:{' '}
							{!offer?.branch_offices && (
								<Typography color="textSecondary">Todos</Typography>
							)}
						</Typography>
						<List sx={{ width: '100%', borderRadius: 2 }} disablePadding>
							{offer.branch_offices?.map((branch, index) => (
								<Box key={index}>
									<ListItem alignItems="flex-start" sx={{ py: 0, px: 2 }}>
										<ListItemIcon
											sx={{
												mt: 2,
											}}>
											<Check />
										</ListItemIcon>
										<ListItemText
											primary={<Typography variant="body1">{branch?.name}</Typography>}
											secondary={
												<Typography variant="body2" sx={{ fontStyle: 'italic' }}>
													{branch?.address}
												</Typography>
											}
										/>
									</ListItem>
									{index !== offer.branch_offices?.length - 1 && (
										<Divider variant="inset" />
									)}
								</Box>
							))}
						</List>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cerrar</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default OfferContent;
