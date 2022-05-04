import {
	Alert,
	Button,
	Card,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Slide,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import UploadImage from '../UploadImage';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addProductAsync } from '../../store/productsSlice';
function TransitionLeft(props) {
	return <Slide {...props} direction="left" />;
}
function ProductAddForm() {
	const [fileImage, setFileImage] = useState(null);
	const [discountType, setdiscountType] = useState(10);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const handlediscountType = (event) => {
		setdiscountType(event.target.value);
	};
	const handleChangeFile = (file) => {
		console.log('file-add-success', file);
		setFileImage(file);
	};

	const ProductFormSchema = Yup.object().shape({
		nombre: Yup.string().required('El nombre es necesario'),
		precio: Yup.number().required('El precio es necesario'),
		tipo: Yup.string().required('El tipo es requerido'),
	});
	const formik = useFormik({
		initialValues: {
			nombre: '',
			descripcion: '',
			precio: '',
			tipo: 'Producto',
		},
		validationSchema: ProductFormSchema,
		onSubmit: (values, { resetForm }) => {
			console.log(values);
			let success = false;

			async function post() {
				success = await dispatch(
					addProductAsync(values, fileImage, user.id_empresa)
				);
				if (success === true) {
					console.log('success_true', success);
					setSetting({
						...setting,
						open: true,
						severity: 'success',
						message: 'La empresa se ha registrado con exito',
					});
				} else {
					console.log('success_false', success);
					setSetting({
						...setting,
						open: true,
						severity: 'error',
						message: 'Hubo un problema al registrar la empresa',
					});
				}
				return success;
			}
			post();
			resetForm();
		},
	});
	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
		formik;

	const [setting, setSetting] = useState({
		open: false,
		message: '',
		variant: '',
	});
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSetting({ ...setting, open: false });
	};

	return (
		<Card sx={{ p: 2 }}>
			<Snackbar
				open={setting.open}
				autoHideDuration={3000}
				TransitionComponent={TransitionLeft}
				onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={setting.severity || 'success'}
					sx={{ width: '100%' }}>
					{setting.message}
				</Alert>
			</Snackbar>
			<UploadImage handleChangeFile={handleChangeFile} formFather="product" />
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Box sx={{ mt: 2 }}>
						<Typography sx={{ fontWeight: 'bold' }}>Información</Typography>

						<TextField
							required
							variant="outlined"
							size="small"
							type="text"
							label="nombre"
							placeholder="nombre del producto"
							sx={{ width: '100%', mt: 2 }}
							{...getFieldProps('nombre')}
							error={Boolean(touched.nombre && errors.nombre)}
							helperText={touched.nombre && errors.nombre}
						/>
						<TextField
							variant="outlined"
							size="small"
							multiline
							type="text"
							label="descripcion (opcional)"
							placeholder="descripcion"
							sx={{ width: '100%', mt: 2 }}
							{...getFieldProps('descripcion')}
						/>
						<TextField
							required
							variant="outlined"
							size="small"
							label="precio"
							type="number"
							placeholder="precio en Bs."
							sx={{ width: '100%', mt: 2 }}
							{...getFieldProps('precio')}
							error={Boolean(touched.precio && errors.precio)}
							helperText={touched.precio && errors.precio}
						/>
						<Box sx={{ mt: 2 }}>
							<Typography color="textSecondary">
								Especificar si es producto o servicio *
							</Typography>
							<Select
								sx={{ width: '100%', mt: 1 }}
								// value={discountType}
								// onChange={handlediscountType}
								type="text"
								size="small"
								inputProps={{ 'aria-label': 'Without label' }}
								{...getFieldProps('tipo')}
								error={Boolean(touched.tipo && errors.tipo)}>
								<MenuItem value="Producto">producto</MenuItem>
								<MenuItem value="Servicio">servicio</MenuItem>
							</Select>
						</Box>
						<Box sx={{ mt: 2 }}>
							<Button fullWidth variant="contained" type="submit">
								Añadir
							</Button>
						</Box>
					</Box>
				</Form>
			</FormikProvider>
		</Card>
	);
}

export default ProductAddForm;
