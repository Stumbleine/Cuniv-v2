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
import { updateRubroAsync } from '../../store/rubrosSlice';
import { Transition } from '../../Utils/Transitions';
/**
 * Dialogo con formulario para editar un rubro
 * @component EditRubro
 * @property {Object} rubro datos del rubro a modificar.
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 * @exports EditRubro
 */
export default function EditRubro({ rubro, handleSnack }) {
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
	 * Creacion y configuracion del formulario para editar el rubro
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario con los datos actuales del ruvro,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			nombre: rubro.nombre || '',
			descripcion: rubro.descripcion || '',
		},
		validationSchema: Yup.object().shape({
			nombre: Yup.string().required('Nombre de rubro es requerido.'),
		}),
		enableReinitialize: true,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Ejecuta el dispatch hacia updateRubroAsync con valores del form para editar el rubro
			 * @function {async} update
			 */
			const update = async () => {
				return await dispatch(updateRubroAsync(accessToken, values, fileImage));
			};
			update()
				.then(r => {
					handleSnack('Rubro actualizado exitosamente', 'success');
					resetForm();
					handleClose();
				})
				.catch(e => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
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
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
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
									preload={rubro?.icono}
									type="Circle"></UploadImage>
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
