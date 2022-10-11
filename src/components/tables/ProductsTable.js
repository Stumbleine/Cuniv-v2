import { Warning } from '@mui/icons-material';
import {
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Paper,
	Select,
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
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductAsync, filterProductsAsync } from '../../store/productsSlice';
import { hasPrivilege } from '../../Utils/RBAC';
import DeleteItem from '../dialogs/DeleteItem';
import EditProduct from '../dialogs/EditProduct';
import FilterBar from '../FilterBar';
import SkeletonTable from '../skeletons/SkeletonTable';

export default function ProductsTable({ handleSnack, companies }) {
	const dispatch = useDispatch();
	const { products, isLoading, filterLoading, fetchFailed } = useSelector(
		state => state.products
	);
	const { accessToken } = useSelector(state => state.login);
	const { user, isAdmin } = useSelector(state => state.user);
	const [companieFilter, setCompanieFilter] = useState('All');
	const [search, setSearch] = useState('All');

	useEffect(() => {
		document.title = 'ssansi | productos';
	}, []);

	const privilegeEdit = hasPrivilege(
		['gestionar productos', 'editar producto'],
		user.permisos
	);

	const privilegeDelete = hasPrivilege(
		['gestionar productos', 'eliminar producto'],
		user.permisos
	);

	const TABLE_HEAD = [
		{ id: 'producto', label: 'Producto/Servicio', alignRight: false },
		{ id: 'descripcion', label: 'Descripcion', alignRight: false },
		{ id: 'precio', label: 'precio', alignRight: false },
	];
	isAdmin && TABLE_HEAD.push({ id: 'empresa', label: 'empresa', alignRight: false });

	if (privilegeEdit || privilegeDelete) {
		TABLE_HEAD.push({ id: 'acciones', label: 'Acciones', alignRight: false });
	}
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(0);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleCompanie = event => {
		setCompanieFilter(event.target.value);
		dispatch(filterProductsAsync(accessToken, search, event.target.value));
	};
	const handleSearch = values => {
		setSearch(values.search);
		dispatch(filterProductsAsync(accessToken, values.search, companieFilter));
	};

	const deleteAsync = id => {
		const delet = async () => {
			await dispatch(deleteProductAsync(accessToken, id));
		};
		delet()
			.then(r => {
				handleSnack('Usuario eliminado exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};

	return (
		<>
			<FilterBar handleSearch={handleSearch}>
				{isAdmin && (
					<FormControl sx={{ minWidth: 200 }} size="small">
						<InputLabel id="companie-label">Empresa</InputLabel>
						<Select
							labelId="companie-label"
							id="companie-filter"
							defaultValue={'All'}
							onChange={handleCompanie}
							input={<OutlinedInput id="companie-filter" label="Empresa" />}>
							<MenuItem value="All">Todos</MenuItem>
							{companies?.map(c => (
								<MenuItem key={c.id_empresa} value={c.id_empresa}>
									{c.razon_social}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}
			</FilterBar>
			<TableContainer component={Paper} sx={{ borderRadius: 2, mt: 2 }}>
				<Table size="small">
					<TableHead sx={{ bgcolor: 'primary.main' }}>
						<TableRow>
							{TABLE_HEAD.map(cell => (
								<TableCell key={cell.id} sx={{ color: 'white', py: 1 }}>
									<Typography noWrap> {cell.label}</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{filterLoading && (
							<TableRow>
								<TableCell component="th" scope="row" />
								<TableCell component="th" scope="row" align="center">
									<CircularProgress size={24} sx={{ color: green[500] }} />
								</TableCell>
							</TableRow>
						)}
						{products
							? products
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map(product => (
										<TableRow key={product.id_product} hover>
											<TableCell component="th" scope="row">
												<Stack alignItems="center" direction="row" spacing={1}>
													<Box
														component="img"
														alt={product.name}
														onError={({ target }) => {
															target.onError = null;
															target.src = '/imgs/defaultImg.svg';
														}}
														src={product?.image || '/imgs/defaultImg.svg'}
														sx={{
															maxWidth: 65,
															borderRadius: 2,
															objectFit: !product.image && 'fill',
														}}
													/>
													<Box>
														<Typography
															sx={{
																maxWidth: 200,
																whiteSpace: 'nowrap',
																textOverflow: 'ellipsis',
																overflow: 'hidden',
															}}>
															{product.name}
														</Typography>

														<Typography
															variant="subtitle2"
															sx={{ color: 'text.secondary' }}
															noWrap>
															{product.type}
														</Typography>
													</Box>
												</Stack>
											</TableCell>
											<TableCell>{product.description}</TableCell>
											<TableCell>Bs. {product.price}</TableCell>
											{isAdmin && <TableCell> {product.companie}</TableCell>}
											{(privilegeEdit || privilegeDelete) && (
												<TableCell align="right">
													<Box sx={{ display: 'flex' }}>
														{privilegeEdit && (
															<EditProduct
																product={product}
																companies={companies}
																handleSnack={handleSnack}
															/>
														)}
														{privilegeDelete && (
															<DeleteItem
																deleteAsync={deleteAsync}
																id={product.id_product}
																itemName={product.name}
															/>
														)}
													</Box>
												</TableCell>
											)}
										</TableRow>
									))
							: isLoading && <SkeletonTable head={TABLE_HEAD} />}
					</TableBody>
				</Table>

				{!products && !isLoading && !fetchFailed && (
					<Box width={1} sx={{ py: 2 }}>
						<Typography textAlign="center" color="textSecondary">
							No se encontraron productos
						</Typography>
					</Box>
				)}
				{fetchFailed && (
					<Box
						width={1}
						sx={{
							py: 2,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Warning color="error" sx={{ mr: 2 }} />

						<Typography textAlign="center" color="error">
							Error del servidor
						</Typography>
					</Box>
				)}
				{products && (
					<TablePagination
						rowsPerPageOptions={[10, 15]}
						component="div"
						count={products?.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				)}
			</TableContainer>
		</>
	);
}
