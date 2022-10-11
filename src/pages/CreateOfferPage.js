import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

import OfferRegisterForm from '../components/forms/OfferRegisterForm';
import ShowRoles from '../components/ShowRoles';

function CreateOfferPage() {
	return (
		<Container maxWidth="lg">
			<ShowRoles />
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

				<OfferRegisterForm />
			</Box>
		</Container>
	);
}

export default CreateOfferPage;
