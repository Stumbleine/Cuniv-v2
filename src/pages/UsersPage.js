import { Add } from '@mui/icons-material';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowRoles from '../components/ShowRoles';
import UsersTable from '../components/tables/UsersTable';
import { usersAsync } from '../store/usersSlice';

function UsersPage() {
	const dispatch = useDispatch();
	const { users, isLoading } = useSelector(state => state.users);
	const { rulepath, user, rule } = useSelector(state => state.user);

	useEffect(() => {
		document.title = 'cuniv | usuarios';
		dispatch(usersAsync());
	}, []);

	return (
		<Container maxWidth="lg">
			<ShowRoles />
			<Box>
				<Box>
					<Typography
						variant="h5"
						sx={{
							mb: 2,
							fontWeight: 'bold',
							color: 'text.title',
							fontStyle: 'italic',
						}}>
						Usuarios
					</Typography>
					<Stack
						direction="row"
						flexWrap="wrap-reverse"
						alignItems="center"
						justifyContent="flex-end"
						spacing={2}
						sx={{ mb: 3 }}>
						<Link to={`/createRole`} style={{ textDecoration: 'none' }}>
							<Button startIcon={<Add />} variant="contained">
								Rol
							</Button>
						</Link>
						<Link to={`/createUser`} style={{ textDecoration: 'none' }}>
							<Button startIcon={<Add />} variant="contained">
								Usuario
							</Button>
						</Link>
					</Stack>
				</Box>
				<UsersTable></UsersTable>
			</Box>
		</Container>
	);
}

export default UsersPage;
