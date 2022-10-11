import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
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
		setOpen(data.open);
	}, [data]);

	return (
		<Snackbar
			sx={{ borderRadius: 5 }}
			open={open}
			autoHideDuration={3000}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={handleClose}>
			<Alert
				sx={{ borderRadius: 1 }}
				onClose={handleClose}
				severity={data.severity || 'success'}>
				{data.msg}
			</Alert>
		</Snackbar>
	);
}
