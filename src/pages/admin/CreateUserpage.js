import { ArrowBack } from '@mui/icons-material';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import UserCreateForm from '../../components/forms/UserCreateForm';
import ShowRoles from '../../components/ShowRoles';

function CreateUserpage() {
	return (
		<Container>
			<ShowRoles />

			<Box>
				<Typography
					variant="h5"
					sx={{
						mb: 3,
						fontWeight: 'bold',
						color: 'text.title',
						fontStyle: 'italic',
					}}>
					Registro de usuarios
				</Typography>
			</Box>
			<Grid container spacing={2} justifyContent="center" justifyItems="center">
				<Grid item xs={12} sm={10} md={7} lg={6}>
					<Button
						sx={{ mb: 1 }}
						component={Link}
						to="/main/users"
						startIcon={<ArrowBack></ArrowBack>}>
						Volver
					</Button>
					<UserCreateForm />
				</Grid>
			</Grid>
		</Container>
	);
}

export default CreateUserpage;
