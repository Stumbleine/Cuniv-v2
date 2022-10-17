import {
	Box,
	Button,
	CircularProgress,
	Container,
	IconButton,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShowRoles from '../components/ShowRoles';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { changePasswordAsync } from '../store/userSlice';
import SnackCustom from '../components/SnackCustom';
/**
 * Pagina para cambiar la contraseña de cuenta de usuario
 * @component Security
 * @exports Security
 */
export default function Security() {
	const { accessToken } = useSelector(state => state.login);

	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const [snack, setSnack] = useState({
		open: false,
		msg: '',
		severity: 'success',
		redirectPath: null,
	});
	/**
	 * Cierra una alerta <SnackCustom/>
	 * @function closeSnack
	 */
	const closeSnack = () => {
		setSnack({ ...snack, open: false });
	};
	/**
	 * Muestra una alerta <SnackCustom/> con su mensaje
	 * @function handleSnack
	 * @param {String} msg mensaje que se mostrara en la alerta
	 * @param {String} sv tipo de severidad/evento afecta al color de la alerta.
	 * @param {String} [path] ruta de redireccion
	 */
	const handleSnack = (msg, sv, path) => {
		setSnack({ ...snack, open: true, msg: msg, severity: sv, redirectPath: path });
	};

	/**
	 * Creacion y configuracion del formulario para cambiar la contraseña
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			password: '',
			new_password: '',
			confirm: '',
		},
		validationSchema: Yup.object().shape({
			password: Yup.string().required('Contraseña es requerido'),

			new_password: Yup.string()
				.required('Nueva contraseña es requerido')
				.matches(
					/^(?=.*[A-Za-z])(?=.*\d)(?=.)[A-Za-z\d]{8,}$/,
					'Debe contener almenos 8 Caracteres, 1 mayuscula, 1 minuscula, 1 numero'
				),
			confirm: Yup.string()
				.required('Confirme la contraseña nueva')
				.oneOf([Yup.ref('new_password'), null], 'Las contraseñas deben ser iguales'),
		}),
		onSubmit: async (values, { resetForm, setSubmitting }) => {
			/**
			 * Realiza dispatch a changePasswordAsync para cambiar contraseña de cuenta
			 * @function {async} fetch
			 */
			const fetch = async () => {
				return await dispatch(changePasswordAsync(accessToken, values));
			};
			fetch()
				.then(() => {
					handleSnack('Contraseña actualziado exitosamente', 'success');
					resetForm();
				})
				.catch(() => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
					setSubmitting(false);
				});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<Container maxWidth="lg">
			<SnackCustom data={snack} closeSnack={closeSnack} />
			<ShowRoles />
			<Box>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						fontWeight: 'bold',
						color: 'text.title',
						fontStyle: 'italic',
					}}>
					Seguridad
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Container maxWidth="sm">
					<FormikProvider value={formik}>
						<Form onSubmit={handleSubmit}>
							<Stack component={Paper} spacing={2} sx={{ p: 2, borderRadius: 2 }}>
								<Box>
									<Typography sx={{ fontWeight: 'bold', mb: 0.5 }}>
										Cambiar contraseña
									</Typography>
									<Typography color="textSecondary" variant="body2">
										Se recomienda usar una contraseña segura que no uses para ningún otro
										sitio.
									</Typography>
								</Box>
								<TextField
									fullWidth
									size="small"
									// autoComplete="current-password"
									type={showPassword ? 'text' : 'password'}
									label="Contraseña actual"
									{...getFieldProps('password')}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													edge="end"
													onClick={() => setShowPassword(prev => !prev)}>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
									error={Boolean(touched.password && errors.password)}
									helperText={touched.password && errors.password}
								/>
								<Typography color="textSecondary" variant="body2">
									Ingrese su nueva contraseña
								</Typography>
								<TextField
									fullWidth
									size="small"
									autoComplete="current-password"
									type={showPassword ? 'text' : 'password'}
									label="Contraseña nueva"
									{...getFieldProps('new_password')}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													edge="end"
													onClick={() => setShowPassword(prev => !prev)}>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
									error={Boolean(touched.new_password && errors.new_password)}
									helperText={touched.new_password && errors.new_password}
								/>
								<TextField
									fullWidth
									size="small"
									// autoComplete="current-password"
									type={showPassword ? 'text' : 'password'}
									label="Confirmar contraseña"
									{...getFieldProps('confirm')}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													edge="end"
													onClick={() => setShowPassword(prev => !prev)}>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
									error={Boolean(touched.confirm && errors.confirm)}
									helperText={touched.confirm && errors.confirm}
								/>
								<Box sx={{ position: 'relative' }}>
									<Button
										color="primary"
										type="submit"
										fullWidth
										disabled={isSubmitting}
										variant="contained">
										Cambiar contraseña
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
							</Stack>
						</Form>
					</FormikProvider>
				</Container>
			</Box>
		</Container>
	);
}
