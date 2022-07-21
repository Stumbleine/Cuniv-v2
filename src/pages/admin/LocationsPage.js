import { Class, LibraryBooks } from '@mui/icons-material';
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddLocationForm from '../../components/forms/AddLocationForm';
import ShowRoles from '../../components/ShowRoles';
import LocationsTable from '../../components/tables/LocationsTable';
import { getLocationsAsync } from '../../store/umssSlice';
import '../../styles/scroll.css';

export default function LocationsPage() {
	const { accessToken } = useSelector(state => state.login);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLocationsAsync(accessToken));
	}, []);

	return (
		<Container maxWidth="xl">
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
						Locaciones de la universidad
					</Typography>
				</Box>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<LocationsTable />
					</Grid>
					<Grid item xs={12} md={6}>
						<AddLocationForm />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
