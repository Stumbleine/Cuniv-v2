import { Warning } from '@mui/icons-material';
import {
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { offersViewAsync } from '../../store/statisticsSlice';

import SkeletonTable from '../skeletons/SkeletonTable';

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
														maxWidth: 200,
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
									{isAdmin && <TableCell>{offer.razon_social}</TableCell>}
									<TableCell align="center">
										<Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
											{offer.count}
										</Typography>
									</TableCell>
								</TableRow>
						  ))
						: statusFetch.isLoading && <SkeletonTable head={TABLE_HEAD} />}
				</TableBody>
			</Table>

			{!offersView && !statusFetch.isLoading && !statusFetch.error && (
				<Box width={1} sx={{ py: 2 }}>
					<Typography textAlign="center" color="textSecondary">
						No se encontraron las ofertas
					</Typography>
				</Box>
			)}
			{statusFetch.error && (
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
		</TableContainer>
	);
}
