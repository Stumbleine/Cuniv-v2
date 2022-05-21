import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import AssignPrivilegesForm from '../../components/forms/AssignPrivilegesForm';
import RoleCreateForm from '../../components/forms/RoleCreateForm';
import ShowRule from '../../components/ShowRule';

function CreateRolepage() {
	return (
		<Container>
			<ShowRule />
			<Box>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						fontWeight: 'bold',
						color: 'text.title',
						fontStyle: 'italic',
					}}>
					Registro de Roles
				</Typography>
			</Box>
			<Grid container spacing={2} justifyContent="center" justifyItems="center">
				<Grid item xs={12} sm={11} md={8} lg={7}>
					<RoleCreateForm />
					{/* <AssignPrivilegesForm /> */}
				</Grid>
			</Grid>
		</Container>
	);
}

export default CreateRolepage;
