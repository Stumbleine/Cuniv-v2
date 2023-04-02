import { Edit } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	TextField,
} from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../UploadImage';
import { green } from '@mui/material/colors';
import { updateUserAsync } from '../../store/usersSlice';
import { Transition } from '../../Utils/Transitions';
import { isEstudentEmail } from '../../Utils/Validations.js';

/**
 * Dialogo con formulario para editar informacion de un usuario,
 * @component Edituser
 * @property {Object} user datos del usuario a modificar.
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 * @exports Edituser
 */
export default function Edituser({ user, handleSnack, disabled }) {
	// console.log(user);

	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const [open, setOpen] = useState(false);
	const [fileImage, setFileImage] = useState(null);
	/**
	 * Asigna el archivo imagen proveniente de UploadImage
	 * @function handleChangeFile
	 */
	const handleChangeFile = file => {
		setFileImage(file);
	};
	/**
	 * Cambia el estado open a true (abre el dialogo)
	 * @function handleClickOpen
	 */
	const handleClickOpen = () => {
		setOpen(true);
	};
	/**
	 * Cambia el estado open a false (cierra el dialogo)
	 * @function handleClose
	 */
	const handleClose = () => {
		setOpen(false);
	};
	/**
	 * Creacion y configuracion del formulario para editar un usuario
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario con los datos actuales del usuario,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			id: user?.id || '',
			nombres: user?.nombres || '',
			apellidos: user?.apellidos || '',
			email: user?.email || '',
			// rol: '',
		},
		validate: values => {
			let errors = {};
			if (isEstudentEmail(values.email)) {
				errors.email = 'El correo no puede ser de un estudiante';
			}
			return errors;
		},
		validationSchema: Yup.object().shape({
			nombres: Yup.string()
				.required('Los nombres son requeridos.')
				.matches(/[A-Za-z]+$/, 'No puede contener caracteres especiales y numeros.'),
			apellidos: Yup.string()
				.required('Los apellidos son requeridos.')
				.matches(/[A-Za-z]+$/, 'No puede contener caracteres especiales y numeros.'),
			email: Yup.string().email().required('Correo electrónico es requerido.'),
			// rol: Yup.string().required('Es necesario asginar un rol al usuario.'),
		}),
		enableReinitialize: true,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Ejecuta el dispatch hacia updateOfferAsync con valores del form para editar el usuario
			 * @function {async} update
			 */
			const update = async () => {
				return await dispatch(updateUserAsync(accessToken, values, fileImage));
			};
			update()
				.then(r => {
					handleSnack('Usuario actualizado exitosamente.', 'success');
					handleClose();
					resetForm();
				})
				.catch(e => {
					handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
					setSubmitting(false);
				});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<IconButton disabled={disabled} size="small" onClick={handleClickOpen}>
				<Edit
					sx={{
						color: disabled ? '' : 'text.icon',
						'&:hover': {
							color: 'warning.light',
						},
					}}
				/>
			</IconButton>

			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				disableEscapeKeyDown={true}
				TransitionComponent={Transition}>
				<DialogTitle>{'Editar ' + user?.nombres}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Stack spacing={2}>
								<UploadImage
									handleChangeFile={handleChangeFile}
									id="update-user"
									preload={user?.picture}
									label="foto"
									type="Circle"
								/>
								<TextField
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
									fullWidth
									variant="outlined"
									size="small"
									label="Email"
									placeholder="Correo electrónico"
									{...getFieldProps('email')}
									error={Boolean(touched.email && errors.email)}
									helperText={touched.email && errors.email}
								/>

								{/* 
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
								</FormControl> */}

								<DialogActions sx={{ p: 0 }}>
									<Button onClick={handleClose}>Cancelar</Button>
									<Box sx={{ position: 'relative' }}>
										<Button fullWidth type="submit" disabled={isSubmitting}>
											Guardar
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
								</DialogActions>
							</Stack>
						</Form>
					</FormikProvider>
				</DialogContent>
			</Dialog>
		</>
	);
}

// export const rols = [
// 	{ id_rol: 3, rol: 'SADM', label: 'Super Administrador' },
// 	{ id_rol: 2, rol: 'ADM', label: 'Administrador' },
// 	{ id_rol: 1, rol: 'PRV', label: 'Proveedor' },
// 	{ id_rol: 4, rol: 'EST', label: 'Estudiante' },
// 	{ id_rol: 5, rol: 'CJRO', label: 'Cajero' },
// ];
