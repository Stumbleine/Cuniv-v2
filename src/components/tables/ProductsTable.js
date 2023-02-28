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
/**
 * Tabla que enlista los productos
 * @component ProductsTable
 * @property {Function} handleSnack llama al componente snackbar (alerta)
 * @property {Object} companies lista de empresas para el formulario de edicion
 * @exports ProductsTable
 */
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
		{ id: 'descripcion', label: 'Descripción', alignRight: false },
		{ id: 'precio', label: 'Precio', alignRight: false },
	];
	isAdmin && TABLE_HEAD.push({ id: 'empresa', label: 'Empresa', alignRight: false });

	if (privilegeEdit || privilegeDelete) {
		TABLE_HEAD.push({ id: 'acciones', label: 'Acciones', alignRight: false });
	}
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(0);
	/**
	 * Cambia de pagina en la tabla
	 * @function handleChangePage
	 * @param {Object} event
	 */
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	/**
	 * Cambia la cantidad de productos a mostrarse en la tabla
	 * @function handleChangeRowsPerPage
	 * @param {Object} event
	 */
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	/**
	 * filtra productos por empresa que proviene del componente <FilterBar/>
	 * @function handleChangeRowsPerPage
	 * @param {Object} event
	 */
	const handleCompanie = event => {
		setCompanieFilter(event.target.value);
		dispatch(filterProductsAsync(accessToken, search, event.target.value));
	};
	/**
	 * Busca productos por caracteres con el buscador del componente <FilterBar/>
	 * @function handleSearch
	 * @param {Object} values
	 */
	const handleSearch = values => {
		setSearch(values.search);
		dispatch(filterProductsAsync(accessToken, values.search, companieFilter));
	};
	/**
	 * Realiza dispatch hacia la peticion deleteProductAsync para eliminar un producto
	 * @function deleteAsync
	 * @param {Number} id identificador de la locacion
	 */
	const deleteAsync = id => {
		/**
		 * @function {async} delet
		 */
		const delet = async () => {
			await dispatch(deleteProductAsync(accessToken, id));
		};
		delet()
			.then(r => {
				handleSnack('Producto eliminado exitosamente.', 'success');
			})
			.catch(e => {
				handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
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
						{products && !filterLoading && !fetchFailed
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
							: (isLoading || filterLoading) && <SkeletonTable head={TABLE_HEAD} />}
					</TableBody>
				</Table>
				{(fetchFailed || (!products && !isLoading && !filterLoading)) && (
					<Box width={1} sx={{ py: 2 }}>
						<Typography textAlign="center" color="textSecondary">
							No se encontraron productos.
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
