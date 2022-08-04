import { Delete, Edit } from '@mui/icons-material';
import {
	Card,
	IconButton,
	Paper,
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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { hasPrivilege } from '../../Utils/RBAC';
import SkeletonTable from '../skeletons/SkeletonTable';

export default function ProductsTable(props) {
	const { products, isLoading } = useSelector(state => state.products);
	const { user } = useSelector(state => state.user);
	const privilegeEdit = hasPrivilege(
		['gestionar producto', 'editar producto'],
		user.permisos
	);
	const privilegeDelete = hasPrivilege(
		['gestionar producto', 'eliminar producto'],
		user.permisos
	);

	const TABLE_HEAD = [
		{ id: 'producto', label: 'Producto/Servicio', alignRight: false },
		{ id: 'descripcion', label: 'Descripcion', alignRight: false },
		{ id: 'precio', label: 'precio', alignRight: false },
	];

	if (privilegeEdit || privilegeDelete) {
		TABLE_HEAD.push({ id: 'acciones', label: 'Acciones', alignRight: false });
	}
	console.log(TABLE_HEAD);
	const [rowsPerPage, setRowsPerPage] = useState(7);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<TableContainer component={Paper} sx={{ borderRadius: 2 }}>
			<Table>
				<TableHead sx={{ bgcolor: 'primary.main' }}>
					<TableRow>
						{TABLE_HEAD.map(cell => (
							<TableCell key={cell.id} sx={{ color: 'white' }}>
								<Typography noWrap> {cell.label}</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{products ? (
						products
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(product => (
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
									{(privilegeEdit || privilegeDelete) && (
										<TableCell align="right">
											<Box sx={{ display: 'flex' }}>
												{privilegeEdit && (
													<IconButton>
														<Edit sx={{ color: 'text.icon' }}></Edit>
													</IconButton>
												)}
												{privilegeDelete && (
													<IconButton>
														<Delete sx={{ color: 'text.icon' }}></Delete>
													</IconButton>
												)}
											</Box>
										</TableCell>
									)}
								</TableRow>
							))
					) : isLoading ? (
						<SkeletonTable head={TABLE_HEAD} />
					) : (
						<TableRow sx={{ textAlign: 'center', p: 2 }}>
							<TableCell>
								<Typography color="textSecondary">
									No tiene productos registrado aun
								</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			{products && (
				<TablePagination
					rowsPerPageOptions={7}
					component="div"
					count={products?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					// onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</TableContainer>
	);
}
