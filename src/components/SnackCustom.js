import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function SnackCustom({ data, closeSnack, father }) {
	const [open, setOpen] = useState(data.open);
	const navigate = useNavigate();
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		closeSnack();
		data.redirectPath && navigate(data?.redirectPath);
	};
	useEffect(() => {
		console.log('SI ejecuta', father);
		setOpen(data.open);
	}, [data]);

	return (
		<Snackbar
			// sx={{ zIndex: 1, position: 'absolute' }}
			open={open}
			autoHideDuration={3000}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={handleClose}>
			<Alert onClose={handleClose} severity={data.severity || 'success'}>
				{data.msg}
			</Alert>
		</Snackbar>
	);
}
