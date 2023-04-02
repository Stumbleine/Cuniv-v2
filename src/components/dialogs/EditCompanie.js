import { Edit } from '@mui/icons-material';
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	TextField,
	Tooltip,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import { FastField, Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import UploadImage from '../UploadImage';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfoAsync } from '../../store/companiesSlice';
import { Transition } from '../../Utils/Transitions';

/**
 * Dialogo para editar informacion de una empresa
 * @component EditCompanie
 * @property {Object} companie datos de empresa.
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 *
 * @exports EditCompanie
 */
export default function EditCompanie({ companie, handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const { selectRubros } = useSelector(state => state.companies);

	const [open, setOpen] = useState(false);
	const [fileImage, setFileImage] = useState(null);
	/**
	 * Cambia el estado fileImage asigna el logo recibido del componente UploadImage
	 * @function handleChangeFile
	 * @param {File} file
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
	 * Creacion y configuracion del formulario edicion de empresa
	 * propiedades:
	 * 	initialValues que inicializa valores del formulario con los datos actuales de la empresa,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			razon_social: companie?.razon_social,
			descripcion: companie?.descripcion,
			telefono: companie?.telefono,
			rubro: companie?.rubro,
			nit: companie?.nit,
			id_empresa: companie.id_empresa,
		},
		validationSchema: Yup.object().shape({
			razon_social: Yup.string().required('El titulo del sitio es necesario'),
			descripcion: Yup.string().required('Descripcón es requerido'),
			telefono: Yup.string().required('Teléfono/Celular es requerido'),
		}),
		enableReinitialize: true,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Ejecuta el dispatch hacia updateInfoAsync con valores del form y el logo para editar la empresa
			 * @function {async} edit
			 */
			const edit = async () => {
				return await dispatch(updateInfoAsync(accessToken, values, fileImage));
			};
			edit()
				.then(() => {
					handleSnack('Empresa actualizada exitosamente.', 'success');
					resetForm();
					handleClose();
					setSubmitting(false);
				})
				.catch(() => {
					handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
					setSubmitting(false);
					handleClose();
				});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<Tooltip title="Editar informacion">
				<IconButton size="small" sx={{ ml: 1, p: 0 }} onClick={handleClickOpen}>
					<Edit
						sx={{
							fontSize: 22,
							color: 'text.icon',
							'&:hover': {
								color: 'warning.light',
							},
						}}
					/>
				</IconButton>
			</Tooltip>
			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<DialogTitle>{'Editar ' + companie?.razon_social}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form onSubmit={handleSubmit}>
							<Stack spacing={2}>
								<UploadImage
									handleChangeFile={handleChangeFile}
									id="update-companie-info"
									preload={companie?.logo}
									label="logo"
									type="Circle"
								/>
								<TextField
									variant="outlined"
									size="small"
									label="Razón social *"
									{...getFieldProps('razon_social')}
									error={Boolean(touched.razon_social && errors.razon_social)}
									helperText={touched.razon_social && errors.razon_social}
								/>
								<TextField
									variant="outlined"
									size="small"
									multiline
									label="Descripcion *"
									{...getFieldProps('descripcion')}
									error={Boolean(touched.descripcion && errors.descripcion)}
									helperText={touched.descripcion && errors.descripcion}
								/>
								<TextField
									variant="outlined"
									size="small"
									label="Teléfono *"
									{...getFieldProps('telefono')}
									error={Boolean(touched.telefono && errors.telefono)}
									helperText={touched.telefono && errors.telefono}
								/>
								<TextField
									variant="outlined"
									size="small"
									label="NIT"
									{...getFieldProps('nit')}
									error={Boolean(touched.nit && errors.nit)}
									helperText={touched.nit && errors.nit}
								/>
								<FormControl fullWidth size="small">
									<InputLabel id="rubro-label-e">Rubro</InputLabel>
									<FastField name="rubro">
										{({ field, form, meta }) => (
											<Select
												labelId="rubro-label-e"
												id="select-rubro-e"
												input={<OutlinedInput id="select-rubro-e" label="Rubro" />}
												{...field}
												error={Boolean(meta.touched && meta.errors)}>
												{selectRubros?.map(r => (
													<MenuItem key={r.nombre} value={r.nombre}>
														{r.nombre}
													</MenuItem>
												))}
											</Select>
										)}
									</FastField>
								</FormControl>
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
