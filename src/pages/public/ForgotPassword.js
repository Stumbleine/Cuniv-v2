import React, { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
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
export default function ForgotPassword() {
	const dispatch = useDispatch();
	const { isLoading, isAuthFailed } = useSelector(state => state.login);
	const [forgot, setForgot] = useState(false);
	const [snack, setSnack] = useState({
		open: false,
		msg: '',
		severity: 'success',
		redirectPath: null,
	});
	const closeSnack = () => {
		setSnack({ ...snack, open: false });
	};
	const handleSnack = (msg, sv, path) => {
		setSnack({ ...snack, open: true, msg: msg, severity: sv, redirectPath: path });
	};
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.email(
					'El correo electrónico debe ser una dirección de correo electrónico válida'
				)
				.required('Correo Electronico es requerido'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const fetch = async () => {
				return await dispatch(forgotPassword(values));
			};
			fetch()
				.then(r => {
					setForgot(true);
					handleSnack('Locacion agregado exitosamente', 'success');
					resetForm();
				})
				.catch(r => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
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
								Ingrese el correo electronico asociado con su cuenta de somossansi y
								nosotros enviaremos un correo con las instrucciones para reestablecer su
								contraseña
							</Typography>
						</Box>
						<TextField
							fullWidth
							margin="normal"
							label="Correo Electronico"
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