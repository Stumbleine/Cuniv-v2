import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

function ShowRule() {
	const { rule } = useSelector((state) => state.user);

	return (
		<Box>
			<Typography
				color="textSecondary"
				sx={{ textAlign: 'end', fontStyle: 'italic' }}>
				Rol:{' '}
				{rule === 'PRV'
					? 'Proveedor'
					: rule === 'ADM'
					? 'Administrador'
					: 'Cajero'}
			</Typography>
		</Box>
	);
}

export default ShowRule;
