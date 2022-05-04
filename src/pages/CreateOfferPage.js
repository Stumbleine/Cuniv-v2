import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OfferRegisterForm from '../components/forms/OfferRegisterForm';
import { getSucursales } from '../store/companiesSlice';

function CreateOfferPage() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	useEffect(() => {
		dispatch(getSucursales(user.id_empresa));
	}, []);

	return (
		<Container maxWidth="lg">
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
						Crear nueva oferta
					</Typography>
				</Box>

				{/* <Box sx={{ display: 'flex', width: 1, background: pink[600] }}> */}
				<OfferRegisterForm />
			</Box>
		</Container>
	);
}

export default CreateOfferPage;
