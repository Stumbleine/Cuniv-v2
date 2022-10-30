import { Delete, WarningAmber } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from '@mui/material';
import React from 'react';
import { Transition } from '../../Utils/Transitions';

/**
 * Dialogo para eliminar items
 * @component DeleteItem
 * @property {Function} deleteAsync funcion que ejecuta dispatch del metodo de eliminacion.
 * @property {Number } id identificador del item.
 * @property {Boolean } [disabled] desabilitar boton
 *
 * @exports DeleteItem
 */
export default function DeleteItem({ deleteAsync, id, itemName, disabled }) {
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
	const submit = async () => {
		await deleteAsync(id);
	};

	return (
		<>
			<IconButton disabled={disabled || false} size="small" onClick={handleClickOpen}>
				<Delete
					sx={{
						color: disabled ? 'disabled' : 'text.icon',
						'&:hover': {
							color: 'error.light',
						},
					}}
				/>
			</IconButton>
			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				TransitionComponent={Transition}
				onClose={handleClose}>
				<DialogTitle>{'Eliminar ' + itemName + '?'}</DialogTitle>
				<DialogContent>
					<DialogContentText display="flex" alignItems="center">
						<WarningAmber color="error" sx={{ mr: 1 }} />
						Esta accion removera el item permanentemente.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button
						color="error"
						onClick={() => {
							submit().then(e => {
								handleClose();
							});
						}}>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
