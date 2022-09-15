import { NotificationsActive } from '@mui/icons-material';
import { Box, Slide, Snackbar, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';

function TransitionRight(props) {
	return <Slide {...props} direction="right" />;
}
function TransitionLeft(props) {
	return <Slide {...props} direction="left" />;
}
export default function NotificationSnack({ data, closeSnack }) {
	const [open, setOpen] = useState(data.open);
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
/* <Alert sx={{ borderRadius: 1,alignItems:'center' }} onClose={handleClose}> */

/* </Alert> */
/* </Snackbar> */
