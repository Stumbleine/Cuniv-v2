import { Class, LibraryBooks } from '@mui/icons-material';
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterBar from '../../components/FilterBar';
import AddLocationForm from '../../components/forms/AddLocationForm';
import ShowRoles from '../../components/ShowRoles';
import LocationsTable from '../../components/tables/LocationsTable';
import { getLocationsAsync } from '../../store/umssSlice';
import '../../styles/scroll.css';

export default function LocationsPage() {
	const { accessToken } = useSelector(state => state.login);
	const [search, setSearch] = useState('All');

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLocationsAsync(accessToken, search));
	}, []);

	const handleSearch = values => {
		setSearch(values.search);
		dispatch(getLocationsAsync(accessToken, values.search));
	};
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
						<FilterBar handleSearch={handleSearch} />
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
