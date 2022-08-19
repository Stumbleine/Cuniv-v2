import { Edit, FilterBAndW, Language } from '@mui/icons-material';
import {
	Avatar,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemIcon,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteDialog from '../../components/dialogs/DeleteDialog';
import EditLink from '../../components/dialogs/EditLink';
import FilterBar from '../../components/FilterBar';
import AddLinkForm from '../../components/forms/AddLinkForm';
import ListLinks from '../../components/lists/ListLinks';
import ShowRoles from '../../components/ShowRoles';
import SkeletonList from '../../components/skeletons/SkeletonList';
import SnackCustom from '../../components/SnackCustom';
import { deleteSiteAsync, getSitesAsync } from '../../store/umssSlice';

export default function WebLinksPage() {
	const { accessToken } = useSelector(state => state.login);
	const { webSites, isLoading } = useSelector(state => state.umss);
	const [search, setSearch] = useState('All');

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSitesAsync(accessToken, search));
	}, []);
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

	const closeDialog = useRef(null);
	const deleteAsync = id => {
		console.log('delete', id);
		const del = async () => {
			return await dispatch(deleteSiteAsync(accessToken, id));
		};
		del()
			.then(() => {
				handleSnack('Link eliminado exitosamente', 'success');
				closeDialog.current();
			})
			.catch(() => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};
	const handleSearch = values => {
		setSearch(values.search);
		dispatch(getSitesAsync(accessToken, values.search));
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
						Sitios web de la universidad
					</Typography>
				</Box>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<FilterBar handleSearch={handleSearch} />
						<Paper
							sx={{ p: 2, maxHeight: 600, overflow: 'scroll', overflowX: 'hidden' }}
							className="container">
							<ListLinks />
						</Paper>
					</Grid>
					<Grid item xs={12} md={6}>
						<AddLinkForm />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
