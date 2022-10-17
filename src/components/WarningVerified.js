import { Warning } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
/**
 * Mensaje de Warning que se muestra en cualquiera situacon para adertir
 * @component WarningVerified
 * @property {Component} children
 * @exports WarningVerified
 */
export default function WarningVerified({ children }) {
	return (
		<Box
			width={1}
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: 3,
				background: amber[200],
				p: 1,
				mb: 2,
			}}>
			<Warning sx={{ mr: 2, color: amber[700] }}></Warning>
			<Typography color="textSecondary">{children}</Typography>
		</Box>
	);
}
