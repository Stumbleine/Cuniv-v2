import { Box, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';

function StatusLabel(props) {
	const status = props.status;
	return (
		<Box
			sx={{
				p: 0.5,
				background: status === 'EXPIRADO' ? red[400] : green[500],
				borderRadius: 2,
				position: props.elevated ? 'absolute' : 'relative',
				top: props.elevated ? 10 : 'none',
				right: props.elevated ? 10 : 'none',
			}}>
			<Typography
				sx={{
					fontWeight: 'bold',
					textTransform: 'uppercase',
					fontSize: 11,
					color: 'white',
					textAlign: 'center',
					px: 1,
				}}>
				{status}
			</Typography>
		</Box>
	);
}

export default StatusLabel;
