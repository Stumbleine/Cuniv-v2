import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function SnackCustom({ data, closeSnack }) {
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
		console.log('SI ejecuta');
		setOpen(data.open);
	}, [data]);

	return (
		<Snackbar
			sx={{ zIndex: 'tooltip' }}
			open={open}
			autoHideDuration={3000}
			onClose={handleClose}>
			<Alert
				onClose={handleClose}
				severity={data.severity || 'success'}
				sx={{ width: '100%' }}>
				{data.msg}
			</Alert>
		</Snackbar>
	);
}
