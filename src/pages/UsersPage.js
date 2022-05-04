import { Add } from '@mui/icons-material';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UsersTable from '../components/UsersTable';
import { getUsersListAync } from '../store/usersSlice';

function UsersPage() {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.users);
	useEffect(() => {
		document.title = 'cuniv | usuarios';
		const fetchusers = async () => {
			const users = await dispatch(getUsersListAync());
		};
		fetchusers();
	}, []);

	return (
		<Container maxWidth="lg">
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
						sx={{ mb: 3 }}>
						<Link to="/provider/createOffer" style={{ textDecoration: 'none' }}>
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
