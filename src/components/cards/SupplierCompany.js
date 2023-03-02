import { Edit, Email, Facebook, Instagram, Language } from '@mui/icons-material';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Divider,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { blue, grey, pink } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCompanieAsync } from '../../store/companiesSlice';
import { hasPrivilege } from '../../Utils/RBAC';
import DeleteItem from '../dialogs/DeleteItem';
/**
 * Tarjeta para mostrar una empresa en un componente Card, que incluye acciones de eliminar y editar
 * @component SupplierCompany
 * @property {Object} companie datos de la empresa a mosrar en la tarjeta, incluye un resumen: razon_social, logo, redes sociales.
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 * @exports SupplierCompany
 */
export default function SupplierCompany({ companie, handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const { user } = useSelector(state => state.user);

	/**
	 * Ejecuta el dispatch hacia la funcion deleteCompanieAsync que hace la peticion DELETE para una empresa.
	 * @funcion deleteAsync
	 */
	const deleteAsync = id => {
		const delet = async () => {
			await dispatch(deleteCompanieAsync(accessToken, id));
		};
		delet()
			.then(r => {
				handleSnack('Empresa eliminada exitosamente.', 'success');
			})
			.catch(e => {
				handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
			});
	};
	const privilegeDelete = hasPrivilege(
		['gestionar empresas', 'eliminar empresa'],
		user.permisos
	);
	const privilegeEdit = hasPrivilege(
		['gestionar empresas', 'editar empresa'],
		user.permisos
	);
	return (
		<Card
			sx={{
				bgcolor: 'background.paper',
				borderRadius: 2,
			}}>
			<CardActionArea
				component={Link}
				to={`/main/supplierCompanies/${companie.id_empresa}`}>
				<CardMedia
					component="img"
					alt={companie.razon_social}
					height="140"
					width="140"
					sx={{ backgroundRepeat: 'no-repeat', objectFit: !companie.logo && 'fill' }}
					onError={({ target }) => {
						target.onError = null;
						target.src = '/imgs/defaultImg.svg';
					}}
					image={companie?.logo || '/imgs/defaultImg.svg'}
				/>
			</CardActionArea>
			<CardContent sx={{ textAlign: 'center' }}>
				<Typography component="div" noWrap sx={{ fontWeight: 'bold' }}>
					{companie.razon_social}
				</Typography>

				<Stack direction="row" alignItems="center" justifyContent="center">
					{companie.facebook && (
						<IconButton onClick={() => window.open(companie.facebook, '_blank')}>
							<Facebook
								sx={{
									color: blue[500],
								}}
							/>
						</IconButton>
					)}
					{companie.instagram && (
						<IconButton onClick={() => window.open(companie.instagram, '_blank')}>
							<Instagram
								sx={{
									color: pink[500],
								}}
							/>
						</IconButton>
					)}
					{companie.sitio_web && (
						<IconButton onClick={() => window.open(companie.sitio_web, '_blank')}>
							<Language
								sx={{
									color: grey[700],
								}}
							/>
						</IconButton>
					)}
					{companie.email && (
						<IconButton
							onClick={e => {
								window.location = 'mailto:' + companie.email;
								e.preventDefault();
							}}
							title="support@example.com">
							<Email
								sx={{
									color: blue[500],
								}}
							/>
						</IconButton>
					)}
				</Stack>
			</CardContent>

			{(privilegeEdit || privilegeDelete) && (
				<>
					<Divider />
					<CardActions sx={{ justifyContent: 'end' }}>
						{privilegeEdit && (
							<Tooltip title="Editar informacion">
								<IconButton
									component={Link}
									size="small"
									to={`/main/supplierCompanies/${companie.id_empresa}`}>
									<Edit
										sx={{
											// fontSize: 22,
											color: 'text.icon',
											'&:hover': {
												color: 'warning.light',
											},
										}}
									/>
								</IconButton>
							</Tooltip>
						)}

						{privilegeDelete && (
							<DeleteItem
								deleteAsync={deleteAsync}
								id={companie.id_empresa}
								itemName={companie.razon_social}
							/>
						)}
					</CardActions>
				</>
			)}
		</Card>
	);
}
