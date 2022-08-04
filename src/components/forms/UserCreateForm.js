import {
	Button,
	Card,
	CircularProgress,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import UploadImage from '../UploadImage';

function UserCreateForm() {
	const [fileImage, setFileImage] = useState(null);

	const handleChangeFile = file => {
		console.log('file-add-success', file);
		setFileImage(file);
	};
	const formik = useFormik({
		initialValues: {
			nombres: '',
			apellidos: '',
			email: '',
			password: '',
			rule: '',
		},
		validationSchema: Yup.object().shape({
			nombres: Yup.string().required('Los nombres son requeridos.'),
			apellidos: Yup.string().required('Los apellidos son requeridos.'),
			email: Yup.string().email().required('Correo electronico es requerido.'),
			password: Yup.string()
				.required('Contraseña es requerido.')
				.matches(
					/^(?=.*[A-Za-z])(?=.*\d)(?=.)[A-Za-z\d]{8,}$/,
					'Debe contener almenos 8 Caracteres, 1 mayuscula, 1 minuscula, 1 numero'
				),
			rule: Yup.number().required('Es necesario asginar un rol al usuario.'),
		}),
		onSubmit: (values, { resetForm }) => {},
	});
	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Card sx={{ p: 2 }}>
					<Stack spacing={2}>
						<UploadImage label="foto" type="Circle" handleChangeFile={handleChangeFile} />
						<TextField
							required
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
							required
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
							required
							fullWidth
							variant="outlined"
							size="small"
							label="Email"
							placeholder="Correo electronico"
							{...getFieldProps('email')}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
						/>

						<FormControl fullWidth size="small">
							<InputLabel id="role-label">Rol</InputLabel>

							<Select
								labelId="role-label"
								label="Rol"
								fullWidth
								{...getFieldProps('rule')}
								error={Boolean(touched.rule && errors.rule)}
								size="small"
								inputProps={{}}>
								{rules.map(rule => (
									<MenuItem key={rule.id_rule} value={rule.id_rule}>
										{rule.label}
									</MenuItem>
								))}
							</Select>
							<FormHelperText sx={{ color: 'error.main' }}>
								{touched.rule && errors.rule}
							</FormHelperText>
						</FormControl>
						<Typography variant="body2" color="textSecondary">
							Nota: La contraseña se enviara al correo electronico
						</Typography>
						<Box sx={{ position: 'relative' }}>
							<Button
								color="primary"
								/* 						disabled={formik.isSubmitting} */
								fullWidth
								// size="small"
								type="submit"
								disabled={isSubmitting}
								variant="contained">
								Crear Usuario
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
				</Card>
			</Form>
		</FormikProvider>
	);
}
export const rules = [
	{ id_rule: 1, rule: 'PRV', label: 'Proveedor' },
	{ id_rule: 2, rule: 'ADM', label: 'Administrador' },
	{ id_rule: 3, rule: 'SADM', label: 'Super Administrador' },
	{ id_rule: 4, rule: 'EST', label: 'Estudiante' },
	{ id_rule: 5, rule: 'CJR', label: 'Cajero' },
];

export default UserCreateForm;
