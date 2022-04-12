import {
	Button,
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
import { Visibility, VisibilityOff } from '@mui/icons-material';

function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Container maxWidth="sm">
			<Box>
				<Box sx={{ my: 3 }}>
					<Typography color="textPrimary" variant="h4" gutterBottom>
						Registrarse
					</Typography>
					<Typography sx={{ color: 'text.secondary' }}>
						Ingrese sus datos.
					</Typography>
				</Box>
				<Stack spacing={3}>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							sx={{ borderRadius: 2 }}
							fullWidth
							label="Nombres"
							// {...getFieldProps('firstName')}
							// error={Boolean(touched.firstName && errors.firstName)}
							// helperText={touched.firstName && errors.firstName}
						/>

						<TextField
							fullWidth
							label="Apellidos"
							// {...getFieldProps('lastName')}
							// error={Boolean(touched.lastName && errors.lastName)}
							// helperText={touched.lastName && errors.lastName}
						/>
					</Stack>

					<TextField
						sx={{ borderRadius: 2 }}
						fullWidth
						autoComplete="username"
						type="email"
						label="Correo electronico"
						// {...getFieldProps('email')}
						// error={Boolean(touched.email && errors.email)}
						// helperText={touched.email && errors.email}
					/>

					<TextField
						sx={{ borderRadius: 2 }}
						fullWidth
						autoComplete="current-password"
						type={showPassword ? 'text' : 'password'}
						label="Contraseña"
						// {...getFieldProps('password')}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										edge="end"
										onClick={() => setShowPassword((prev) => !prev)}>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
						// error={Boolean(touched.password && errors.password)}
						// helperText={touched.password && errors.password}
					/>
					<TextField
						sx={{ borderRadius: 2 }}
						fullWidth
						autoComplete="current-password"
						type={showPassword ? 'text' : 'password'}
						label="Confirmar contraseña"
						// {...getFieldProps('password')}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										edge="end"
										onClick={() => setShowPassword((prev) => !prev)}>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
						// error={Boolean(touched.password && errors.password)}
						// helperText={touched.password && errors.password}
					/>
					<Button
						color="primary"
						/* 						disabled={formik.isSubmitting} */
						fullWidth
						size="large"
						type="submit"
						variant="contained">
						Registrarse
					</Button>
				</Stack>
			</Box>
		</Container>
	);
}

export default RegisterPage;
