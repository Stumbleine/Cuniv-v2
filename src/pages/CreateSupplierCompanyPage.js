import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ShowRule from '../components/ShowRule';
import CompanieRegisterForm from '../components/forms/CompanieRegisterForm';

function CreateSupplierCompanyPage() {
	const { rule, user, rulepath } = useSelector((state) => state.user);
	const [open, setOpen] = useState(false);

	// useEffect(() => {
	// 	document.title = 'cuniv | registro empresa';
	// 	console.log('title');
	// }, []);

	const handleClose = (event, reason) => {
		console.log('close');

		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		// Navigate('/reg-task');
	};

	return (
		<Container maxWidth="lg">
			<ShowRule />

			{/* <Snackbar
				open={open}
				autoHideDuration={3000}
				// sx={{ background: green[400] }}
				onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity="success"
					sx={{ width: '100%', background: green[400], color: 'white' }}>
					Empresa creado exitosamente
				</Alert>
			</Snackbar> */}
			<Box>
				<Box>
					<Typography
						variant="h5"
						sx={{
							mb: 3,
							fontWeight: 'bold',
							color: 'text.title',
							fontStyle: 'italic',
						}}>
						{rule === 'PRV' ? 'Registrar empresa' : 'Añadir empresa proveedora'}
					</Typography>
				</Box>
				<CompanieRegisterForm />
			</Box>
		</Container>
	);
}

export default CreateSupplierCompanyPage;
