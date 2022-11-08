import {
	Button,
	Card,
	CircularProgress,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import UploadImage from '../UploadImage';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addProductAsync } from '../../store/productsSlice';
import { green } from '@mui/material/colors';
/**
 * Formulario para registrar ofertas de una empresa
 * @component ProductAddForm
 * @property {Array} companies Lista de empresas para asignar producto.
 * @property {Function} handleSnack llama al componente snackbar (alerta)
 * @exports ProductAddForm
 */
export default function ProductAddForm({ handleSnack, companies }) {
	const [fileImage, setFileImage] = useState(null);
	const dispatch = useDispatch();
	const { isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	/**
	 * Asigna el archivo imagen proveniente de <UploadImage/>
	 * @function handleChangeFile
	 */
	const handleChangeFile = file => {
		setFileImage(file);
	};
	/**
	 * Creacion y configuracion del formulario para añadir un producto
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario,
	 * 	validationSchema: configura la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			nombre: '',
			descripcion: '',
			precio: '',
			tipo: 'producto',
			id_empresa: 'none',
		},
		validationSchema: Yup.object().shape({
			nombre: Yup.string().required('El nombre es requerido'),
			precio: Yup.number().required('El precio es requerido'),
			tipo: Yup.string().required('El tipo es requerido'),
			id_empresa: isAdmin
				? Yup.number().typeError('Debe asignar a una empresa').required()
				: '',
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Ejecuta el dispatch hacia addProductAsync con valores del form para añadir un producto
			 * @function {async} add
			 */
			const add = async () => {
				return await dispatch(addProductAsync(accessToken, values, fileImage));
			};
			add()
				.then(() => {
					handleSnack('Producto agregado exitosamente.', 'success');
					resetForm();
				})
				.catch(() => {
					handleSnack('Algo salió, vuelva a intentarlo.', 'error');
					setSubmitting(false);
				});
		},
	});

	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<Card sx={{ p: 2 }}>
			<UploadImage label="imagen" handleChangeFile={handleChangeFile} type="Rectangle" />
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Stack spacing={2} sx={{ mt: 2 }}>
						<Typography sx={{ fontWeight: 'bold' }}>Información</Typography>
						<TextField
							required
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
							required
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
							<Typography color="textSecondary">Especificar el tipo *</Typography>
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
								<Typography color="textSecondary">Asignar a una empresa *</Typography>
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

						<Box sx={{ position: 'relative' }}>
							<Button
								color="primary"
								fullWidth
								type="submit"
								disabled={isSubmitting}
								variant="contained">
								Añadir
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
		</Card>
	);
}
