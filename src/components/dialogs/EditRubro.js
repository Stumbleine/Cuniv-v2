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

export default function EditRubro({ rubro, updateAsync }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const { isAdmin } = useSelector(state => state.user);

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
	const validateIcon = () => {
		let errors = {};
		if (fileImage === null) {
			errors.icon = 'Es necesario subir un icono que identifique al rubro.';
		}

		return errors;
	};
	const formik = useFormik({
		initialValues: {
			nombre: '',
			descripcion: '',
			icon: '',
		},
		validationSchema: Yup.object().shape({
			nombre: Yup.string().required('Nombre de rubro es requerido.'),
		}),
		validate: validateIcon,
		enableReinitialize: true,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const sub = async () => {
				updateAsync(values, fileImage);
			};
			sub().then(r => {
				resetForm();
				handleClose();
				setSubmitting(false);
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
				<DialogTitle>{'Editar ' + rubro?.nombre}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Stack spacing={2}>
								<UploadImage
									label="icono"
									id="update-rubro"
									handleChangeFile={handleChangeFile}
									type="Circle">
									{errors.icon && (
										<Typography
											textAlign="center"
											sx={{ mt: 1 }}
											color="error"
											variant="caption">
											{errors.icon}
										</Typography>
									)}
								</UploadImage>
								<TextField
									required
									fullWidth
									variant="outlined"
									size="small"
									type="text"
									label="Nombre rubro"
									placeholder="Nombre del rubro"
									{...getFieldProps('nombre')}
									error={Boolean(touched.nombre && errors.nombre)}
									helperText={touched.nombre && errors.nombre}
								/>
								<TextField
									fullWidth
									variant="outlined"
									size="small"
									type="text"
									label="Descripcion"
									placeholder="Descripcion (opcional)"
									{...getFieldProps('descripcion')}
									// error={Boolean(touched.nombre && errors.nombre)}
									// helperText={touched.nombre && errors.nombre}
								/>
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
