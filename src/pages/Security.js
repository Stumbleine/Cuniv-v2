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
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ShowRoles from '../components/ShowRoles';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { green } from '@mui/material/colors';

export default function Security() {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();

	const schema = Yup.object().shape({
		password: Yup.string()
			.required('Contraseña es requerido')
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.)[A-Za-z\d]{8,}$/,
				'Debe contener almenos 8 Caracteres, 1 mayuscula, 1 minuscula, 1 numero'
			),
		new_password: Yup.string()
			.required('Nueva contraseña es requerido')
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.)[A-Za-z\d]{8,}$/,
				'Debe contener almenos 8 Caracteres, 1 mayuscula, 1 minuscula, 1 numero'
			),
		confirm: Yup.string()
			.required('Confirme la contraseña nueva')
			.oneOf([Yup.ref('new_password'), null], 'Las contraseñas deben ser iguales'),
	});
	const formik = useFormik({
		initialValues: {
			password: '',
			new_password: '',
			confirm: '',
		},
		validationSchema: schema,
		onSubmit: async (values, { resetForm }) => {
			const register = async () => {};
			register()
				.then(() => {
					console.log('success');
				})
				.catch(() => {
					console.log('error');
				});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<Container maxWidth="lg">
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
