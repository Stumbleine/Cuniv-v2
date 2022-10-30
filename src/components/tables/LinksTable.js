import { Language } from '@mui/icons-material';
import {
	Avatar,
	Box,
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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSiteAsync } from '../../store/umssSlice';
import DeleteItem from '../dialogs/DeleteItem';
import EditLink from '../dialogs/EditLink';
import SkeletonTable from '../skeletons/SkeletonTable';
/**
 * Tabla que enlista links de sitios web
 * @component LinksTable
 * @exports LinksTable
 */
export default function LinksTable({ handleSnack }) {
	const { accessToken } = useSelector(state => state.login);
	const { webSites, isLoadingL, filterLoadingL, fetchFailedL } = useSelector(
		state => state.umss
	);
	const dispatch = useDispatch();
	/**
	 * Realiza dispatch hacia la peticion deleteSiteAsync para eliminar un link
	 * @function deleteAsync
	 * @param {Number} id identificador del link
	 */
	const deleteAsync = id => {
		/**
		 * @function {async} delet
		 */
		const delet = async () => {
			await dispatch(deleteSiteAsync(accessToken, id));
		};
		delet()
			.then(r => {
				handleSnack('Link eliminado exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(0);
	const TABLE_HEAD = [
		{ id: 'link', label: 'Link' },
		{ id: 'description', label: 'Descripcion' },
		{ id: 'p', label: 'Prioridad' },
		{ id: 'actions', label: 'Acciones' },
	];
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer component={Paper} sx={{ borderRadius: 2, mt: 2 }}>
			<Table size="small">
				<TableHead sx={{ bgcolor: 'primary.main' }}>
					<TableRow>
						{TABLE_HEAD.map(cell => (
							<TableCell key={cell.id} sx={{ color: 'white', py: 1 }}>
								<Typography noWrap>{cell.label}</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{webSites && !filterLoadingL && !fetchFailedL
						? webSites
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(ws => (
									<TableRow key={ws.id} hover>
										<TableCell
											component="th"
											scope="row"
											sx={{ cursor: 'pointer' }}
											onClick={() => window.open(ws.url, '_blank')}>
											<Stack alignItems="center" direction="row" spacing={1}>
												<Avatar src={ws.image}>
													<Language />
												</Avatar>
												<Box>
													<Typography
														style={{
															maxWidth: 200,
															whiteSpace: 'nowrap',
															textOverflow: 'ellipsis',
															overflow: 'hidden',
														}}>
														{ws.title}
													</Typography>

													<Typography
														variant="body2"
														// component="a"
														// href={ws.url}
														sx={{
															color: 'text.secondary',
															maxWidth: 200,
															whiteSpace: 'nowrap',
															textOverflow: 'ellipsis',
															overflow: 'hidden',
														}}>
														{ws.url}
													</Typography>
												</Box>
											</Stack>
										</TableCell>
										<TableCell sx={{ minWidth: 150 }}>
											<Typography
												sx={{
													maxWidth: 220,
													whiteSpace: 'nowrap',
													// textOverflow: 'ellipsis',
													overflow: 'hidden',
												}}
												variant="body2">
												{ws.description}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography variant="body2">{ws.priority}</Typography>
										</TableCell>
										<TableCell align="right">
											<Box sx={{ display: 'flex' }}>
												<EditLink link={ws} handleSnack={handleSnack} />
												<DeleteItem
													deleteAsync={deleteAsync}
													id={ws.id}
													itemName={ws.title}
												/>
											</Box>
										</TableCell>
									</TableRow>
								))
						: (isLoadingL || filterLoadingL) && <SkeletonTable head={TABLE_HEAD} />}
				</TableBody>
			</Table>
			{(fetchFailedL || (!webSites && !isLoadingL && !filterLoadingL)) && (
				<Box width={1} sx={{ py: 2 }}>
					<Typography textAlign="center" color="textSecondary">
						No se encontraron links.
					</Typography>
				</Box>
			)}
			{webSites && (
				<TablePagination
					rowsPerPageOptions={[10]}
					component="div"
					count={webSites?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</TableContainer>
	);
}
