import { Add } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { green } from '@mui/material/colors';
import { createCashierAsync } from '../../store/cashierSlice';
import { Transition } from '../../Utils/Transitions';

/**
 * Dialogo con formulario para registrar cajeros
 * @component AddCashier
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 * @property {Function } setReload cambia el estado reload
 * @property {Boolean } reload
 *
 * @exports AddCashier
 */
export default function AddCashier({ handleSnack, setReload, reload }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const { user } = useSelector(state => state.user);

	const [open, setOpen] = useState(false);
	/**
	 * Cambia el estado open a true (abre el dialogo)
	 * @function handleClickOpen
	 */
	const handleClickOpen = () => {
		setOpen(true);
	};
	/**
	 * Cambia el estado open a false (cierrra el dialogo)
	 * @function handleClickOpen
	 */
	const handleClose = () => {
		setOpen(false);
	};
	/**
	 * Creacion y configuracion del formulario de registro de cajeros
	 * propiedades:
	 * 	initialValues que inicializa valores del formulario,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			nombres: '',
			apellidos: '',
			email: '',
			cajero_de: user?.companie || null,
		},
		validationSchema: Yup.object().shape({
			nombres: Yup.string()
				.required('Nombres son requeridos')
				.matches(/[A-Za-z]+$/, 'No puede contener caracteres especiales y numeros.'),
			apellidos: Yup.string()
				.required('Apellidos son requeridos')
				.matches(/[A-Za-z]+$/, 'No puede contener caracteres especiales y numeros.'),
			email: Yup.string().email().required('Correo electrónico es requerido.'),
		}),
		enableReinitialize: true,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Ejecuta el dispatch hacia la createCashierAsync con valores del form para registrar el cajero.
			 * @function {async} add
			 */
			const add = async () => {
				await dispatch(createCashierAsync(accessToken, values));
			};
			add()
				.then(r => {
					handleSnack('Cajero creado exitosamente.', 'success');
					setReload(!reload);

					resetForm();
					handleClose();
				})
				.catch(e => {
					handleSnack('Algo salió, vuelva a intentarlo.', 'error');
					setSubmitting(false);
				});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<Button
				sx={{ width: { xs: '100%', sm: 'auto' } }}
				startIcon={<Add />}
				onClick={handleClickOpen}
				variant="outlined">
				Cuenta de cajero
			</Button>

			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<DialogTitle>Añadir cajero</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Stack spacing={2} sx={{ mt: 1 }}>
								<TextField
									fullWidth
									variant="outlined"
									size="small"
									label="Nombres"
									placeholder="nombres"
									{...getFieldProps('nombres')}
									error={Boolean(touched.nombres && errors.nombres)}
									helperText={touched.nombres && errors.nombres}
								/>
								<TextField
									fullWidth
									variant="outlined"
									size="small"
									label="Apellidos"
									placeholder="Titulo de oferta"
									{...getFieldProps('apellidos')}
									error={Boolean(touched.apellidos && errors.apellidos)}
									helperText={touched.apellidos && errors.apellidos}
								/>
								<TextField
									fullWidth
									variant="outlined"
									size="small"
									label="Email"
									placeholder="Correo electrónico"
									{...getFieldProps('email')}
									error={Boolean(touched.email && errors.email)}
									helperText={
										(touched.email && errors.email) ||
										'Asegurese de que el correo sea real y valido'
									}
								/>

								<Typography variant="body2" color="textSecondary">
									Nota: La contraseña se enviará al correo electrónico
								</Typography>
								<DialogActions sx={{ p: 0 }}>
									<Button onClick={handleClose}>Cancelar</Button>
									<Box sx={{ position: 'relative' }}>
										<Button fullWidth type="submit" disabled={isSubmitting}>
											Guardar
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
							</Stack>
						</Form>
					</FormikProvider>
				</DialogContent>
			</Dialog>
		</>
	);
}
