import { Edit } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../UploadImage';
import { green } from '@mui/material/colors';
import { updateOfferAsync } from '../../store/offersSlice';
import { Transition } from '../../Utils/Transitions';

/**
 * Dialogo con formulario para editar informacion de una oferta,
 * excepto productos incluidos y sucursales disponibles
 * @component EditOffer
 * @property {Object} offer datos de la oferta a modificar.
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 * @property {Array} [companies] lista de empresas para la opcion de reasignar info.
 * @exports EditOffer
 */
export default function EditOffer({ offer, handleSnack, companies }) {
	const sdate = offer.start_date?.split(' ')[0];
	const edate = offer.end_date?.split(' ')[0];
	const dispatch = useDispatch();
	const { isAdmin } = useSelector(state => state.user);
	const [changeCompanie, setCCompanie] = useState(false);

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
	 * Creacion y configuracion del formulario para editar la oferta
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario con los datos actuales de la oferta,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			id_beneficio: offer.id_offer,
			titulo: offer.title || '',
			fecha_inicio: sdate || '',
			fecha_fin: edate || '',
			tipo_descuento: offer.discount_type || 'Porcentual',
			descuento: offer.discount || '',
			condiciones: offer.conditions || '',
			id_empresa: offer.companie.id_empresa || '',
		},
		validationSchema: Yup.object().shape({
			titulo: Yup.string().required('Título de oferta es requerido'),
			fecha_inicio: Yup.string().required('es requerido'),
			fecha_fin: Yup.string().required('es requerido'),
			descuento: Yup.string().required('es requerido'),
		}),
		enableReinitialize: true,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Ejecuta el dispatch hacia updateOfferAsync con valores del form para editar la oferta
			 * @function {async} update
			 */
			const update = async () => {
				return await dispatch(updateOfferAsync(accessToken, values, fileImage));
			};
			update()
				.then(r => {
					handleSnack('Oferta actualizada exitosamente.', 'success');
					resetForm();
					handleClose();
				})
				.catch(e => {
					handleSnack('Algo salió, vuelva a intentarlo.', 'error');
					setSubmitting(false);
					handleClose();
				});
		},
	});
	const { errors, values, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<Tooltip title="Editar informacion">
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
			</Tooltip>

			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<DialogTitle>{'Editar ' + offer?.title}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Stack spacing={2}>
								<UploadImage
									handleChangeFile={handleChangeFile}
									id="update-offer"
									preload={offer?.image}
									label="imagen"
									type="Rectangle"
								/>

								<TextField
									variant="outlined"
									size="small"
									label="Título"
									placeholder="Título de oferta"
									{...getFieldProps('titulo')}
									error={Boolean(touched.titulo && errors.titulo)}
									helperText={touched.titulo && errors.titulo}
								/>
								<TextField
									fullWidth
									variant="outlined"
									label="Descripción/Condiciones"
									multiline
									{...getFieldProps('condiciones')}
									size="small"
								/>
								<Stack spacing={2} direction="row">
									<Box sx={{ width: '50%' }}>
										<InputLabel>Fecha inicio *</InputLabel>
										<TextField
											size="small"
											variant="outlined"
											type="date"
											{...getFieldProps('fecha_inicio')}
											error={Boolean(touched.fecha_inicio && errors.fecha_inicio)}
											helperText={touched.fecha_inicio && errors.fecha_inicio}
											sx={{ width: '100%', mt: 1 }}
										/>
									</Box>

									<Box sx={{ width: '50%' }}>
										<InputLabel>Fecha fin *</InputLabel>
										<TextField
											size="small"
											variant="outlined"
											type="date"
											{...getFieldProps('fecha_fin')}
											error={Boolean(touched.fecha_fin && errors.fecha_fin)}
											helperText={touched.fecha_fin && errors.fecha_fin}
											sx={{ width: '100%', mt: 1 }}
										/>
									</Box>
								</Stack>
								<Stack spacing={1}>
									<InputLabel>Descuento *</InputLabel>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}>
										<FormControl sx={{ width: '35%' }}>
											<Select
												fullWidth
												size="small"
												{...getFieldProps('tipo_descuento')}
												error={Boolean(touched.tipo_descuento && errors.tipo_descuento)}
												inputProps={{ 'aria-label': 'Without label' }}>
												<MenuItem value="Porcentual">Porcentaje</MenuItem>
												<MenuItem value="Monetario">Monto</MenuItem>
												<MenuItem value="Descripcion">Descriptivo</MenuItem>
											</Select>
										</FormControl>
										<TextField
											size="small"
											variant="outlined"
											{...getFieldProps('descuento')}
											placeholder={
												values.tipo_descuento === 'Descripcion' ? 'ejem: lleva 2x1..' : ''
											}
											InputProps={{
												startAdornment:
													values.tipo_descuento === 'Porcentual' ? (
														<InputAdornment position="start">%</InputAdornment>
													) : (
														values.tipo_descuento === 'Monetario' && (
															<InputAdornment position="start">Bs.</InputAdornment>
														)
													),
											}}
											error={Boolean(touched.descuento && errors.descuento)}
											sx={{ width: '65%' }}
										/>
									</Box>
								</Stack>
								{isAdmin && changeCompanie && (
									<FormControl fullWidth size="small">
										<InputLabel id="comp-edit-label">Empresa</InputLabel>
										<Select
											labelId="comp-edit-label"
											label="Empresa"
											fullWidth
											size="small"
											{...getFieldProps('id_empresa')}
											disabled={!companies}
											error={Boolean(touched.id_empresa && errors.id_empresa)}>
											{companies?.map(item => (
												<MenuItem key={item.id_empresa} value={item.id_empresa}>
													{item.razon_social}
												</MenuItem>
											))}
										</Select>
										{!companies && <Typography variant="caption">Cargando.. </Typography>}
									</FormControl>
								)}
								<Stack direction="row" spacing={2} justifyContent="center">
									{isAdmin && !changeCompanie && (
										<Button
											variant="contained"
											size="small"
											onClick={() => {
												setCCompanie(true);
											}}>
											Asignar a otra empresa
										</Button>
									)}
								</Stack>

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
