import { Business } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBranchAsync } from '../../store/companiesSlice';
import DeleteItem from '../dialogs/DeleteItem';
import AddCompanyBranch from '../forms/AddCompanyBranch';
/**
 * Componente lista para mostrar las sucursales en el perfil de una empresa
 * @component ProfileSucursals
 * @property {Array} sucursales lista de sucursales de la empresa
 * @property {Function} handleSnack llama al componente snackbar (alerta)
 * @exports ProfileSucursals
 */
export default function ProfileSucursals({ sucursales, handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	/**
	 * Realiza dispatch hacia la peticion deleteBranchAsync para eliminar una sucursal
	 * @function deleteAsync
	 * @param {Number} id identificador del link
	 */
	const deleteAsync = id => {
		/**
		 * @function {async} delet
		 */
		const delet = async () => {
			await dispatch(deleteBranchAsync(accessToken, id, sucursales[0].id_empresa));
		};
		delet()
			.then(r => {
				handleSnack('Sucursal eliminado exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
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
								handleSnack={handleSnack}
								actionType="update-fetch"
								editData={sucursal}
							/>
							<DeleteItem
								handleSnack={handleSnack}
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
					handleSnack={handleSnack}
					idEmpresa={sucursales[0].id_empresa}
				/>
			</Box>
		</Box>
	);
}
