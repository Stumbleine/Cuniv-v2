import { Campaign } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Transition } from '../../Utils/Transitions';

export default function Popup({ openFromFather, handleCloseFromFather }) {
	const [open, setOpen] = React.useState(false);
	useEffect(() => {
		setOpen(openFromFather);
	}, [openFromFather]);

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
		handleCloseFromFather();
	};
	return (
		<Dialog
			PaperProps={{ style: { borderRadius: 15 } }}
			open={open}
			TransitionComponent={Transition}
			onClose={handleClose}>
			<DialogTitle sx={{ alignItems: 'center', display: 'flex' }}>
				<Campaign sx={{ mr: 1 }} />
				Aviso
			</DialogTitle>

			<DialogContent>
				<DialogContentText display="flex" alignItems="center">
					Usted esta intentando ingresar con una cuenta institucional para estudiantes, si
					es estudiante descargue la aplicacion movil o intente con otro tipo de cuenta
					google.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cerar</Button>
			</DialogActions>
		</Dialog>
	);
}
