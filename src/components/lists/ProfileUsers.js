import { Edit } from '@mui/icons-material';
import {
	Avatar,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemIcon,
	ListItemText,
	Tooltip,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import EditCompanieField from '../dialogs/EditCompanieField';

export default function ProfileUsers(props) {
	const { users } = props;
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
				{users?.map(user => (
					<ListItem key={user.id} alignItems="center" sx={{ py: 0, px: 2 }}>
						<ListItemAvatar>
							<Avatar alt={user.nombres} src={user.picture} />
						</ListItemAvatar>
						<ListItemText
							primary={user.nombres + user.apellidos}
							secondary="responsable"
						/>
						{isAdmin && (
							<ListItemIcon>
								<EditCompanieField
									tooltip="Cambiar responsable"
									fieldName="responsable"
									data={user.id}
								/>
							</ListItemIcon>
						)}
					</ListItem>
				))}
			</List>
		</Box>
	);
}
