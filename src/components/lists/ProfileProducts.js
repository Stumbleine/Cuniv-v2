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
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProfileProducts(props) {
	const { products } = props || [];

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
										{/* {'Bs. ' + p.precio} */}
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
						Ver mas productos
					</Button>
				</Box>
			)}
		</Box>
	);
}

export default ProfileProducts;