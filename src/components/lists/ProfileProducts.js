import { CheckCircle } from '@mui/icons-material';
import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import React, { useEffect } from 'react';

function ProfileProducts(props) {
	const { products } = props;
	useEffect(() => {
		console.log('aqui products', products);
	}, []);

	return (
		<Box>
			<Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
				Productos
			</Typography>
			<List
				sx={{
					width: '100%',
					maxHeight: 300,
					overflowY: 'hidden',
					borderRadius: 2,
				}}
				disablePadding>
				{products.length !== 0 ? (
					products?.map((p, index) => (
						<ListItem key={index} alignItems="flex-start" sx={{ py: 0, px: 2 }}>
							<ListItemIcon sx={{ mt: 3 }}>
								<CheckCircle sx={{ color: 'text.icon' }} />
							</ListItemIcon>
							<ListItemText
								primary={p.nombre}
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: 'block' }}
											component="span"
											variant="body2"
											noWrap
											color="text.primary">
											{p.descripcion}
										</Typography>
										{'Bs. ' + p.precio}
									</React.Fragment>
								}
							/>
						</ListItem>
					))
				) : (
					<Typography variant="body2" color="textSecondary" align="center">
						No tiene productos registrados.
					</Typography>
				)}
			</List>
			{products.length !== 0 && (
				<Box sx={{ textAlign: 'end', width: '100%' }}>
					<Button>Ver mas productos nada</Button>
				</Box>
			)}
		</Box>
	);
}

export default ProfileProducts;
