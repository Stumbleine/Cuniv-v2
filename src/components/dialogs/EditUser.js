import { Edit } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormHelperText,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Slide,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { edituserAsync } from '../../store/umssSlice';
import UploadImage from '../UploadImage';
import { green } from '@mui/material/colors';
import SnackCustom from '../SnackCustom';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edituser({ user, updateAsync }) {
	// console.log(user)
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const [open, setOpen] = useState(false);
	const [editFile, setEditFile] = useState(false);
	const [fileImage, setFileImage] = useState(null);

	const handleChangeFile = file => {
		setEditFile(true);
		setFileImage(file);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const formik = useFormik({
		initialValues: {
			id: user?.id || '',
			nombres: user?.nombres || '',
			apellidos: user?.apellidos || '',
			email: user?.email || '',
			// rol: '',
		},
		validationSchema: Yup.object().shape({
			nombres: Yup.string().required('Los nombres son requeridos.'),
			apellidos: Yup.string().required('Los apellidos son requeridos.'),
			email: Yup.string().email().required('Correo electronico es requerido.'),
			// rol: Yup.string().required('Es necesario asginar un rol al usuario.'),
		}),
		enableReinitialize: true,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const sub = async () => {
				updateAsync(values, fileImage);
			};
			sub().then(r => {
				resetForm();
				setSubmitting(false);
				handleClose();
			});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<IconButton size="small" onClick={handleClickOpen}>
				<Edit
					sx={{
						color: 'text.icon',
						'&:hover': {
							color: 'warning.light',
						},
					}}
				/>
			</IconButton>

			<Dialog
				PaperProps={{ style: { borderRadius: 2 } }}
				open={open}
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
									placeholder="Correo electronico"
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
