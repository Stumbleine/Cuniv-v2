import { Delete, Edit } from '@mui/icons-material';
import {
	Card,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ProductsTable(props) {
	const products = useSelector((state) => state.products.products);

	const TABLE_HEAD = [
		{ id: 'producto', label: 'Producto/Servicio', alignRight: false },
		{ id: 'descripcion', label: 'Descripcion', alignRight: false },
		{ id: 'precio', label: 'precio', alignRight: false },
		{ id: 'acciones', label: 'Acciones', alignRight: false },
	];
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		console.log('CantPerpage', event.target.value);
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<Card>
			<TableContainer>
				<Table>
					<TableHead sx={{ bgcolor: 'primary.main' }}>
						<TableRow>
							{TABLE_HEAD.map((cell) => (
								<TableCell key={cell.id} sx={{ color: 'white' }}>
									<Typography noWrap> {cell.label}</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{products
							?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((product) => (
								<TableRow key={product.nombre} hover>
									<TableCell component="th" scope="row">
										<Stack alignItems="center" direction="row" spacing={1}>
											<img
												src={product.image}
												alt={product.name}
												style={{
													maxWidth: 80,
													maxHeight: 70,
													borderRadius: 10,
												}}
											/>
											<Box>
												<Typography noWrap>{product.nombre}</Typography>

												<Typography
													variant="subtitle2"
													sx={{ color: 'text.secondary' }}
													noWrap>
													{product.tipo}
												</Typography>
											</Box>
										</Stack>
									</TableCell>
									<TableCell>{product.descripcion}</TableCell>
									<TableCell>Bs. {product.precio}</TableCell>
									<TableCell align="right">
										<Box sx={{ display: 'flex' }}>
											<IconButton>
												<Edit></Edit>
											</IconButton>
											<IconButton>
												<Delete></Delete>
											</IconButton>
										</Box>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				{products.length === 0 && (
					<Box sx={{ width: '100%', textAlign: 'center', mt: 2, mb: 2 }}>
						<Typography color="textSecondary">
							No tiene productos registrado aun
						</Typography>
					</Box>
				)}
				<TablePagination
					rowsPerPageOptions={[5, 10]}
					component="div"
					count={products.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</Card>
	);
}
export const P = [
	{
		image: '/mock-images/products/product_6.jpg',
		nombre: 'mango',
		descripcion: 'asdasda',
		precio: 123,
		tipo: 'producto',
	},
	{
		image: '/mock-images/products/product_2.jpg',
		nombre: 'mango',
		descripcion: 'asdasda',
		precio: 123,
		tipo: 'producto',
	},
	{
		image: '/mock-images/products/product_1.jpg',
		nombre: 'mango',
		descripcion: 'asdasda',
		precio: 123,
		tipo: 'servicio',
	},
	{
		image: '/mock-images/products/product_10.jpg',
		nombre: 'mango',
		descripcion: 'asdasda',
		precio: 123,
		tipo: 'producto',
	},
	{
		image: '/mock-images/products/product_8.jpg',
		nombre: 'mango',
		descripcion: 'asdasda',
		precio: 123,
		tipo: 'producto',
	},
	{
		image: '/mock-images/products/product_7.jpg',
		nombre: 'mango',
		descripcion: 'asdasda',
		precio: 123,
		tipo: 'servicio',
	},
	{
		image: '/mock-images/products/product_9.jpg',
		nombre: 'mango',
		descripcion: 'asdasda',
		precio: 123,
		tipo: 'servicio',
	},
];
