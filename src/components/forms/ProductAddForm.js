import {
	Alert,
	Button,
	Card,
	CircularProgress,
	MenuItem,
	Select,
	Slide,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import UploadImage from '../UploadImage';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addProductAsync, companiesAsignAsync } from '../../store/productsSlice';
import API from '../../conection';
import SnackCustom from '../SnackCustom';
import { green } from '@mui/material/colors';

function ProductAddForm() {
	const [fileImage, setFileImage] = useState(null);
	const dispatch = useDispatch();
	const { user, isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const { isLoading } = useSelector(state => state.products);
	const [companies, setCompanies] = useState(null);
	const [snack, setSnack] = useState({
		open: false,
		msg: '',
		severity: 'success',
		redirectPath: null,
	});
	useEffect(() => {
		async function fetch() {
			const r = await API.get('select/companies', {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setCompanies(r.data);
		}
		isAdmin && fetch();
	}, []);

	const handleChangeFile = file => {
		setFileImage(file);
	};
	const closeSnack = () => {
		setSnack({ ...snack, open: false });
	};
	const handleSnack = (msg, sv, path) => {
		setSnack({ ...snack, open: true, msg: msg, severity: sv, redirectPath: path });
	};

	const ProductFormSchema = Yup.object().shape({
		nombre: Yup.string().required('El nombre es necesario'),
		precio: Yup.number().required('El precio es necesario'),
		tipo: Yup.string().required('El tipo es requerido'),
		id_empresa: isAdmin
			? Yup.number().typeError('Debe elegir la empresa').required()
			: '',
	});
	const formik = useFormik({
		initialValues: {
			nombre: '',
			descripcion: '',
			precio: '',
			tipo: 'Producto',
			id_empresa: 'none',
		},
		validationSchema: ProductFormSchema,
		onSubmit: (values, { resetForm }) => {
			const add = async () => {
				const r = await dispatch(addProductAsync(accessToken, values, fileImage));
				console.log('Hola aqui R->Submit', r);

				r
					? handleSnack('Producto agregado exitosamente', 'success')
					: handleSnack('Algo salio, vuelva a intentarlo', 'error');
			};
			add();
		},
	});

	const { errors, touched, handleSubmit, getFieldProps } = formik;

	return (
		<Card sx={{ p: 2 }}>
			<SnackCustom data={snack} closeSnack={closeSnack} />
			<UploadImage label="imagen" handleChangeFile={handleChangeFile} type="Rectangle" />
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Stack spacing={2} sx={{ mt: 2 }}>
						<Typography sx={{ fontWeight: 'bold' }}>Información</Typography>
						<TextField
							required
							variant="outlined"
							size="small"
							label="nombre"
							placeholder="nombre del producto"
							{...getFieldProps('nombre')}
							error={Boolean(touched.nombre && errors.nombre)}
							helperText={touched.nombre && errors.nombre}
						/>
						<TextField
							variant="outlined"
							size="small"
							multiline
							label="descripcion (opcional)"
							placeholder="descripcion"
							{...getFieldProps('descripcion')}
						/>
						<TextField
							required
							variant="outlined"
							size="small"
							label="precio"
							type="number"
							placeholder="precio en Bs."
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
								<MenuItem value="Producto">producto</MenuItem>
								<MenuItem value="Servicio">servicio</MenuItem>
							</Select>
						</Box>
						{isAdmin && (
							<Box>
								<Typography color="textSecondary">
									Especificar la empresa a la que pertenece *
								</Typography>
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
								disabled={isLoading}
								variant="contained">
								Añadir
							</Button>
							{isLoading && (
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

export default ProductAddForm;
