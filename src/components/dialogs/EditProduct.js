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
	Slide,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../UploadImage';
import { green } from '@mui/material/colors';
import { updateProductAsync } from '../../store/productsSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProduct({ product, companies, handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const { isAdmin } = useSelector(state => state.user);
	const [open, setOpen] = useState(false);
	const [fileImage, setFileImage] = useState(null);

	const handleChangeFile = file => {
		setFileImage(file);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

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
			const update = async () => {
				return await dispatch(updateProductAsync(accessToken, values, fileImage));
			};
			update()
				.then(r => {
					handleSnack('Usuario actualizado exitosamente', 'success');
					resetForm();
					handleClose();
				})
				.catch(e => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
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
										<MenuItem value="producto">producto</MenuItem>
										<MenuItem value="servicio">servicio</MenuItem>
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
