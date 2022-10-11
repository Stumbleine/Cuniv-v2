import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import EditManager from '../dialogs/EditManager';

export default function ProfileUsers({ users, handleSnack }) {
	const { provider, cashiers } = users;
	const { isAdmin } = useSelector(state => state.user);

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
				<ListItem key={provider?.id} alignItems="center" sx={{ py: 0, px: 2 }}>
					<ListItemAvatar>
						<Avatar alt={provider?.nombres} src={provider?.picture} />
					</ListItemAvatar>
					<ListItemText
						primary={provider?.nombres + ' ' + provider?.apellidos}
						secondary="responsable"
					/>
					{isAdmin && (
						<ListItemIcon>
							<EditManager data={provider?.id} handleSnack={handleSnack} />
						</ListItemIcon>
					)}
				</ListItem>

				{cashiers?.map(cashier => (
					<ListItem key={cashier.id} alignItems="center" sx={{ py: 0, px: 2 }}>
						<ListItemAvatar>
							<Avatar alt={cashier.nombres} src={cashier.picture} />
						</ListItemAvatar>
						<ListItemText
							primary={cashier.nombres + ' ' + cashier.apellidos}
							secondary="cajero"
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
