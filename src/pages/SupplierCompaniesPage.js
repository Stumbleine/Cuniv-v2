import { Add, Pending } from '@mui/icons-material';
import {
	Container,
	Grid,
	Typography,
	Stack,
	Button,
	Chip,
	FormControl,
	InputLabel,
	Select,
	OutlinedInput,
	MenuItem,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ShowRoles from '../components/ShowRoles';
import SupplierCompany from '../components/cards/SupplierCompany';
import { hasPrivilege } from '../Utils/RBAC';
import { compNotVerifiedAsync, getCompaniesAsync } from '../store/companiesSlice';
import CompanieNV from '../components/cards/CompanieNV';
import SkeletonCompanie from '../components/skeletons/SkeletonCompanie';
import FilterBar from '../components/FilterBar';

function SupplierCompaniesPage() {
	const dispatch = useDispatch();
	const { isLoading, companies, companiesNV } = useSelector(state => state.companies);
	const { user, isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const [showButton, setShowButton] = useState(false);
	const [showNVCompanies, setNVCompanies] = useState(false);
	// const [companies, setCompanies] = useState(null);
	// const [companiesNV, setcompaniesNV] = useState(null);
	useEffect(() => {
		document.title = 'ssansi | empresas';
		if (hasPrivilege(['crear empresa', 'gestionar empresas'], user.permisos) || isAdmin) {
			setShowButton(true);
		}
		dispatch(getCompaniesAsync(accessToken));
		dispatch(compNotVerifiedAsync(accessToken));
	}, []);

	const handleClick = () => setNVCompanies(!showNVCompanies);
	// console.info('You clicked the Chip.', showNVCompanies);

	const MsgCompaniesNull = props => {
		return (
			<Stack maxWidth="lg" spacing={2} alignItems="center" sx={{ mt: 2 }}>
				<Typography>{props.children}</Typography>
			</Stack>
		);
	};

	const listCompaniesNV = () => {
		return companiesNV ? (
			companiesNV.map((companie, index) => (
				<Grid item key={index} xs={6} sm={4} md={3}>
					<CompanieNV companie={companie} />
				</Grid>
			))
		) : isLoading ? (
			[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((sk, index) => (
				<Grid item key={index} xs={6} sm={4} md={3}>
					<SkeletonCompanie />
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
		) : isLoading ? (
			[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((sk, index) => (
				<Grid item key={index} xs={6} sm={4} md={3}>
					<SkeletonCompanie />
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
						direction={{ xs: 'column', md: 'row' }}
						alignItems="center"
						// justifyContent="flex-end"
						sx={{ mb: 3 }}
						spacing={2}>
						<FilterBar>
							<FormControl sx={{ minWidth: { xs: 1, sm: 160 } }} size="small">
								<InputLabel id="rubrof-label">Rubro</InputLabel>
								<Select
									labelId="rubrof-label"
									id="rubro-filter"
									defaultValue={'All'}
									input={<OutlinedInput id="rubro-filter" label="Rubro" />}>
									<MenuItem value="All">Todos</MenuItem>
									<MenuItem value="PRV">Restaurante</MenuItem>
									<MenuItem value="ADM">Salud</MenuItem>
									<MenuItem value="SADM">Parque</MenuItem>
									<MenuItem value="EST">Electricidad</MenuItem>
								</Select>
							</FormControl>
							<Chip
								label={
									<Typography variant="body2" component="span">
										Solicitudes ({companiesNV ? companiesNV.length : '0'})
									</Typography>
								}
								variant={showNVCompanies ? 'filled' : 'outlined'}
								onClick={handleClick}
								icon={<Pending></Pending>}
							/>
						</FilterBar>

						{showButton && (
							<Button
								sx={{ width: { xs: '100%', md: 'auto' } }}
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
					{showNVCompanies === true ? listCompaniesNV() : listCompanies()}
				</Grid>
			</Box>
		</Container>
	);
}

export default SupplierCompaniesPage;
