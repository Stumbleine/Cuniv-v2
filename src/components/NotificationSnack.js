import { NotificationsActive } from '@mui/icons-material';
import { Box, Slide, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
/**
 * funcion de transion desde la izquierda para el snackbar de notificacion
 * @function TransitionLeft
 * @param {Object} props
 */
function TransitionLeft(props) {
	return <Slide {...props} direction="left" />;
}
/**
 * Alerta para mostrar una notificacion
 * @component NotificationSnack
 * @property {Function} closeSnack funcion de cierre
 * @property {Object} data datos de la notificacion: {title,msg}
 * @exports NotificationSnack
 */
export default function NotificationSnack({ data, closeSnack }) {
	const [open, setOpen] = useState(data.open);
	/**
	 * funcion de cierre del snack
	 * @function handleClose
	 * @param {Object} props
	 */
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		closeSnack();
	};

	useEffect(() => {
		setOpen(data.open);
	}, [data]);

	return (
		<Snackbar
			sx={{ borderRadius: 5 }}
			open={open}
			autoHideDuration={5000}
			TransitionComponent={TransitionLeft}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			message={
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<NotificationsActive />
					<Box sx={{ ml: 1 }}>
						<Typography variant="body2" lineHeight={1}>
							{data.body.title}
						</Typography>
						<Typography variant="body2">{data.body.msg}</Typography>
					</Box>
				</Box>
			}
			onClose={handleClose}
		/>
	);
}
