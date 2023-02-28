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
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { editLocationAsync } from '../../store/umssSlice';
import { green } from '@mui/material/colors';
import MapView from '../MapView';
import { Transition } from '../../Utils/Transitions';

/**
 * Dialogo para editar informacion de una locacion
 * @component EditLocation
 * @property {Object} location datos de la locacion a modificar.
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 * @exports EditLocation
 */
export default function EditLocation({ location, handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const [open, setOpen] = useState(false);
	const [position, setPosition] = useState({ lat: location.lat, lng: location.lng });
	/**
	 * Asigna las coordenadas
	 * @function sendPosition
	 * @param {Object} pos coordenadas de Mapas
	 */
	const sendPosition = pos => {
		setPosition(pos);
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
	 * Creacion y configuracion del formulario edicion de una locacion
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario con los datos actuales de la locacion,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 *  validate: valida las coordenadas del mapa
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			name: location.name,
			type: location.type,
			pos: '',
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('Nombre de locacion es necesario'),
			type: Yup.string().required('Especifique el tipo'),
		}),
		validate: () => {
			let errors = {};
			if (position === null) {
				errors.pos = 'Es necesario una ubicacion';
			}
			return errors;
		},
		onSubmit: (values, { resetForm }) => {
			/**
			 * Ejecuta el dispatch hacia editLocationAsync con valores del form  y la locacion para editar la locacion
			 * @function {async} edit
			 */
			const edit = async () => {
				return await dispatch(
					editLocationAsync(accessToken, values, position, location.id)
				);
			};
			edit()
				.then(() => {
					handleSnack('Locacion actualizado exitosamente.', 'success');
					handleClose();
					resetForm();
				})
				.catch(() => {
					handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
					handleClose();
					resetForm();
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
				TransitionComponent={Transition}>
				<DialogTitle>{'Editar ' + location.name}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form onSubmit={handleSubmit}>
							<Stack spacing={2} sx={{ mt: 2 }}>
								<TextField
									variant="outlined"
									size="small"
									label="Nombre de locacion"
									{...getFieldProps('name')}
									error={Boolean(touched.name && errors.name)}
									helperText={touched.name && errors.name}
								/>
								{/* <TextField
									variant="outlined"
									size="small"
									label="Tipo"
									{...getFieldProps('type')}
									error={Boolean(touched.type && errors.type)}
									helperText={touched.type && errors.type}
								/> */}
								<Box>
									<Typography variant="body2" color="textSecondary">
										Especificar el tipo *
									</Typography>
									<Select
										sx={{ width: '100%', mt: 1 }}
										size="small"
										{...getFieldProps('type')}
										error={Boolean(touched.type && errors.type)}>
										<MenuItem value="Biblioteca"> Biblioteca</MenuItem>
										<MenuItem value="Aula">Aula</MenuItem>
										<MenuItem value="Otro">Otro</MenuItem>
									</Select>
									<Typography sx={{ ml: 2 }} variant="caption" color="error">
										{errors.type}
									</Typography>
								</Box>
								<Box sx={{ width: '100%', height: 280, background: 'pink', mt: 1 }}>
									<MapView sendPosition={sendPosition} />
								</Box>

								<TextField
									focused
									variant="outlined"
									size="small"
									value={position ? position.lat + ' , ' + position.lng : ''}
									disabled={true}
									placeholder="Coordenadas"
									error={Boolean(position ? false : errors.pos)}
									helperText={position ? '' : errors.pos}
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
