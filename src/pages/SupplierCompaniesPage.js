import { Add, Check, Pending, TrendingUpRounded } from '@mui/icons-material';
import { Container, Grid, Typography, Stack, Button, Chip } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Offer from '../components/cards/Offer';
import ShowRoles from '../components/ShowRoles';
import SupplierCompany from '../components/cards/SupplierCompany';
import { hasPrivilege } from '../Utils/RBAC';
import { compNotVerifiedAsync, getCompaniesAsync } from '../store/companiesSlice';
import CompanieNV from '../components/cards/CompanieNV';

function SupplierCompaniesPage() {
	const dispatch = useDispatch();
	const { companies, companiesNotVerified } = useSelector(state => state.companies);
	const { user, isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const [showButton, setShowButton] = useState(false);
	const [showNewCompanies, setSNCompanies] = useState(false);

	useEffect(() => {
		dispatch(getCompaniesAsync(accessToken));
		dispatch(compNotVerifiedAsync(accessToken));
		document.title = 'cuniv | empresas';
		if (hasPrivilege(['crear empresa', 'gestionar empresas'], user.permisos) || isAdmin) {
			setShowButton(true);
		}
	}, []);

	const handleClick = () => {
		console.info('You clicked the Chip.', showNewCompanies);
		setSNCompanies(!showNewCompanies);
	};
	const MsgCompaniesNull = props => {
		return (
			<Box>
				<Stack maxWidth="lg" spacing={2} alignItems="center" sx={{ mt: 2 }}>
					<Typography>{props.children}</Typography>
				</Stack>
			</Box>
		);
	};

	const listCompaniesNV = () => {
		return companiesNotVerified ? (
			companiesNotVerified.map((companie, index) => (
				<Grid item key={index} xs={6} sm={4} md={3}>
					<CompanieNV companie={companie} />
				</Grid>
			))
		) : (
			<MsgCompaniesNull>No han llegado nuevas solicitudes de afiliacion</MsgCompaniesNull>
		);
	};
	const listCompanies = () => {
		return companies ? (
			companies.map((companie, index) => (
				<Grid item key={index} xs={6} sm={4} md={3} xl={3}>
					<SupplierCompany companie={companie} />
				</Grid>
			))
		) : (
			<MsgCompaniesNull>No se han registrado empresas aun.</MsgCompaniesNull>
		);
	};
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
						Empresas
					</Typography>
					<Stack
						direction="row"
						flexWrap="wrap-reverse"
						alignItems="center"
						justifyContent="flex-end"
						sx={{ mb: 3 }}
						spacing={2}>
						<Chip
							label={
								<Typography variant="body2" component="span">
									Solicitudes ({companiesNotVerified ? companiesNotVerified.length : '0'})
								</Typography>
							}
							variant={showNewCompanies ? 'filled' : 'outlined'}
							onClick={handleClick}
							icon={<Pending></Pending>}
						/>
						{showButton && (
							<Button
								component={Link}
								to="/main/registerCompanie"
								startIcon={<Add />}
								variant="contained">
								Empresa
							</Button>
						)}
					</Stack>
				</Box>
				<Grid container spacing={2}>
					{showNewCompanies === true ? listCompaniesNV() : listCompanies()}
				</Grid>
			</Box>
		</Container>
	);
}

export default SupplierCompaniesPage;
