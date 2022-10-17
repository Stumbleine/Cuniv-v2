import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	CircularProgress,
	Typography,
} from '@mui/material';
import { amber, green, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	approveCompanieAsync,
	reconsiderCompanieAsync,
} from '../../store/companiesSlice';
import RejectCompanie from '../dialogs/RejectCompanie';

/**
 * Componente Card para mostrar empresas que solicito ingresar al sistema,
 * y empresas que fueron rechazados. Muestra los datos
 * @summary
 * Tarjeta de empresa No verificada, Rechazada
 *
 * @component Comapanie NV
 * @property {Object} companie datos de la empresa.
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 * @exports CompanieNV
 */

export default function CompanieNV({ companie, handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const [isSubmitting, setSubmitting] = useState(false);
	/**
	 * Function const, que realiza el dispatch hacia la peticion asincrona de aprobacion de empresa,
	 * ejecuta un snackbar verde en caso de exito o rojo en caso de error.
	 *
	 * @function submitApprove
	 */
	const submitApprove = () => {
		setSubmitting(true);
		const approve = async () => {
			await dispatch(approveCompanieAsync(accessToken, companie.id_empresa));
		};
		approve()
			.then(() => {
				handleSnack('Empreesa aprobado exitosamente', 'success');
				setSubmitting(false);
			})
			.catch(() => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
				setSubmitting(false);
			});
	};
	/**
	 * Function const, hace la peticion asincrona para deshacer la decision de rechazo en una empresa,
	 * convierte a la empresa rechazada en una empresa aprobada.
	 * @function submitReconsider
	 */
	const submitReconsider = () => {
		setSubmitting(true);
		const approve = async () => {
			await dispatch(reconsiderCompanieAsync(accessToken, companie.id_empresa));
		};
		approve()
			.then(() => {
				handleSnack('Empresa aprobado exitosamente', 'success');
				setSubmitting(false);
			})
			.catch(() => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
				setSubmitting(false);
			});
	};

	return (
		<Card
			sx={{
				bgcolor: 'background.paper',
				borderRadius: 2,
				opacity: companie.rejected ? 0.6 : 1,
			}}>
			<CardActionArea
				component={Link}
				to={`/main/supplierCompanies/${companie.id_empresa}`}>
				<CardMedia
					component="img"
					height={140}
					sx={{ backgroundRepeat: 'no-repeat', objectFit: !companie.logo && 'fill' }}
					onError={({ target }) => {
						target.onError = null;
						target.src = '/imgs/defaultImg.svg';
					}}
					image={companie?.logo || '/imgs/defaultImg.svg'}
				/>
				<Box
					sx={{
						p: 0.5,
						background: companie.rejected ? red[400] : amber[700],
						borderRadius: 2,
						position: 'absolute',
						top: 10,
						right: 10,
					}}>
					<Typography
						sx={{
							fontWeight: 'bold',
							textTransform: 'uppercase',
							fontSize: 11,
							color: 'white',
							textAlign: 'center',
							px: 1,
						}}>
						{companie.rejected ? 'Rechazado' : 'Pendiente'}
					</Typography>
				</Box>
			</CardActionArea>
			<CardContent sx={{ textAlign: 'start' }}>
				<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
					{companie.razon_social}
				</Typography>
				<Typography variant="body1">{companie.rubro}</Typography>
				<Typography variant="body1" color="textSecondary">
					{companie.email}
				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: 'end' }}>
				{!companie.verified && !companie.rejected ? (
					<>
						<Box sx={{ position: 'relative' }}>
							<Button onClick={submitApprove} fullWidth disabled={isSubmitting}>
								Aprobar
							</Button>
							{isSubmitting && (
								<CircularProgress
									size={24}
									sx={{
										color: green[500],
										position: 'absolute',
										top: '50%',
										left: '50%',
										marginTop: '-12px',
										marginLeft: '-12px',
									}}
								/>
							)}
						</Box>
						<RejectCompanie companie={companie} />
					</>
				) : (
					companie.rejected && (
						<Box sx={{ position: 'relative' }}>
							<Button onClick={submitReconsider} fullWidth disabled={isSubmitting}>
								Reconsiderar
							</Button>
							{isSubmitting && (
								<CircularProgress
									size={24}
									sx={{
										color: green[500],
										position: 'absolute',
										top: '50%',
										left: '50%',
										marginTop: '-12px',
										marginLeft: '-12px',
									}}
								/>
							)}
						</Box>
					)
				)}
			</CardActions>
		</Card>
	);
}
