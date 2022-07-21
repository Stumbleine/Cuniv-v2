import { Warning } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import React from 'react';

export default function WarningVerified(props) {
	return (
		<Box
			width={1}
			sx={{
				display: 'flex',
				justifyContent: 'center',
				borderRadius: 3,
				background: amber[200],
				p: 1,
				mb: 2,
			}}>
			<Warning sx={{ mr: 1, color: amber[700] }}></Warning>
			<Typography color="textSecondary">{props.children}</Typography>
		</Box>
	);
}
