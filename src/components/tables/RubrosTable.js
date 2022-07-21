import { Delete, Edit } from '@mui/icons-material';
import {
	Avatar,
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
import SkeletonTable from '../skeletons/SkeletonTable';

function RubrosTable() {
	const { rubros, isLoading } = useSelector(state => state.rubros);

	const TABLE_HEAD = [
		{ id: 'nombre', label: 'Nombre rubro', alignRight: false },
		{ id: 'descripcion', label: 'Descripcion', alignRight: false },
		{ id: 'acciones', label: 'Acciones', alignRight: false },
	];
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
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
							{TABLE_HEAD.map(cell => (
								<TableCell key={cell.id} sx={{ color: 'white' }}>
									<Typography noWrap> {cell.label}</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rubros ? (
							rubros
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(rubro => (
									<TableRow key={rubro.nombre} hover>
										<TableCell component="th" scope="row">
											<Stack alignItems="center" direction="row" spacing={1}>
												<Avatar alt={rubro.nombre} src={rubro.picture} />

												<Typography noWrap>{rubro.nombre}</Typography>
											</Stack>
										</TableCell>
										<TableCell>{rubro.descripcion}</TableCell>
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
								))
						) : isLoading ? (
							<SkeletonTable head={TABLE_HEAD} />
						) : null}
					</TableBody>
				</Table>
				{rubros.length === 0 && (
					<Box sx={{ width: '100%', textAlign: 'center', mt: 2, mb: 2 }}>
						<Typography color="textSecondary">
							No existen rubros registradosregistrado aun
						</Typography>
					</Box>
				)}
				{rubros && (
					<TablePagination
						rowsPerPageOptions={[5, 10]}
						component="div"
						count={rubros.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				)}
			</TableContainer>
		</Card>
	);
}

export default RubrosTable;
