import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterBar from '../../components/FilterBar';
import AddLocationForm from '../../components/forms/AddLocationForm';
import ShowRoles from '../../components/ShowRoles';
import SnackCustom from '../../components/SnackCustom';
import LocationsTable from '../../components/tables/LocationsTable';
import { getLocationsAsync } from '../../store/umssSlice';
import '../../styles/scroll.css';

export default function LocationsPage() {
	const { accessToken } = useSelector(state => state.login);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLocationsAsync(accessToken));
	}, []);

	const handleSearch = values => {
		dispatch(getLocationsAsync(accessToken, values.search));
	};

	const [snack, setSnack] = useState({
		open: false,
		msg: '',
		severity: 'success',
		redirectPath: null,
	});
	const closeSnack = () => {
		setSnack({ ...snack, open: false });
	};
	const handleSnack = (msg, sv, path) => {
		setSnack({ ...snack, open: true, msg: msg, severity: sv, redirectPath: path });
	};

	return (
		<Container maxWidth="xl">
			<ShowRoles />
			<SnackCustom data={snack} closeSnack={closeSnack} />
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
						<LocationsTable handleSnack={handleSnack} />
					</Grid>
					<Grid item xs={12} md={6}>
						<AddLocationForm />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
