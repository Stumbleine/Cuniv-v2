import {
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React from 'react';
import { Transition } from '../../Utils/Transitions';

/**
 * Dialogo para mostrar el detalle del reclamo
 * @component DeleteItem
 * @property {Number } complaint datos del reclamo
 *
 * @exports DeleteItem
 */
export default function ComplaintDetail({ complaint }) {
	const companie = complaint.companie;
	const offer = complaint.offer;

	const [open, setOpen] = React.useState(false);
	/**
	 * Cambia el estado open a true (abre el dialogo)
	 * @function handleClickOpen
	 */
	const handleClickOpen = () => {
		setOpen(true);
	};
	/**
	 * Cambia el estado open a false (cierra el dialogo)
	 * @function handleClose
	 */
	const handleClose = () => {
		setOpen(false);
	};
	/**
	 * Ejecuta la funcion de eliminacion.
	 * @function {async} submit
	 */

	return (
		<>
			<Button onClick={handleClickOpen}>Ver Más Detalles</Button>

			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				TransitionComponent={Transition}
				onClose={handleClose}>
				<DialogTitle>Detalles del reclamo</DialogTitle>
				<DialogContent>
					<Stack spacing={1}>
						<Typography sx={{ fontWeight: 'bold' }}>Sobre la empresa</Typography>
						{companie.name && (
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', pl: 1 }}>
								<Typography sx={{ mr: 1 }}>Razón social:</Typography>
								<Typography color="textSecondary" sx={{ ml: 0.5 }}>
									{companie.name}
								</Typography>
							</Box>
						)}
						{companie.phone && (
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', pl: 1 }}>
								<Typography component={Box} sx={{ mr: 1 }}>
									Teléfono:
								</Typography>
								<Typography component={Box} color="textSecondary" sx={{ ml: 0.5 }}>
									{companie.phone}
								</Typography>
							</Box>
						)}
						{companie.email && (
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', pl: 1 }}>
								<Typography component={Box} sx={{ mr: 1 }}>
									Correo electrónico:
								</Typography>
								<Typography component={Box} color="textSecondary" sx={{ ml: 0.5 }}>
									{companie.email}
								</Typography>
							</Box>
						)}
						{companie.rubro && (
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', pl: 1 }}>
								<Typography component={Box} sx={{ mr: 1 }}>
									Rubro:
								</Typography>
								<Typography component={Box} color="textSecondary" sx={{ ml: 0.5 }}>
									{companie.rubro}
								</Typography>
							</Box>
						)}
						<Typography sx={{ fontWeight: 'bold' }}>Sobre la oferta</Typography>
						{offer.title && (
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', pl: 1 }}>
								<Typography component={Box} sx={{ mr: 1 }}>
									Título:
								</Typography>
								<Typography component={Box} color="textSecondary" sx={{ ml: 0.5 }}>
									{offer.title}
								</Typography>
							</Box>
						)}
						{offer.description && (
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', pl: 1 }}>
								<Typography component={Box} sx={{ mr: 1 }}>
									Descripción:
								</Typography>
								<Typography component={Box} color="textSecondary" sx={{ ml: 0.5 }}>
									{offer.description}
								</Typography>
							</Box>
						)}
						{offer.discount && (
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', pl: 1 }}>
								<Typography component={Box} sx={{ mr: 1 }}>
									Descuento:
								</Typography>
								<Typography component={Box} color="textSecondary" sx={{ ml: 0.5 }}>
									{offer.discount}
								</Typography>
							</Box>
						)}
						{offer.start_date && (
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', pl: 1 }}>
								<Typography component={Box} sx={{ mr: 1 }}>
									Fecha inicio:
								</Typography>
								<Typography component={Box} color="textSecondary" sx={{ ml: 0.5 }}>
									{moment(offer.start_date).format('LL')}
								</Typography>
							</Box>
						)}
						{offer.end_date && (
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', pl: 1 }}>
								<Typography component={Box} sx={{ mr: 1 }}>
									Fecha fin:
								</Typography>
								<Typography component={Box} color="textSecondary" sx={{ ml: 0.5 }}>
									{moment(offer.end_date).format('LL')}
								</Typography>
							</Box>
						)}
						{offer.products && (
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', pl: 1 }}>
								<Typography component={Box} sx={{ mr: 1 }}>
									Productos
								</Typography>
								{offer.products?.map((p, index) => (
									<Chip key={index} label={p.name} sx={{ mr: 1 }} />
								))}
								{/* <Typography component={Box} color="textSecondary" sx={{ ml: 0.5 }}>
									{offer.end_date}
								</Typography> */}
							</Box>
						)}

						{offer.status && (
							<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', pl: 1 }}>
								<Typography component={Box} sx={{ mr: 1 }}>
									Estado:
								</Typography>
								<Typography component={Box} color="textSecondary" sx={{ ml: 0.5 }}>
									{offer.status}
								</Typography>
							</Box>
						)}
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cerrar</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
