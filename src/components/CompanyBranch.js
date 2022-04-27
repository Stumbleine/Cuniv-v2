import React from 'react';
import { Paper, Typography, IconButton, Divider } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/system';
import { grey, orange } from '@mui/material/colors';

function CompanyBranch({ sucursal, sayHello }) {
	const sucursaL = sucursal;
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
				<Typography variant="body2">dir. {sucursaL.direccion} </Typography>
			</Box>

			<Box sx={{ mr: 1 }}>
				<IconButton onClick={() => sayHello('edit')}>
					<Edit></Edit>
				</IconButton>
				{/* {key === 1 ? ( */}
				<IconButton>
					<Delete></Delete>
				</IconButton>
				{/* ) : null} */}
			</Box>
		</Paper>
	);
}

export default CompanyBranch;
