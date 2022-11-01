import { Warning } from '@mui/icons-material';
import {
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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { offersViewAsync } from '../../store/statisticsSlice';
import SkeletonTable from '../skeletons/SkeletonTable';
/**
 * Tabla de ofertas con mas visualizaciones
 * @component OffersViewTable
 * @exports OffersViewTable
 */
export default function OffersViewTable() {
	const dispatch = useDispatch();

	const { accessToken } = useSelector(state => state.login);
	const { isAdmin } = useSelector(state => state.user);
	const { offersView } = useSelector(state => state.statics);

	const [statusFetch, setStatusFetch] = useState({
		error: false,
		success: false,
		isLoading: false,
	});

	useEffect(() => {
		/**
		 * Ejecuta el dispatch hacia la peticion offersViewAsync que devuelve una lista de ofertas top.
		 * @function {async} fetch
		 */
		const fetch = async () => {
			setStatusFetch({ error: false, success: false, isLoading: true });
			return await dispatch(offersViewAsync(accessToken));
		};
		fetch()
			.then(r => {
				setStatusFetch({ isLoading: false, error: false, success: true });
			})
			.catch(e => {
				setStatusFetch({ isLoading: false, error: true, success: false });
			});
	}, []);

	const TABLE_HEAD = [{ id: 'oferta', label: 'Oferta' }];
	isAdmin && TABLE_HEAD.push({ id: 'empresa', label: 'Empresa' });
	TABLE_HEAD.push({ id: 'vis', label: 'Vistas' });
	TABLE_HEAD.push({ id: 'canjeados', label: 'Canjeados' });

	const [rowsPerPage, setRowsPerPage] = useState(7);
	const [page, setPage] = useState(0);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 7));
		setPage(0);
	};
	return (
		<TableContainer component={Paper} sx={{ borderRadius: 2 }}>
			<Table size="small">
				<TableHead sx={{ bgcolor: 'primary.main' }}>
					<TableRow>
						{TABLE_HEAD.map(cell => (
							<TableCell align="center" key={cell.id} sx={{ color: 'white', py: 1 }}>
								<Typography noWrap> {cell.label}</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{offersView
						? offersView?.map(offer => (
								<TableRow key={offer.id_beneficio} hover>
									<TableCell component="th" scope="row">
										<Stack alignItems="center" direction="row" spacing={1}>
											<Box
												component="img"
												alt={offer.titulo}
												onError={({ target }) => {
													target.onError = null;
													target.src = '/imgs/defaultImg.svg';
												}}
												src={offer?.image || '/imgs/defaultImg.svg'}
												sx={{
													maxWidth: 55,
													borderRadius: 2,
													objectFit: !offer.image && 'fill',
												}}
											/>
											<Box>
												<Typography
													style={{
														maxWidth: 150,
														whiteSpace: 'nowrap',
														textOverflow: 'ellipsis',
														overflow: 'hidden',
													}}>
													{offer.titulo}
												</Typography>

												<Typography
													variant="body2"
													sx={{ color: 'text.secondary' }}
													noWrap>
													{offer.status}
												</Typography>
											</Box>
										</Stack>
									</TableCell>
									{isAdmin && <TableCell align="center">{offer.razon_social}</TableCell>}
									<TableCell align="center">
										<Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
											{offer.count}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
											{offer.count_redeemed}
										</Typography>
									</TableCell>
								</TableRow>
						  ))
						: statusFetch.isLoading && <SkeletonTable head={TABLE_HEAD} />}
				</TableBody>
			</Table>

			{(statusFetch.error || (!offersView && !statusFetch.isLoading)) && (
				<Box width={1} sx={{ py: 2 }}>
					<Typography textAlign="center" color="textSecondary">
						No hay datos para mostrar.
					</Typography>
				</Box>
			)}
			{offersView && (
				<TablePagination
					rowsPerPageOptions={[7, 10]}
					component="div"
					count={offersView?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</TableContainer>
	);
}
