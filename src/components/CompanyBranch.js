import React from 'react';
import { Paper, Typography, IconButton, Divider } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/system';
import { grey, orange } from '@mui/material/colors';
import AddCompanyBranch from './AddCompanyBranch';

function CompanyBranch({ sucursal, edit, index }) {
	const sucursaL = sucursal;
	const handleEditSucursal = (s) => {
		edit(s, index);
	};
	return (
		<Paper
			sx={{
				display: 'flex',
				alignItems: 'center',
				minWidth: 300,
				width: '80%',
				maxWidth: 600,

				minHeight: 60,
				background: orange[50],
			}}>
			<Box sx={{ ml: 2, flexGrow: 1 }}>
				<Typography variant="body1">{sucursaL.nombre}</Typography>
				<Typography variant="body2" color="textSecondary">
					dir: {sucursaL.direccion}{' '}
				</Typography>
			</Box>
			<Box sx={{ mr: 1 }}>
				<AddCompanyBranch
					actionType="edit"
					editData={sucursal}
					handleEditSucursal={handleEditSucursal}
				/>

				{/* {key === 1 ? ( */}
				<IconButton>
					<Delete
						sx={{
							color: 'text.icon',
							'&:hover': {
								color: 'error.light',
							},
						}}
					/>
				</IconButton>
				{/* ) : null} */}
			</Box>
		</Paper>
	);
}

export default CompanyBranch;
