import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductAddForm from '../components/forms/ProductAddForm';
import ProductsTable from '../components/ProductsTable';
import ShowRule from '../components/ShowRule';
import { getProductsPRV } from '../store/productsSlice';
function ProductsPage() {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProductsPRV(user.id_empresa));
		document.title = 'cuniv | productos';
	}, []);
	return (
		<Container maxWidth="lg">
			<ShowRule />
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
				<Grid container spacing={2}>
					<Grid item xs={12} md={7}>
						<ProductsTable />
					</Grid>
					<Grid item xs={12} md={5}>
						<ProductAddForm />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default ProductsPage;
