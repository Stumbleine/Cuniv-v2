import React, { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

import AuthLayout from '../../layouts/AuthLayout';
import { Link as RouterLink } from 'react-router-dom';
import {
	Button,
	CircularProgress,
	Container,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import {
	ArrowBack,
	Google,
	Logout,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { cyan, green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setAuth, setAuthFailed } from '../../store/loginSlice';
import { setUser } from '../../store/userSlice';
function LoginPage() {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.users);
	const { isLoading } = useSelector((state) => state.login);
	const [showPassword, setShowPassword] = useState(false);
	const [showlogoutButton, setShowlogoutButton] = useState(false);
	const [showloginButton, setShowloginButton] = useState(true);
	const clientId =
		'147363332194-u205vroo6c09j366f56qc6d7pbkob6q2.apps.googleusercontent.com';
	const onLoginSuccess = (res) => {
		// console.log('Login Success:', res.profileObj);
		setShowloginButton(false);
		setShowlogoutButton(true);
	};

	const onLoginFailure = (res) => {
		console.log('Login Failed:', res);
	};

	// const onSignoutSuccess = () => {
	// 	console.log('You have been logged out successfully');
	// 	setShowloginButton(true);
	// 	setShowlogoutButton(false);
	// };
	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email(
				'El correo electrónico debe ser una dirección de correo electrónico válida'
			)
			.required('Correo Electronico es requerido'),
		password: Yup.string().required('Contraseña es requerido'),
	});
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			remember: true,
		},
		validationSchema: LoginSchema,
		onSubmit: (valuesForm, { resetForm }) => {
			dispatch(setLoading());
			if (valuesForm.password === 'admin123') {
				dispatch(setUser(users[0]));
			} else if (valuesForm.password === 'provider123') {
				dispatch(setUser(users[1]));
			} else if (valuesForm.password === 'cashier123') {
				dispatch(setUser(users[2]));
			}

			setTimeout(function () {
				dispatch(setAuth());
				resetForm();
			}, 5000);
		},
	});
	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
		formik;
	const handleShowPassword = () => {
		setShowPassword((show) => !show);
	};
	return (
		<Container maxWidth="sm">
			<Box>
				<FormikProvider value={formik}>
					<Form onSubmit={handleSubmit}>
						<Box sx={{ my: 3 }}>
							<Typography color="textPrimary" variant="h4">
								Iniciar Sesion
							</Typography>
							<Typography>Ingrese sus datos</Typography>
						</Box>
						<Stack spacing={1}>
							<Box sx={{ display: 'flex', p: 1, background: cyan[50] }}>
								<Typography>adminEmail: </Typography>
								<Typography sx={{ fontWeight: 'bold', mx: 1 }}>
									admin123@gmail.com
								</Typography>
								<Typography>/ password: </Typography>
								<Typography sx={{ fontWeight: 'bold', mx: 1 }}>
									admin123
								</Typography>
							</Box>
							<Box sx={{ display: 'flex', p: 1, background: cyan[50] }}>
								<Typography>providerEmaiil: </Typography>
								<Typography sx={{ fontWeight: 'bold', mx: 1 }}>
									provider123@gmail.com
								</Typography>
								<Typography>/ password: </Typography>
								<Typography sx={{ fontWeight: 'bold', mx: 1 }}>
									provider123
								</Typography>
							</Box>
							<Box sx={{ display: 'flex', p: 1, background: cyan[50] }}>
								<Typography>cashierEmail: </Typography>
								<Typography sx={{ fontWeight: 'bold', mx: 1 }}>
									cashier123@gmail.com
								</Typography>
								<Typography>/ password: </Typography>
								<Typography sx={{ fontWeight: 'bold', mx: 1 }}>
									{' '}
									cashier123
								</Typography>
							</Box>
						</Stack>

						<Box sx={{ py: 2 }}>
							<GoogleLogin
								clientId={clientId}
								buttonText="Sign In"
								onSuccess={onLoginSuccess}
								onFailure={onLoginFailure}
								cookiePolicy={'single_host_origin'}
								isSignedIn={true}
								render={(renderProps) => (
									<Button
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
										fullWidth
										color="error"
										startIcon={<Google />}
										size="large"
										variant="contained">
										Iniciar Sesion con Google
									</Button>
								)}
							/>

							{/* <GoogleLogout
											clientId={clientId}
											buttonText="Sign Out"
											onLogoutSuccess={onSignoutSuccess}
											render={(renderProps) => (
												<Button
													onClick={renderProps.onClick}
													disabled={renderProps.disabled}
													fullWidth
													color="grey"
																									sx={{
													background: grey[200],
													color: grey[800],
													
												}}
													startIcon={<Logout />}
													size="large"
													variant="contained">
													Cerrar Sesion
												</Button>
											)}
										/> */}
						</Box>
						<Box
							sx={{
								mb: 2,
							}}>
							<Typography align="center" color="textSecondary" variant="body1">
								o
							</Typography>
						</Box>
						<Box sx={{ width: '100%' }}>
							<TextField
								fullWidth
								autoComplete="username"
								margin="normal"
								label="Correo Electronico"
								type="email"
								variant="outlined"
								{...getFieldProps('email')}
								error={Boolean(touched.email && errors.email)}
								helperText={touched.email && errors.email}
							/>
							<TextField
								fullWidth
								margin="normal"
								label="Contraseña"
								variant="outlined"
								autoComplete="current-password"
								type={showPassword ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={handleShowPassword}>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
								}}
								{...getFieldProps('password')}
								error={Boolean(touched.password && errors.password)}
								helperText={touched.password && errors.password}
							/>

							<Box sx={{ py: 2, position: 'relative' }}>
								<Button
									color="primary"
									/* 						disabled={formik.isSubmitting} */
									fullWidth
									size="large"
									type="submit"
									disabled={isLoading}
									variant="contained">
									Iniciar Sesion
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
						</Box>
					</Form>
				</FormikProvider>
			</Box>
		</Container>
	);
}

export default LoginPage;
