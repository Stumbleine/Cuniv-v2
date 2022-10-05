import {
	Delete,
	FamilyRestroomRounded,
	Warning,
	WarningAmber,
} from '@mui/icons-material';
import {
	Button,
	CardActionArea,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Slide,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import SnackCustom from '../SnackCustom';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteItem({ deleteAsync, id, itemName, disabled }) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

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
			<Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
				<DialogTitle>{'Eliminar ' + itemName + '?'}</DialogTitle>
				<DialogContent>
					<DialogContentText display="flex">
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
