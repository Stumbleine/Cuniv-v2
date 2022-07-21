import {
	Button,
	CircularProgress,
	Container,
	IconButton,
	InputAdornment,
	Link,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/system';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { registerAsync } from '../../store/loginSlice';
import { green } from '@mui/material/colors';
import SnackCustom from '../../components/SnackCustom';

function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { isLoading, registerSuccess, registerFailed } = useSelector(
		state => state.login
	);
	const dispatch = useDispatch();
	const schema = Yup.object().shape({
		nombres: Yup.string().required('Nombres son requeridos'),
		apellidos: Yup.string().required('Apellidos son requeridos'),
		email: Yup.string().email('Correo no valido').required('Correo es requerido'),
		password: Yup.string()
			.required('Contraseña es requerido')
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.)[A-Za-z\d]{8,}$/,
				'Debe contener almenos 8 Caracteres, 1 mayuscula, 1 minuscula, 1 numero'
			),
		confirm: Yup.string().oneOf(
			[Yup.ref('password'), null],
			'Las contraseñas deben ser iguales'
		),
	});

	const formik = useFormik({
		initialValues: {
			picture: 'null',
			nombres: '',
			apellidos: '',
			email: '',
			password: '',
			confirm: '',
			rol: 'prv',
		},
		validationSchema: schema,
		onSubmit: async (values, { resetForm }) => {
			const register = async () => {
				const r = await dispatch(registerAsync(values));
				r
					? handleSnack('Registro exitoso, redirigiendo...', 'success', '/login')
					: handleSnack('Algo salio, vuelva a intentarlo', 'error');
			};
			register();
		},
	});
	const { errors, touched, handleSubmit, getFieldProps } = formik;

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
	return (
		<Container maxWidth="sm">
			<Box>
				<Button component={RouterLink} to="/" startIcon={<ArrowBack></ArrowBack>}>
					Inicio
				</Button>
				<Box sx={{ my: 3 }}>
					<Typography color="textPrimary" variant="h4" gutterBottom>
						Registrarse
					</Typography>
					<Typography sx={{ color: 'text.secondary' }}>Ingrese sus datos.</Typography>
				</Box>
				<FormikProvider value={formik}>
					<Form onSubmit={handleSubmit} noValidate>
						<Stack spacing={3}>
							<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
								<TextField
									sx={{ borderRadius: 2 }}
									fullWidth
									label="Nombres"
									{...getFieldProps('nombres')}
									error={Boolean(touched.nombres && errors.nombres)}
									helperText={touched.nombres && errors.nombres}
								/>

								<TextField
									fullWidth
									label="Apellidos"
									{...getFieldProps('apellidos')}
									error={Boolean(touched.apellidos && errors.apellidos)}
									helperText={touched.apellidos && errors.apellidos}
								/>
							</Stack>

							<TextField
								sx={{ borderRadius: 2 }}
								fullWidth
								autoComplete="email"
								type="email"
								label="Correo electronico"
								{...getFieldProps('email')}
								error={Boolean(touched.email && errors.email)}
								helperText={touched.email && errors.email}
							/>

							<TextField
								sx={{ borderRadius: 2 }}
								fullWidth
								autoComplete="current-password"
								type={showPassword ? 'text' : 'password'}
								label="Contraseña"
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
							<TextField
								sx={{ borderRadius: 2 }}
								fullWidth
								autoComplete="current-password"
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

							<Box sx={{ py: 2, position: 'relative' }}>
								<Button
									color="primary"
									fullWidth
									size="large"
									type="submit"
									disabled={isLoading}
									variant="contained">
									Registrarse
								</Button>
								{isLoading && (
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
				<SnackCustom data={snack} closeSnack={closeSnack} />
			</Box>
		</Container>
	);
}

export default RegisterPage;
