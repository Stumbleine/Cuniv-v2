import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductAddForm from '../components/forms/ProductAddForm';
import ProductsTable from '../components/tables/ProductsTable';
import ShowRoles from '../components/ShowRoles';
import { productsAsync } from '../store/productsSlice';
import { hasPrivilege } from '../Utils/RBAC';
import WarningVerified from '../components/WarningVerified';
import SnackCustom from '../components/SnackCustom';
function ProductsPage() {
	const { user, isAdmin } = useSelector(state => state.user);

	const { profile } = useSelector(state => state.companies);
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const privilegeCreate = hasPrivilege(
		['gestionar productos', 'crear producto'],
		user.permisos
	);
	// const privilegeListar = hasPrivilege(['gestionar productos','listar productos'],user.permisos)

	useEffect(() => {
		dispatch(productsAsync(accessToken));
		document.title = 'ssansi | productos';
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
	return (
		<Container maxWidth="lg">
			<SnackCustom data={snack} closeSnack={closeSnack} />

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
						Productos
					</Typography>
				</Box>
				{!isAdmin &&
					(user?.companieVerified === false || profile?.companie?.verified === false) && (
						<WarningVerified>
							¡Sus productos no son visibles para estudiantes, debido a que su empresa a
							un no fue verificado!
						</WarningVerified>
					)}

				<Grid container spacing={2}>
					<Grid item xs={12} md={privilegeCreate ? 7 : 12}>
						<ProductsTable handleSnack={handleSnack} />
					</Grid>
					{privilegeCreate && (
						<Grid item xs={12} md={5}>
							<ProductAddForm handleSnack={handleSnack} />
						</Grid>
					)}
				</Grid>
			</Box>
		</Container>
	);
}

export default ProductsPage;
