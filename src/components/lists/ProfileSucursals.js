import { Business, Delete, Edit } from '@mui/icons-material';
import {
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function ProfileSucursals(props) {
	const { sucursales } = props;
	return (
		<Box>
			<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
				Sucursales
			</Typography>
			<List
				sx={{
					width: '100%',
					borderRadius: 2,
				}}>
				{sucursales?.map((sucursal, index) => (
					<ListItem key={index} alignItems="flex-start" sx={{ py: 0, px: 2 }}>
						<ListItemIcon sx={{ mt: 2 }}>
							<Business sx={{ color: 'text.icon' }} />
						</ListItemIcon>
						<ListItemText primary={sucursal.nombre} secondary={sucursal.direccion} />
						<ListItemIcon sx={{ mt: 2 }}>
							<IconButton>
								<Edit sx={{ color: 'text.icon' }} />
							</IconButton>
							<IconButton disabled={index === 0}>
								<Delete sx={{ color: index === 0 ? 'disabled' : 'text.icon' }} />
							</IconButton>
						</ListItemIcon>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
