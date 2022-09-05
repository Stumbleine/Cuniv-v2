import {
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Complaint from '../../components/cards/Complaint';
import FilterBar from '../../components/FilterBar';
import ShowRoles from '../../components/ShowRoles';
import { complaintsAsync, complaintsFilterAsync } from '../../store/complaintSlice';

export default function ComplaintPage() {
	const dispatch = useDispatch();
	const { isLoading, filterLoading, fetchFailed, complaints } = useSelector(
		state => state.complaint
	);
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
	const types = [
		{ name: 'Tiempo de atención' },
		{ name: 'Higiene' },
		{ name: 'No acepta codigo de canje' },
		{ name: 'Otro' },
	];

	const compRow1 = complaints?.slice(0, 2);
	const compRow2 = complaints?.slice(2);

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
					{/* <Stack
						direction="row"
						// flexWrap="wrap-reverse"
						alignItems="center"
						// justifyContent="space-between"
						sx={{
							mb: 3,
						}}
						spacing={2}> */}
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

					{/* </Stack> */}
				</Box>
				<Grid container spacing={2} alignContent="center" justifyContent="center">
					<Grid item md={6}>
						<Stack spacing={2} direction="column">
							{
								complaints?.slice(0, 5).map(claim => (
									<Complaint key={claim.id} complaint={claim} />
								))
								// : isLoading
								// ? [1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((sk, index) => (
								// 		<Grid item key={index} xs={6} sm={4} md={3} xl={3}>
								// 			<Skeletonclaim />
								// 		</Grid>
								//   ))
								// : msgclaimsNull()
							}
						</Stack>
					</Grid>
					{/* {compRow2 && ( */}
					<Grid item md={6}>
						<Stack spacing={2} direction="column">
							{complaints?.slice(5).map(claim => (
								<Complaint key={claim.id} complaint={claim} />
							))}
						</Stack>
					</Grid>
					{/* )} */}
				</Grid>
			</Box>
		</Container>
	);
}

// export const complaints = [
// 	{
// 		id: 1,
// 		type: 'Tiempo de atencion',
// 		date: '20/05/22',
// 		description:
// 			'The content of Accordions is mounted by default even if the accordion is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your accordion details or simply render many accordions it might be a good idea to change this default behavior by enabling the claim',
// 		student: {
// 			nombres: 'Yurguen',
// 			apellidos: 'Pariente Ulloa',
// 			picture: 'image',
// 		},
// 		companie: 'Milcar SRL',
// 		offer: { title: 'Pollo Asado', discount: '20%', status: 'Vigente' },
// 		head: { nombres: 'Rene', apellidos: 'perez olguin', email: 'reneolguen@gmail.com' },
// 	},
// 	{
// 		id: 2,
// 		type: 'Tiempo de atencion',
// 		date: '20/05/22',
// 		description:
// 			'The content of Accordions is mounted by default even if the accordion is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your accordion details or simply render many accordions it might be a good idea to change this default behavior by enabling the claim',
// 		student: {
// 			nombres: 'Cristhian',
// 			apellidos: 'Pariente Ulloa',
// 			picture: 'image',
// 		},
// 		companie: 'Milcar SRL',
// 		offer: { title: 'Pollo Asado', discount: '20%', status: 'Vigente' },
// 		head: { nombres: 'Rene', apellidos: 'perez olguin', email: 'reneolguen@gmail.com' },
// 	},
// 	{
// 		id: 3,
// 		type: 'Tiempo de atencion',
// 		date: '20/05/22',
// 		description:
// 			'The content of Accordions is mounted by default even if the accordion is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your accordion details or simply render many accordions it might be a good idea to change this default behavior by enabling the claim',
// 		student: {
// 			nombres: 'Josue',
// 			apellidos: 'Pariente Ulloa',
// 			picture: 'image',
// 		},
// 		companie: 'Panchita SRL',
// 		offer: { title: 'Pollo Asado', discount: '20%', status: 'Vigente' },
// 		head: { nombres: 'Rene', apellidos: 'perez olguin', email: 'reneolguen@gmail.com' },
// 	},
// 	{
// 		id: 10,
// 		type: 'Tiempo de atencion',
// 		date: '20/05/22',
// 		description:
// 			'The content of Accordions is mounted by default even if the accordion is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your accordion details or simply render many accordions it might be a good idea to change this default behavior by enabling the claim',
// 		student: {
// 			nombres: 'Alicia',
// 			apellidos: 'Pariente Ulloa',
// 			picture: 'image',
// 		},
// 		companie: 'Milcar SRL',
// 		offer: { title: 'Pollo Asado', discount: '20%', status: 'Vigente' },
// 		head: { nombres: 'Rene', apellidos: 'perez olguin', email: 'reneolguen@gmail.com' },
// 	},
// ];
