import { LocalOffer } from '@mui/icons-material';
import {
	Button,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';

export default function ProfileOffers(props) {
	const { offers } = props;
	useEffect(() => {
		console.log('aqui products', offers);
	}, []);

	return (
		<Box>
			<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
				Ofertas
			</Typography>
			<List
				disablePadding
				sx={{
					width: '100%',
					maxHeight: 300,
					overflowY: 'auto',

					borderRadius: 2,
				}}>
				{offers ? (
					offers?.map((o, index) => (
						<ListItem key={index} alignItems="flex-start" sx={{ py: 0, px: 2 }}>
							<ListItemIcon sx={{ mt: 2 }}>
								<LocalOffer sx={{ color: 'text.icon' }} />
							</ListItemIcon>
							<ListItemText
								primary={o.title}
								secondary={
									o.discount +
									(o.discount_type === 'Porcentual' ? ' %' : ' Bs.') +
									' de descuento'
								}
							/>
						</ListItem>
					))
				) : (
					<Typography variant="body2" color="textSecondary" align="center">
						No tiene ofertas registradas.
					</Typography>
				)}
				{offers && (
					<Box sx={{ textAlign: 'end', width: '100%' }}>
						<Button>Ver mas ofertas</Button>
					</Box>
				)}
			</List>
		</Box>
	);
}
