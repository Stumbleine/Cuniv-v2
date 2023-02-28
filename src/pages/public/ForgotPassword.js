import { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../store/loginSlice';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AlternateEmail, ArrowBack } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import SnackCustom from '../../components/SnackCustom';
/**
 * Pagina donde se puede pedir recuperar la cuenta mediane un correo, al cual se enviara su contraseña
 * @component ForgotPassword
 * @exports ForgotPassword
 */
export default function ForgotPassword() {
	const dispatch = useDispatch();
	const [forgot, setForgot] = useState(false);
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
	 * Creacion y configuracion del formulario para ingresar el correo
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.email('El correo electrónico debe ser una dirección válida')
				.required('Correo electrónico es requerido'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Realiza dispatch a forgotPassword para solicitar una contraseña e instrucciones
			 * @function {async} fetch
			 */
			const fetch = async () => {
				return await dispatch(forgotPassword(values));
			};
			fetch()
				.then(r => {
					setForgot(true);
					handleSnack('Email enviado exitosamente.', 'success');
					resetForm();
				})
				.catch(r => {
					handleSnack('Algo salió mal, vuelva a intentarlo', 'error');
					setSubmitting(false);
				});
		},
	});
	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

	return (
		<Container maxWidth="sm">
			<SnackCustom data={snack} closeSnack={closeSnack} />
			{!forgot ? (
				<FormikProvider value={formik}>
					<Form onSubmit={handleSubmit}>
						<Button component={Link} to="/" startIcon={<ArrowBack></ArrowBack>}>
							Inicio
						</Button>
						<Box sx={{ my: 3 }}>
							<Typography variant="h4">Reestablecer contraseña</Typography>
							<Typography color="textSecondary" sx={{ mt: 1 }}>
								Ingrese el correo electrónico asociado con su cuenta de somossansi y
								nosotros enviaremos un correo con las instrucciones para restablecer su
								contraseña.
							</Typography>
						</Box>
						<TextField
							fullWidth
							margin="normal"
							label="Correo electrónico"
							type="email"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AlternateEmail />
									</InputAdornment>
								),
							}}
							size="medium"
							variant="outlined"
							{...getFieldProps('email')}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
						/>
						<Box sx={{ py: 2, position: 'relative' }}>
							<Button
								color="primary"
								fullWidth
								size="large"
								type="submit"
								disabled={isSubmitting}
								variant="contained">
								Enviar
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
					</Form>
				</FormikProvider>
			) : (
				<Stack spacing={2}>
					<Box>
						<Typography variant="h4">Email enviado</Typography>
						<Typography color="textSecondary" sx={{ mt: 1 }}>
							Revisa tu correo
						</Typography>
					</Box>
					<Box
						component="img"
						src="/svgs/emailsent.svg"
						sx={{ height: 100, width: 'auto' }}
					/>
					<Button
						color="primary"
						fullWidth
						onClick={() => {
							setForgot(false);
						}}
						size="large"
						type="submit"
						variant="contained">
						Reenviar
					</Button>
				</Stack>
			)}
		</Container>
	);
}
