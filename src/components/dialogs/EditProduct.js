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
import { useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../UploadImage';
import { green } from '@mui/material/colors';
import { updateProductAsync } from '../../store/productsSlice';
import { Transition } from '../../Utils/Transitions';
/**
 * Dialogo con formulario para editar un producto
 * @component EditProduct
 * @property {Object} product datos del producto a modificar.
 * @property {Array} companies lista de empresas para select "Empresa".
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 * @exports EditProduct
 */
export default function EditProduct({ product, companies, handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const { isAdmin } = useSelector(state => state.user);
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
	 * Creacion y configuracion del formulario para editar el producto
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario con los datos actuales del producto,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			id_producto: product?.id_product || '',
			descripcion: product?.description || '',
			nombre: product?.name || '',
			precio: product?.price || '',
			tipo: product.type || '',
			id_empresa: product?.id_companie || '',
		},
		validationSchema: Yup.object().shape({
			nombre: Yup.string().required('El nombre es necesario'),
			precio: Yup.number().required('El precio es necesario'),
			tipo: Yup.string().required('El tipo es requerido'),
			id_empresa: isAdmin
				? Yup.number().typeError('Debe elegir la empresa').required()
				: '',
		}),
		enableReinitialize: true,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Ejecuta el dispatch hacia updateOfferAsync con valores del form para editar el producto
			 * @function {async} update
			 */
			const update = async () => {
				return await dispatch(updateProductAsync(accessToken, values, fileImage));
			};
			update()
				.then(r => {
					handleSnack('Producto actualizado exitosamente.', 'success');
					resetForm();
					setSubmitting(false);
					handleClose();
				})
				.catch(e => {
					handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
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
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<DialogTitle>{'Editar ' + product?.name}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Stack spacing={2}>
								<UploadImage
									handleChangeFile={handleChangeFile}
									id="update-product"
									preload={product?.image}
									label="imagen"
									type="Circle"
								/>
								<TextField
									variant="outlined"
									size="small"
									label="Nombre"
									placeholder="Nombre del producto"
									{...getFieldProps('nombre')}
									error={Boolean(touched.nombre && errors.nombre)}
									helperText={touched.nombre && errors.nombre}
								/>
								<TextField
									variant="outlined"
									size="small"
									multiline
									label="Descripción"
									placeholder="Descripción"
									{...getFieldProps('descripcion')}
								/>
								<TextField
									variant="outlined"
									size="small"
									label="Precio"
									type="number"
									placeholder="Precio en Bs."
									{...getFieldProps('precio')}
									error={Boolean(touched.precio && errors.precio)}
									helperText={touched.precio && errors.precio}
								/>
								<Box>
									<Typography color="textSecondary">
										Especificar si es producto o servicio *
									</Typography>
									<Select
										sx={{ width: '100%', mt: 1 }}
										size="small"
										inputProps={{ 'aria-label': 'Without label' }}
										{...getFieldProps('tipo')}
										error={Boolean(touched.tipo && errors.tipo)}>
										<MenuItem value="producto">Producto</MenuItem>
										<MenuItem value="servicio">Servicio</MenuItem>
									</Select>
								</Box>
								{isAdmin && (
									<Box>
										<Typography color="textSecondary">Especificar el tipo *</Typography>
										<Select
											sx={{ width: '100%', mt: 1 }}
											size="small"
											inputProps={{ 'aria-label': 'Without label' }}
											{...getFieldProps('id_empresa')}
											error={Boolean(touched.id_empresa && errors.id_empresa)}>
											{companies?.map(item => (
												<MenuItem key={item.id_empresa} value={item.id_empresa}>
													{item.razon_social}
												</MenuItem>
											))}
											<MenuItem value="none">None</MenuItem>
										</Select>
										<Typography sx={{ ml: 2 }} variant="caption" color="error">
											{errors.id_empresa}
										</Typography>
									</Box>
								)}
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
