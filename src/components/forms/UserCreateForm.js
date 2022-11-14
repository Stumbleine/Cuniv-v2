import {
	Button,
	Card,
	CircularProgress,
	FormControl,
	FormHelperText,
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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createUserAsync } from '../../store/usersSlice';
import UploadImage from '../UploadImage';
/**
 * Formulario para registar usuarios con rol
 * @component UserCreateForm
 * @property {Function} handleSnack llama al componente snackbar (alerta)
 * @exports UserCreateForm
 */
function UserCreateForm({ handleSnack, isSADM, isADM }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const [fileImage, setFileImage] = useState(null);

	/**
	 * Asigna el archivo imagen proveniente de <UploadImage/>
	 * @function handleChangeFile
	 * @param {File} file
	 */
	const handleChangeFile = file => {
		setFileImage(file);
	};

	/**
	 * Creacion y configuracion del formulario para crear un usuario
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			nombres: '',
			apellidos: '',
			email: '',
			rol: isSADM === true ? '' : 'PRV',
		},
		validationSchema: Yup.object().shape({
			nombres: Yup.string().required('Los nombres son requeridos.'),
			apellidos: Yup.string().required('Los apellidos son requeridos.'),
			email: Yup.string().email().required('Correo electrónico es requerido.'),
			rol: Yup.string().required('Es necesario asginar un rol al usuario.'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Ejecuta el dispatch hacia createUserAsync con valores del form para crear un usario
			 * @function {async} create
			 */
			const create = async () => {
				return await dispatch(createUserAsync(accessToken, values, fileImage));
			};
			create()
				.then(() => {
					handleSnack(
						isSADM ? 'Usuario' : 'Proveedor' + 'creado exitosamente.',
						'success'
					);
					resetForm();
					setFileImage(null);
				})
				.catch(() => {
					handleSnack('Algo salió, vuelva a intentarlo.', 'error');
					setSubmitting(false);
				});
		},
	});
	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Stack component={Card} sx={{ p: 2 }} spacing={2}>
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
						placeholder="Correo electrónico"
						{...getFieldProps('email')}
						error={Boolean(touched.email && errors.email)}
						helperText={touched.email && errors.email}
					/>
					{isSADM && (
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
					)}
					<Typography variant="body2" color="textSecondary">
						Nota: La contraseña se enviara al correo electrónico
					</Typography>
					<Box sx={{ position: 'relative' }}>
						<Button
							color="primary"
							fullWidth
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
			</Form>
		</FormikProvider>
	);
}
export const rols = [
	{ id_rol: 2, rol: 'ADM', label: 'Administrador' },
	{ id_rol: 1, rol: 'PRV', label: 'Proveedor' },
];

export default UserCreateForm;
