import { Edit } from '@mui/icons-material';
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	IconButton,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Tooltip,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updateInfoAsync } from '../../store/companiesSlice';
import { Transition } from '../../Utils/Transitions';

/**
 * Dialogo para asignar otro responsable de empresa
 * @component EditManager
 * @property {Object} data datos del responsable a modificar.
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 * @exports EditManager
 */
export default function EditManager({ data, handleSnack }) {
	const [open, setOpen] = useState(false);
	const { accessToken } = useSelector(state => state.login);
	const dispatch = useDispatch();
	const { providers } = useSelector(state => state.companies);
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
	 * Creacion y configuracion del formulario para asignar otro responsable
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario con los datos actuales del responsable,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		irubroialValues: {
			id_proveedor: data,
		},
		validationSchema: Yup.object().shape({
			id_proveedor: Yup.number().required('Es necesario asingar el responsable'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Ejecuta el dispatch hacia updateInfoAsync con valores del form para asignar id_responsable
			 * @function {async} edit
			 */
			const edit = async () => {
				return await dispatch(updateInfoAsync(accessToken, values));
			};
			edit()
				.then(() => {
					handleSnack('Empresa actualizada exitosamente', 'success');
					resetForm();
					handleClose();
				})
				.catch(() => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
					setSubmitting(false);
					handleClose();
				});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<Tooltip title="Asignar a otro responsable">
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
				<DialogTitle>{'Editar responsable'}</DialogTitle>
				<FormikProvider value={formik}>
					<Form onSubmit={handleSubmit}>
						<DialogContent sx={{ minWidth: 400, pt: 1 }}>
							<FormControl fullWidth size="small">
								<InputLabel id="prv-label">Responsable *</InputLabel>
								<Select
									labelId="prv-label"
									id="select-prv"
									disabled={!providers}
									input={<OutlinedInput id="select-prv" label="Responsable *" />}
									{...getFieldProps('id_proveedor')}
									helperText
									error={Boolean(touched.id_proveedor && errors.id_proveedor)}>
									{providers?.map(r => (
										<MenuItem key={r.id} value={r.id}>
											{r.nombres} {r.apellidos}
										</MenuItem>
									))}
								</Select>
								{!providers && (
									<FormHelperText>No hay proveedores disponibles</FormHelperText>
								)}
							</FormControl>

							<DialogActions sx={{ mt: 2, p: 0 }}>
								<Button onClick={handleClose}>Cancelar</Button>
								<Box sx={{ position: 'relative' }}>
									<Button disabled={isSubmitting} type="submit">
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
						</DialogContent>
					</Form>
				</FormikProvider>
			</Dialog>
		</>
	);
}
