import {
	Card,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Complaint from '../../components/cards/Complaint';
import FilterBar from '../../components/FilterBar';
import ShowRoles from '../../components/ShowRoles';
import { complaintsAsync, complaintsFilterAsync } from '../../store/complaintSlice';

/**
 * Pagina de reclamos, donde se lista los reclamos de los estudiantes en dos columnas.
 * @component
 */

function ComplaintPage() {
	const dispatch = useDispatch();
	const { isLoading, filterLoading, complaints } = useSelector(state => state.complaint);
	const { accessToken } = useSelector(state => state.login);

	const [search, setSearch] = useState('All');
	const [type, setType] = useState('All');

	useEffect(() => {
		document.title = 'ssansi | reclamos';
		dispatch(complaintsAsync(accessToken));
	}, []);

	const handleType = event => {
		setType(event.target.value);
		dispatch(complaintsFilterAsync(accessToken, search, event.target.value));
	};
	const handleSearch = values => {
		setSearch(values.search);
		dispatch(complaintsFilterAsync(accessToken, values.search, type));
	};
	/** Tipo de reclamos, objeto utilizado para el filtro de reclamos por tipo */
	const types = [
		{ name: 'Tiempo de atención' },
		{ name: 'No cumple con la oferta' },
		{ name: 'Higiene' },
		{ name: 'No se acepta código de canje' },
		{ name: 'Otro' },
	];

	/** Componente mensaje que indica cuando no se recupero reportes en la peticion.
	 * @component
	 */
	const msgclaimsNull = () => {
		return (
			<Stack width={1} spacing={2} alignItems="center">
				<Typography>No se han encontrado reportes</Typography>
			</Stack>
		);
	};
	return (
		<Container maxWidth="lg">
			<ShowRoles />
			<Box>
				<Box sx={{ mb: 3 }}>
					<Typography
						variant="h5"
						sx={{
							mb: 2,
							fontWeight: 'bold',
							color: 'text.title',
							fontStyle: 'italic',
						}}>
						Reclamos
					</Typography>

					<FilterBar handleSearch={handleSearch}>
						<FormControl sx={{ minWidth: 200 }} size="small">
							<InputLabel id="claim-label">Tipo de reclamo</InputLabel>
							<Select
								labelId="claim-label"
								id="claim-filter"
								defaultValue={'All'}
								onChange={handleType}
								input={<OutlinedInput id="claim-filter" label="Tipo de reclamo" />}>
								<MenuItem value="All">Todos</MenuItem>
								{types?.map(type => (
									<MenuItem key={type.name} value={type.name}>
										{type.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</FilterBar>
				</Box>
				<Grid container spacing={2} alignContent="center" justifyContent="center">
					<Grid item md={6}>
						<Stack spacing={2} direction="column">
							{complaints?.slice(0, complaints.length / 2 + 1).map(claim => (
								<Complaint key={claim.id} complaint={claim} />
							))}
						</Stack>
					</Grid>
					{/* {compRow2 && ( */}
					<Grid item md={6}>
						<Stack spacing={2} direction="column">
							{complaints?.slice(complaints.length / 2 + 1).map(claim => (
								<Complaint key={claim.id} complaint={claim} />
							))}
						</Stack>
						<Stack spacing={2}>
							{isLoading || filterLoading
								? [1, 2, 3, 4]?.map((sk, index) => <Skeletonclaim key={index} />)
								: !complaints && msgclaimsNull()}
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
export default ComplaintPage;

/**
 * Component eskeleto para mostrar una animacion de carga en la pagina complaints (reclamos), es invocado cuando la variable isLoading es true.
 * @component
 */
const Skeletonclaim = () => {
	return (
		<Stack component={Card} spacing={1} sx={{ mb: 1, p: 2 }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					mb: 1,
				}}>
				<Box display="flex" sx={{ alignItems: 'center' }}>
					<Skeleton
						sx={{
							width: 40,
							height: 40,
						}}
						animation="wave"
						variant="circular"
					/>
					<Box sx={{ ml: 2 }}>
						<Skeleton animation="wave" variant="text" width={160} />
						<Skeleton animation="wave" variant="text" width={140} />
					</Box>
				</Box>
				<Box sx={{ p: 1, px: 2, background: grey[200], borderRadius: 10 }}>
					<Skeleton animation="wave" variant="text" width={100} />
				</Box>
			</Box>
			<Skeleton animation="wave" variant="text" />
			<Skeleton animation="wave" variant="text" />

			<Skeleton animation="wave" variant="text" />
		</Stack>
	);
};
