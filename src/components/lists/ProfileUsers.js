import {
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function ProfileUsers(props) {
	const { users } = props;
	return (
		<Box>
			<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
				Usuarios
			</Typography>
			<List
				disablePadding
				sx={{
					width: '100%',
					borderRadius: 2,
				}}>
				{users?.map(user => (
					<ListItem key={user.id} alignItems="flex-start" sx={{ py: 0, px: 2 }}>
						<ListItemAvatar>
							<Avatar alt={user.nombres} src={user.picture} />
						</ListItemAvatar>
						<ListItemText
							primary={user.nombres + user.apellidos}
							secondary="responsable"
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
