import { CheckCircle } from '@mui/icons-material';
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Componente lista para mostrar los principales productos en el perfil de una empresa
 * @component ProfileProducts
 * @property {Array} products lista de productos de la empresa
 * @exports ProfileProducts
 */
export default function ProfileProducts({ products }) {
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
				{products ? (
					products?.map((p, index) => (
						<ListItem key={index} alignItems="flex-start" sx={{ py: 0, px: 2 }}>
							<ListItemIcon sx={{ mt: 3 }}>
								<CheckCircle sx={{ color: 'text.icon' }} />
							</ListItemIcon>
							<ListItemText
								primary={p.name}
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: 'block' }}
											component="span"
											variant="body2"
											noWrap>
											{'Bs. ' + p.price}
										</Typography>
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
			{products && (
				<Box sx={{ textAlign: 'end', width: '100%' }}>
					<Button component={Link} to="/main/products">
						Ver más productos
					</Button>
				</Box>
			)}
		</Box>
	);
}
