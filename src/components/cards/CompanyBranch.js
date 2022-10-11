import { useEffect, useState } from 'react';
import { Paper, Typography, IconButton, Stack } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Box } from '@mui/system';
import { grey, orange } from '@mui/material/colors';
import AddCompanyBranch from '../forms/AddCompanyBranch';

function CompanyBranch({ updateListBranchs }) {
	const defaultBranch = {
		nombre: 'Sucursal central',
		direccion: '-',
		latitud: '-',
		longitud: '-',
	};
	const [branchs, setBranchs] = useState([defaultBranch]);
	useEffect(() => {
		updateListBranchs(branchs);
	}, [branchs]);

	const handleAddBranch = sucursal => {
		setBranchs([...branchs, sucursal]);
	};

	const handleEditBranch = (data, index) => {
		setBranchs([
			...branchs.slice(0, index),
			data,
			...branchs.slice(index + 1, branchs.length),
		]);
	};
	const handleDeleteBranch = index => {
		setBranchs([...branchs.slice(0, index), ...branchs.slice(index + 1, branchs.length)]);
	};

	return (
		<>
			<Box>
				<Typography sx={{ fontWeight: 'bold' }}>Sucursales*</Typography>
				<Typography variant="body2" color="textSecondary">
					Modifique los datos de la sucursal principal (direccion, geolocalización)
				</Typography>
			</Box>
			<Stack
				direction="column"
				spacing={1}
				sx={{
					alignItems: 'center',
					p: 1,
					py: 2,
					borderRadius: 2,
					maxHeight: 250,
					background: grey[100],
					overflowY: 'scroll',
				}}>
				{branchs.map((b, index) => (
					<Paper
						key={index}
						sx={{
							display: 'flex',
							alignItems: 'center',
							width: '85%',
							minWidth: 300,
							borderRadius: 2,
							maxWidth: 600,
							minHeight: 60,
							background: orange[50],
						}}>
						<Box sx={{ ml: 2, flexGrow: 1 }}>
							<Typography variant="body1">{b.nombre}</Typography>
							<Typography variant="body2" color="textSecondary">
								dir: {b.direccion}
							</Typography>
						</Box>
						<Box sx={{ mr: 1 }}>
							<AddCompanyBranch
								actionType="edit"
								editData={{
									...b,
									index: index,
								}}
								handleEditSucursal={handleEditBranch}
							/>

							<IconButton
								disabled={index === 0}
								onClick={() => {
									handleDeleteBranch(index);
								}}>
								<Delete
									sx={{
										color: index === 0 ? 'disabled' : 'text.icon',
										'&:hover': {
											color: 'error.light',
										},
									}}
								/>
							</IconButton>
						</Box>
					</Paper>
				))}
			</Stack>
			<Box
				sx={{
					width: '100%',
					textAlign: 'end',
				}}>
				<AddCompanyBranch actionType="add" handleAddSucursal={handleAddBranch} />
			</Box>
		</>
	);
}

export default CompanyBranch;
