import {
	Container,
	Typography,
	TextField,
	InputLabel,
	FormControl,
	Select,
	MenuItem,
	InputAdornment,
	Paper,
	Stack,
	TableRow,
	TableCell,
	Button,
	Card,
	IconButton,
	Grid,
	Snackbar,
	Alert,
} from '@mui/material';
import { Box, style } from '@mui/system';
import { useEffect, useState } from 'react';
import { grey, orange, pink, cyan, green } from '@mui/material/colors';
import { Add, Camera, Delete, Edit, Image } from '@mui/icons-material';
import AddCompanyBranch from '../components/AddCompanyBranch';
import CompanyBranch from '../components/CompanyBranch';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createCompanieAsync } from '../store/companiesSlice';
import * as Yup from 'yup';

function CreateSupplierCompanyPage() {
	const defaultSucursal = {
		nombre: 'Sucursal central',
		direccion: 's/n',
		latitud: 's/n',
		longitud: 's/n',
	};
	const [listSucursal, setListSucursal] = useState([defaultSucursal]);
	const [uploadHover, setUploadHover] = useState(false);
	const [logo, setLogo] = useState(null);
	const [fileLogo, setFileLogo] = useState(null);
	const dispatch = useDispatch();
	const handleChangeLogo = (e) => {
		console.log(e.target.files);
		setFileLogo(e.target.files);
		setLogo(URL.createObjectURL(e.target.files[0]));
	};
	const handleAddSucursal = (sucursal) => {
		setListSucursal([...listSucursal, sucursal]);
	};
	const sayHello = (data) => {
		console.log('HELLOOOOO', data);
	};
	useEffect(() => {
		console.log('SUCURSALES-REG=>', listSucursal);
	}, [listSucursal]);

	const formik = useFormik({
		initialValues: {
			razon_social: '',
			descripcion: '',
			nit: '',
			// categoria: '',
			telefono: '',
			facebook: '',
			instagram: '',
			sitio_web: '',
			email: '',
			// logo: '',
			// id_proveedor: 7,
			// productos:""
		},
		validationSchema: Yup.object().shape({
			razon_social: Yup.string().required('nombre de la empresa es requerido'),
			descripcion: Yup.string().required('Describa su empresa'),
			// categoria: Yup.string().required('Describa su empresa'),
			telefono: Yup.string().required('Es necesario el telefono de su empresa'),
			// logo: Yup.required('Es necesario un logo de la empresa'),
		}),
		onSubmit: (valores, { resetForm }) => {
			console.log('submit');
			dispatch(createCompanieAsync(valores, listSucursal, fileLogo));
			setOpen(true);
			// resetForm();
		},
	});
	const [open, setOpen] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		// Navigate('/reg-task');
	};
	const {
		errors,
		touched,
		values,
		isSubmitting,
		handleSubmit,
		getFieldProps,
		handleChange,
	} = formik;
	return (
		<Container maxWidth="lg">
			<Snackbar
				open={open}
				autoHideDuration={3000}
				// sx={{ background: green[400] }}
				onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity="success"
					sx={{ width: '100%', background: green[400], color: 'white' }}>
					Empresa creado exitosamente
				</Alert>
			</Snackbar>
			<Box>
				<Box>
					<Typography
						variant="h5"
						sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
						Añadir empresa proveedora
					</Typography>
				</Box>
				<FormikProvider value={formik}>
					<Form noValidate onSubmit={handleSubmit}>
						<Grid container spacing={2} sx={{}}>
							<Grid item xs={12} md={6}>
								<Card sx={{ p: 2, borderRadius: 2 }}>
									<Box
										sx={{
											width: '100%',
											minHeight: 210,
											display: 'center',
											justifyContent: 'center',
											alignItems: 'center',
										}}>
										<label htmlFor="contained-button-file">
											<TextField
												type="file"
												required
												multiple
												accept="image/*"
												id="contained-button-file"
												onChange={handleChangeLogo}
												sx={{ display: 'none' }}
												// {...getFieldProps('logo')}
												// error={Boolean(touched.name && errors.name)}
												// helperText={touched.name && errors.name}
											/>
											<Box
												sx={{
													width: 200,
													height: 200,
													border: 1,
													borderStyle: 'dashed',
													borderRadius: '50%',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
												}}>
												<Box
													component="span"
													onMouseOver={() => setUploadHover(true)}
													onMouseLeave={() => setUploadHover(false)}
													sx={{
														width: '90%',
														height: '90%',
														display: 'flex',
														justifyContent: 'center',
														cursor: 'pointer',
														alignItems: 'center',
														borderRadius: '50%',
														position: 'relative',
														background: grey[200],
													}}>
													{logo === null ? (
														<Box
															sx={{
																textAlign: 'center',
															}}>
															<Image></Image>
															<Typography>Subir logo</Typography>
														</Box>
													) : (
														<Box
															component="img"
															src={logo}
															style={{
																width: '100%',
																height: '100%',
																borderRadius: '100%',
																backgroundRepeat: 'no-repeat',
																backgroundSize: 'cover',
																backgroundPosition: 'center',
															}}
															sx={{ zIndex: 'modal' }}></Box>
													)}
													{uploadHover && logo != null ? (
														<Box
															sx={{
																width: '100%',
																height: '100%',
																background: 'rgba(31, 30, 31, 0.3)',

																zIndex: 'tooltip',
																borderRadius: '50%',
																position: 'absolute',
																textAlign: 'center',
																display: 'flex',
																justifyContent: 'center',
																alignItems: 'center',
															}}>
															<Box>
																<Image sx={{ color: 'white' }}></Image>
																<Typography sx={{ color: 'white' }}>
																	Subir logo
																</Typography>
															</Box>
														</Box>
													) : (
														<></>
													)}
												</Box>
											</Box>
										</label>
									</Box>
									<Box sx={{ width: '100%', textAlign: 'center', mt: 1 }}>
										<Typography variant="body2" sx={{ color: grey[700] }}>
											imagenes de 300x200 y formato *.png *.jpg
										</Typography>

										<Typography variant="body2" sx={{ color: grey[700] }}>
											tamaño max. 3 MB
										</Typography>
									</Box>
									<Box sx={{}}>
										<TextField
											required
											variant="outlined"
											label="Razon social"
											placeholder="razon social de la empresa"
											InputProps={{
												style: {
													color: grey[900],
												},
											}}
											sx={{ width: '100%', mt: 2 }}
											{...getFieldProps('razon_social')}
											error={Boolean(
												touched.razon_social && errors.razon_social
											)}
											helperText={touched.razon_social && errors.razon_social}
										/>
										<TextField
											required
											variant="outlined"
											label="Descripcion"
											placeholder="Descripcion"
											InputProps={{
												style: {
													color: grey[900],
												},
											}}
											sx={{ width: '100%', mt: 2 }}
											{...getFieldProps('descripcion')}
											error={Boolean(touched.descripcion && errors.descripcion)}
											helperText={touched.descripcion && errors.descripcion}
										/>
										<TextField
											required
											variant="outlined"
											label="NIT"
											placeholder="nit del negocio"
											InputProps={{
												style: {
													color: grey[900],
												},
											}}
											sx={{ width: '100%', mt: 2 }}
											{...getFieldProps('nit')}
											// error={Boolean(touched.nit && errors.nit)}
											// helperText={touched.nit && errors.nit}
										/>
										<TextField
											required
											variant="outlined"
											label="telefono"
											placeholder="telefono"
											InputProps={{
												style: {
													color: grey[900],
												},
											}}
											sx={{ width: '100%', mt: 2 }}
											{...getFieldProps('telefono')}
											error={Boolean(touched.telefono && errors.telefono)}
											helperText={touched.telefono && errors.telefono}
										/>
										{/* <Box sx={{ mt: 2 }}>
										<Typography sx={{ fontWeight: 'bold' }}>
											Productos
										</Typography>
										<Typography variant="body2">
											Agregue los productos/servicios que ofrece,
										</Typography>
										<TextField
											required
											variant="outlined"
											label="productos"
											autoFocus
											InputProps={{
												style: {
													color: grey[900],
												},
											}}
											sx={{ width: '100%', mt: 2 }}
											{...getFieldProps('descrip_productos')}
											
										/>
									</Box> */}
									</Box>
								</Card>
							</Grid>
							<Grid item xs={12} md={6}>
								{/* segundo panel */}
								<Card
									sx={{
										p: 2,
										borderRadius: 2,
										background: 'white',
										display: 'flex',
										justifyContent: 'space-between',
										flexDirection: 'column',
										direction: 'row',
									}}>
									<Box sx={{}}>
										{/* Agregar sucurusales */}

										<Box>
											<Box>
												<Typography sx={{ fontWeight: 'bold' }}>
													Sucursales
												</Typography>
												<Typography variant="body2">
													Se creo una sucursal por defecto, modifique sus datos
													(direccion, geolocalizacion)
												</Typography>
											</Box>
											<Stack
												direction="column"
												spacing={1}
												sx={{
													alignItems: 'center',
													mt: 1,
													p: 1,
													py: 2,
													borderRadius: 2,
													maxHeight: 250,
													background: grey[100],
													overflowY: 'scroll',
												}}>
												{listSucursal.length != 0 ? (
													listSucursal.map((sucursal) => (
														<CompanyBranch
															sucursal={sucursal}
															key={sucursal.nombre}
															sayHello={sayHello}
														/>
													))
												) : (
													<Typography variant="body2" color="warning.main">
														Es necesario agregar al menos 1 sucursal
													</Typography>
												)}
											</Stack>
											<Box
												sx={{
													width: '100%',
													textAlign: 'end',
													mt: 1,
												}}>
												<AddCompanyBranch
													handleAddSucursal={
														handleAddSucursal
													}></AddCompanyBranch>
											</Box>
										</Box>

										<Box sx={{ width: '100%', mt: 1 }}>
											<Box sx={{}}>
												<Typography sx={{ fontWeight: 'bold' }}>
													Social
												</Typography>
												<TextField
													size="small"
													variant="outlined"
													label="facebook"
													InputProps={{
														style: {
															color: grey[900],
														},
													}}
													sx={{ width: '100%', mt: 1 }}
													{...getFieldProps('facebook')}
												/>
												<TextField
													size="small"
													variant="outlined"
													label="instagram"
													InputProps={{
														style: {
															color: grey[900],
														},
													}}
													sx={{ width: '100%', mt: 2 }}
													{...getFieldProps('instagram')}
												/>
												<TextField
													size="small"
													variant="outlined"
													label="sitio web"
													InputProps={{
														style: {
															color: grey[900],
														},
													}}
													sx={{ width: '100%', mt: 2 }}
													{...getFieldProps('sitio_web')}
												/>
												<TextField
													size="small"
													variant="outlined"
													label="email"
													InputProps={{
														style: {
															color: grey[900],
														},
													}}
													sx={{ width: '100%', mt: 2 }}
													{...getFieldProps('email')}
												/>
												{/* <Stack
											direction="column"
											spacing={1}
											sx={{
												alignItems: 'center',
												mt: 1,
												p: 2,
												background: grey[100],
												borderRadius: 2,
											}}>
											{[1, 2, 3, 4].map((n, index) => (
												<Paper
													key={index}
													sx={{
														display: 'flex',
														alignItems: 'center',
														width: '90%',
														minWidth: 200,
														minHeight: 60,
														background: grey[50],
													}}>
													<Box sx={{ ml: 2 }}>
														<Typography variant="body1">
															NombreSucursal
														</Typography>
														<Typography variant="body2">
															direccion: av.asdasdadasd
														</Typography>
													</Box>
												</Paper>
											))}
										</Stack> */}
											</Box>
										</Box>
									</Box>
									<Box
										sx={{
											display: 'flex',
											width: '100%',
											justifyContent: 'end',
											background: grey[50],
											mt: 2,
										}}>
										<Button size="small">Cancelar</Button>
										<Button
											size="small"
											sx={{ ml: 2 }}
											type="submit"
											variant="contained">
											Crear Empresa
										</Button>
									</Box>
								</Card>
							</Grid>
						</Grid>
					</Form>
				</FormikProvider>
			</Box>
		</Container>
	);
}

export default CreateSupplierCompanyPage;
