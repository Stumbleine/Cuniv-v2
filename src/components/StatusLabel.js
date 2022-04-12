import { Box, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import React from 'react';

function StatusLabel(props) {
	const status = props.status;
	return (
		<Box
			sx={{
				p: 0.5,
				background: status === 'expirado' ? red[400] : green[500],
				borderRadius: 2,
			}}>
			<Typography
				sx={{
					textTransform: 'uppercase',
					fontSize: 11,
					color: 'white',
					px: 1,
				}}>
				{status}
			</Typography>
		</Box>
	);
}

export default StatusLabel;
