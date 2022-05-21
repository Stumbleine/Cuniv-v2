import {
	Typography,
	TextField,
	InputLabel,
	FormControl,
	Select,
	MenuItem,
	InputAdornment,
	Paper,
	Stack,
	Button,
	Card,
	Grid,
	Snackbar,
	Alert,
	FormControlLabel,
	Checkbox,
	OutlinedInput,
	Chip,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import UploadImage from '../UploadImage';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { createOfferAsync } from '../../store/offersSlice';
import * as Yup from 'yup';

function OfferRegisterForm() {
	const dispatch = useDispatch();
	const [discountType, setdiscountType] = useState(10);
	const products = useSelector((state) => state.products.products);
	const { user, rule } = useSelector((state) => state.user);
	const { sucursales } = useSelector((state) => state.companies);
	const handlediscountType = (event) => {
		setdiscountType(event.target.value);
	};
	const [fileImage, setFileImage] = useState(null);

	const handleChangeFile = (file) => {
		console.log('file-add-success', file);
		setFileImage(file);
	};
	const [prdInclude, setPrdInclude] = useState([]);
	const [checkSucursal, setCheckSucursal] = useState([]);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setPrdInclude(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleCheckSucursal = (event) => {
		const {
			target: { value },
		} = event;
		setCheckSucursal(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};
	useEffect(() => {
		console.log('productos Seleccionados', prdInclude);
		console.log('sucursal Seleccionados', checkSucursal);
	}, [prdInclude, checkSucursal]);
	const theme = useTheme();
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
	function getStyles(name, personName, theme) {
		return {
			fontWeight:
				personName.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}
	const ids = sucursales.map((s) => {
		let array = [];
		array.push(s.id_sucursal.toString());
		return array;
	});

	const formik = useFormik({
		initialValues: {
			titulo: '',
			fecha_inicio: '',
			fecha_fin: '',
			tipo_descuento: '',
			descuento: '',
			condiciones: '',
			sucursales_disp: { ids: ids },
		},
		validationSchema: Yup.object().shape({
			titulo: Yup.string().required('Titulo de oferta es necesario'),
			fecha_inicio: Yup.string().required('es requerido'),
			fecha_fin: Yup.string().required('es requerido'),
			tipo_descuento: Yup.string().required('es requerido'),
			descuento: Yup.string().required('es requerido'),
		}),
		onSubmit: (values, { resetForm }) => {
			console.log(values);
			let success = false;
			async function post() {
				success = await dispatch(
					createOfferAsync(values, fileImage, prdInclude, user.id_empresa, rule)
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
			// resetForm();
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
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Grid container spacing={2} sx={{}}>
					<Snackbar
						open={setting.open}
						autoHideDuration={3000}
						onClose={handleClose}>
						<Alert
							onClose={handleClose}
							severity={setting.severity || 'success'}
							sx={{ width: '100%' }}>
							{setting.message}
						</Alert>
					</Snackbar>
					{/* primer panel(image y titulos) */}
					<Grid item xs={12} md={6} lg={6} sx={{}}>
						<Card sx={{ p: 2 }}>
							<UploadImage
								type="Rectangle"
								label="imagen"
								handleChangeFile={handleChangeFile}
							/>
							{/* datos de la oferta */}
							<Box sx={{ mt: 2 }}>
								<Typography sx={{ fontWeight: 'bold' }}>Información</Typography>
								<TextField
									required
									variant="outlined"
									size="small"
									label="titulo"
									placeholder="Titulo de oferta"
									{...getFieldProps('titulo')}
									error={Boolean(touched.titulo && errors.titulo)}
									helperText={touched.titulo && errors.titulo}
									sx={{ width: '100%', mt: 2 }}
								/>

								<Box
									sx={{
										mt: 2,
										width: '100%',
										display: 'flex',
									}}>
									<Box sx={{ width: '50%', mr: 1 }}>
										<InputLabel>Fecha inicio *</InputLabel>
										<TextField
											required
											size="small"
											variant="outlined"
											type="date"
											{...getFieldProps('fecha_inicio')}
											error={Boolean(
												touched.fecha_inicio && errors.fecha_inicio
											)}
											helperText={touched.fecha_inicio && errors.fecha_inicio}
											sx={{ width: '100%', mt: 1 }}
										/>
									</Box>

									<Box sx={{ width: '50%', ml: 1 }}>
										<InputLabel>Fecha fin *</InputLabel>
										<TextField
											required
											size="small"
											variant="outlined"
											type="date"
											{...getFieldProps('fecha_fin')}
											error={Boolean(touched.fecha_fin && errors.fecha_fin)}
											helperText={touched.fecha_fin && errors.fecha_fin}
											sx={{ width: '100%', mt: 1 }}
										/>
									</Box>
								</Box>
								<Box sx={{ mt: 2, width: '100%' }}>
									<InputLabel>Tipo de descuento *</InputLabel>

									<Box
										sx={{
											display: 'flex',

											justifyContent: 'space-between',
											alignItems: 'center',
											mt: 1,
										}}>
										<FormControl sx={{ width: '35%' }}>
											<Select
												sx={{ width: '100%' }}
												// value={discountType}
												// onChange={handlediscountType}
												{...getFieldProps('tipo_descuento')}
												error={Boolean(
													touched.tipo_descuento && errors.tipo_descuento
												)}
												size="small"
												inputProps={{ 'aria-label': 'Without label' }}>
												<MenuItem value="Porcentual">porcentaje</MenuItem>
												<MenuItem value="Monetario">monto</MenuItem>
												<MenuItem value="Descripcion">descriptivo</MenuItem>
											</Select>
										</FormControl>
										<TextField
											required
											size="small"
											variant="outlined"
											{...getFieldProps('descuento')}
											placeholder={
												discountType === 'Descripcion'
													? 'ejem: lleva 2x1 ..'
													: ''
											}
											InputProps={{
												startAdornment:
													discountType === 'Porcentual' ? (
														<InputAdornment position="start">%</InputAdornment>
													) : discountType === 'Monetario' ? (
														<InputAdornment position="start">
															Bs.
														</InputAdornment>
													) : (
														<></>
													),
											}}
											error={Boolean(touched.descuento && errors.descuento)}
											sx={{ width: '65%' }}
										/>
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>
					{/* segundo panel */}
					<Grid item xs={12} md={6} lg={6}>
						<Card
							sx={{
								p: 2,
								background: 'white',
								display: 'flex',
								justifyContent: 'space-between',
								flexDirection: 'column',
								direction: 'row',
							}}>
							<Box sx={{ display: 'flex' }}>
								<Box sx={{ width: '100%' }}>
									<Box sx={{ width: '100%', mt: 1 }}>
										<TextField
											variant="outlined"
											label="Condiciones de canje (opcional)"
											multiline
											{...getFieldProps('condiciones')}
											size="small"
											sx={{ width: '100%' }}
										/>
									</Box>
									<Box sx={{ mt: 2 }}>
										<Typography fontWeight="bold">Sucursales</Typography>
										<Typography color="textSecondary" sx={{ mb: 1 }}>
											Seleccione las sucursales donde se encuentra disponible la
											oferta
										</Typography>
										<Stack
											direction="column"
											spacing={1}
											sx={{
												alignItems: 'center',
												bgcolor: 'grey.100',
												py: 2,
												borderRadius: 2,
												overflowY: 'scroll',
												height: 200,
											}}>
											{sucursales?.map((n) => (
												<Paper
													key={n.id_sucursal}
													sx={{
														display: 'flex',
														alignItems: 'center',
														width: '90%',
														minWidth: 200,
														minHeight: 60,
														p: 1,
														bgcolor: 'background.paper',
													}}>
													{/* <CheckBox chec sx={{ ml: 1 }} /> */}
													<FormControlLabel
														control={<Checkbox value={n} />}
														sx={{ ml: 1 }}
													/>
													<Box sx={{ ml: 1 }}>
														<Typography variant="body1">{n.nombre}</Typography>
														<Typography variant="body2">
															direccion: {n.direccion}
														</Typography>
													</Box>
												</Paper>
											))}
										</Stack>
									</Box>

									<Box sx={{ width: '100%', mt: 2 }}>
										<Typography sx={{ fontWeight: 'bold' }}>
											Productos
										</Typography>
										<InputLabel sx={{ mb: 1 }}>
											Seleccione los productos que incluye la oferta (opcional)
										</InputLabel>
										<Select
											labelId="prd-select-label"
											multiple
											fullWidth
											size="small"
											value={prdInclude}
											onChange={handleChange}
											input={<OutlinedInput />}
											renderValue={(selected) => (
												<Box
													sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
													{selected.map((value) => (
														<Chip
															key={value.id_producto}
															label={value.nombre}
														/>
													))}
												</Box>
											)}
											MenuProps={MenuProps}>
											{products.map((p) => (
												<MenuItem
													key={p.id_producto}
													value={p}
													style={getStyles(p.nombre, prdInclude, theme)}>
													{p.nombre}
												</MenuItem>
											))}
										</Select>
									</Box>
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									width: '100%',
									justifyContent: 'end',
									mt: 2,
								}}>
								<Button onClick={() => console.log(values)}>Cancelar</Button>
								<Button type="submit" sx={{ ml: 2 }} variant="contained">
									Crear Oferta
								</Button>
							</Box>
						</Card>
					</Grid>
				</Grid>
			</Form>
		</FormikProvider>
	);
}
export const S = [
	{
		nombre: 'Sucursal plaza lyncoln',
		direccion: 'Calle Illapa casi Parque Lyncoln 591, Cbba - Bolivia ',
	},
	{ nombre: 'Sucursal central', direccion: 'Plaza Lyncoln ' },
];
export default OfferRegisterForm;
