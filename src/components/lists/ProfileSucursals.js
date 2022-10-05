import { Business, Delete, Edit } from '@mui/icons-material';
import {
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBranchAsync } from '../../store/companiesSlice';
import DeleteItem from '../dialogs/DeleteItem';
import AddCompanyBranch from '../forms/AddCompanyBranch';

export default function ProfileSucursals(props) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);

	const { sucursales } = props;
	const deleteAsync = id => {
		const delet = async () => {
			await dispatch(deleteBranchAsync(accessToken, id, props.sucursales[0].id_empresa));
		};
		delet()
			.then(r => {
				props.handleSnack('Usuario eliminado exitosamente', 'success');
			})
			.catch(e => {
				props.handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};
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
					<ListItem key={index} alignItems="center" sx={{ py: 0, px: 2 }}>
						<ListItemIcon>
							<Business sx={{ color: 'text.icon' }} />
						</ListItemIcon>
						<ListItemText primary={sucursal.nombre} secondary={sucursal.direccion} />
						<ListItemIcon>
							<AddCompanyBranch
								handleSnack={props.handleSnack}
								actionType="update-fetch"
								editData={sucursal}
							/>
							<DeleteItem
								handleSnack={props.handleSnack}
								deleteAsync={deleteAsync}
								id={sucursal.id_sucursal}
								itemName={sucursal.nombre}
								disabled={index === 0}
							/>
						</ListItemIcon>
					</ListItem>
				))}
			</List>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<AddCompanyBranch
					actionType="add-fetch"
					handleSnack={props.handleSnack}
					idEmpresa={sucursales[0].id_empresa}
				/>
			</Box>
		</Box>
	);
}
