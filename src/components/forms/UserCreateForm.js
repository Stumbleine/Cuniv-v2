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
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createUserAsync } from '../../store/usersSlice';
import SnackCustom from '../SnackCustom';
import UploadImage from '../UploadImage';

function UserCreateForm() {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);

	const [fileImage, setFileImage] = useState(null);

	const handleChangeFile = file => {
		setFileImage(file);
	};
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
			nombres: '',
			apellidos: '',
			email: '',
			rol: '',
		},
		validationSchema: Yup.object().shape({
			nombres: Yup.string().required('Los nombres son requeridos.'),
			apellidos: Yup.string().required('Los apellidos son requeridos.'),
			email: Yup.string().email().required('Correo electronico es requerido.'),
			// password: Yup.string()
			// 	.required('Contraseña es requerido.')
			// 	.matches(
			// 		/^(?=.*[A-Za-z])(?=.*\d)(?=.)[A-Za-z\d]{8,}$/,
			// 		'Debe contener almenos 8 Caracteres, 1 mayuscula, 1 minuscula, 1 numero'
			// 	),
			rol: Yup.string().required('Es necesario asginar un rol al usuario.'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const create = async () => {
				return await dispatch(createUserAsync(accessToken, values, fileImage));
			};
			create()
				.then(() => {
					handleSnack('Link agregado exitosamente', 'success');
					// resetForm();
					// setFileImage(null);
					setSubmitting(false);
				})
				.catch(() => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
					setSubmitting(false);
				});
		},
	});
	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
	return (
		<FormikProvider value={formik}>
			<SnackCustom data={snack} closeSnack={closeSnack} />

			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Card sx={{ p: 2 }}>
					<Stack spacing={2}>
						<UploadImage
							id="create-user"
							label="foto"
							type="Circle"
							handleChangeFile={handleChangeFile}
						/>
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
								{...getFieldProps('rol')}
								error={Boolean(touched.rol && errors.rol)}
								size="small"
								inputProps={{}}>
								{rols.map(rol => (
									<MenuItem key={rol.rol} value={rol.rol}>
										{rol.label}
									</MenuItem>
								))}
							</Select>
							<FormHelperText sx={{ color: 'error.main' }}>
								{touched.rol && errors.rol}
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
export const rols = [
	{ id_rol: 3, rol: 'SADM', label: 'Super Administrador' },
	{ id_rol: 2, rol: 'ADM', label: 'Administrador' },
	{ id_rol: 1, rol: 'PRV', label: 'Proveedor' },
	{ id_rol: 4, rol: 'EST', label: 'Estudiante' },
	{ id_rol: 5, rol: 'CJRO', label: 'Cajero' },
];

export default UserCreateForm;
