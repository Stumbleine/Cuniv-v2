import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductAddForm from '../components/forms/ProductAddForm';
import ProductsTable from '../components/tables/ProductsTable';
import ShowRoles from '../components/ShowRoles';
import { productsAsync } from '../store/productsSlice';
import { hasPrivilege } from '../Utils/RBAC';
import WarningVerified from '../components/WarningVerified';
function ProductsPage() {
	const { user } = useSelector(state => state.user);
	const { products, isLoading } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const privilegeCreate = hasPrivilege(
		['gestionar productos', 'crear producto'],
		user.permisos
	);
	// const privilegeListar = hasPrivilege(['gestionar productos','listar productos'],user.permisos)

	useEffect(() => {
		dispatch(productsAsync(accessToken));
		document.title = 'cuniv | productos';
	}, []);
	return (
		<Container maxWidth="lg">
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
				{user?.companieVerified === false && (
					<WarningVerified>
						¡Sus productos no son visibles para estudiantes, debido a que su empresa a un
						no fue verificado!
					</WarningVerified>
				)}

				<Grid container spacing={2}>
					<Grid item xs={12} md={privilegeCreate ? 7 : 12}>
						<ProductsTable />
					</Grid>
					{privilegeCreate && (
						<Grid item xs={12} md={5}>
							<ProductAddForm />
						</Grid>
					)}
				</Grid>
			</Box>
		</Container>
	);
}

export default ProductsPage;
