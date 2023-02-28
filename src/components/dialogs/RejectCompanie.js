import { WarningAmber } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { rejectCompanieAsync } from '../../store/companiesSlice';
import { green } from '@mui/material/colors';
import { Transition } from '../../Utils/Transitions';
/**
 * Dialogo de confirmacion para rechazar la afiliación de una empresa
 * @component RejectCompanie
 * @property {Object} companie datos de la empresa.
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 * @property {Function} setReload function para recargar la lista de empresas, cambia el estado reload.
 * @property {Boolean} reload
 *
 * @exports RejectCompanie
 */
export default function RejectCompanie({ companie, handleSnack, setReload, reload }) {
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const { accessToken } = useSelector(state => state.login);

	/**
	 * Cambia el estado open a true (abre el dialogo)
	 * @function handleClickOpen
	 */
	const handleClickOpen = () => {
		setOpen(true);
	};
	/**
	 * Cambia el estado open a false (cierra el dialogo)
	 * @function handleClose
	 */
	const handleClose = () => {
		setOpen(false);
	};
	/**
	 * Creacion y configuracion del formulario para introducir la razon del rechazo
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			id_empresa: companie.id_empresa,
			rejection_reason: '',
		},
		validationSchema: Yup.object().shape({
			rejection_reason: Yup.string().required('Ingrese el motivo del rechazo'),
		}),
		onSubmit: (values, { resetForm }) => {
			/**
			 * Ejecuta el dispatch hacia rejectCompanieAsync con valores del form para rechazar a la empresa
			 * @function {async} update
			 */
			const reject = async () => {
				return await dispatch(rejectCompanieAsync(accessToken, values));
			};
			reject()
				.then(() => {
					handleSnack('Se ha rechazado con exito a la empresa.', 'success');
					setReload(!reload);
					resetForm();
					handleClose();
				})
				.catch(() => {
					handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
					resetForm();
					handleClose();
				});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<Button color="error" onClick={handleClickOpen}>
				Rechazar
			</Button>
			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<DialogTitle>{'Rechazar a ' + companie?.razon_social + '?'}</DialogTitle>
				<FormikProvider value={formik}>
					<Form onSubmit={handleSubmit}>
						<DialogContent sx={{ py: 0 }}>
							<DialogContentText display="flex">
								<WarningAmber color="error" sx={{ mr: 1 }} />
								Esta acción removerá el acceso a beneficios estudiantiles, para la empresa{' '}
								{companie.razon_social} y su responsable.
							</DialogContentText>
							<Typography component="div" sx={{ color: 'warning.main', mt: 2 }}>
								Nota: debe ingresar las razones por cuál se rechaza la solicitud.
							</Typography>
							<TextField
								sx={{ mt: 1 }}
								multiline
								variant="outlined"
								fullWidth
								size="small"
								{...getFieldProps('rejection_reason')}
								error={Boolean(touched.rejection_reason && errors.rejection_reason)}
								helperText={touched.rejection_reason && errors.rejection_reason}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => {
									handleClose();
								}}>
								Cancelar
							</Button>
							<Box sx={{ position: 'relative' }}>
								<Button fullWidth type="submit" color="error" disabled={isSubmitting}>
									Rechazar
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
						</DialogActions>
					</Form>
				</FormikProvider>
			</Dialog>
		</>
	);
}
