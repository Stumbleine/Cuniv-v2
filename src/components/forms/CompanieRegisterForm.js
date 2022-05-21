import {
	Autocomplete,
	Box,
	Button,
	Paper,
	Grid,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
	InputLabel,
	OutlinedInput,
	FormControl,
	Snackbar,
	Alert,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import AddCompanyBranch from '../AddCompanyBranch';
import CompanyBranch from '../CompanyBranch';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createCompanieAsync } from '../../store/companiesSlice';
import { grey } from '@mui/material/colors';
import UploadImage from '../UploadImage';

function CompanieRegisterForm() {
	const dispatch = useDispatch();
	const { rule, user, rulepath } = useSelector((state) => state.user);
	const { accessToken } = useSelector((state) => state.login);
	const [open, setOpen] = useState(false);
	const [fileLogo, setFileLogo] = useState(null);
	const defaultSucursal = {
		nombre: 'Sucursal central',
		direccion: 's/n',
		latitud: 's/n',
		longitud: 's/n',
	};
	const [listSucursal, setListSucursal] = useState([defaultSucursal]);

	const PRVSchema = Yup.object().shape({
		razon_social: Yup.string().required('nombre de la empresa es requerido'),
		descripcion: Yup.string().required('Describa su empresa'),
		rubro: Yup.string().required('Es necesario indicar su rubro'),
		telefono: Yup.string().required('Es necesario el telefono de su empresa'),
	});
	const ADMSchema = Yup.object({
		razon_social: Yup.string().required('nombre de la empresa es requerido'),
		descripcion: Yup.string().required('Describa su empresa'),
		rubro: Yup.string().required('Es necesario indicar su rubro'),
		telefono: Yup.string().required('Es necesario el telefono de su empresa'),
	});
	const initialValuesPRV = {
		razon_social: '',
		descripcion: '',
		rubro: '',
		telefono: '',
		nit: '',
		facebook: '',
		instagram: '',
		sitio_web: '',
		email: '',
	};
	const initialValuesADM = {
		razon_social: '',
		descripcion: '',
		telefono: '',
		rubro: '',
		id_proveedor: null,
		nit: '',
		facebook: '',
		instagram: '',
		sitio_web: '',
		email: '',
		productos: [],
	};

	const formik = useFormik({
		initialValues: rule === 'PRV' ? initialValuesPRV : initialValuesADM,
		validationSchema: rule === 'PRV' ? PRVSchema : ADMSchema,

		onSubmit: (valuesForm, { resetForm }) => {
			let success = false;
			async function post() {
				success = await dispatch(
					createCompanieAsync(valuesForm, listSucursal, fileLogo, accessToken)
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
	const handleChangeFile = (file) => {
		console.log('file-add-success', file);
		setFileLogo(file);
	};
	const handleAddSucursal = (sucursal) => {
		console.log('changeSucursal	');
		setListSucursal([...listSucursal, sucursal]);
	};
	const edit = (data, index) => {
		console.log('HELLOOOOO', data, index);
		setListSucursal([
			...listSucursal.slice(0, index),
			data,
			...listSucursal.slice(index + 1, listSucursal.length),
		]);
	};
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
				<Grid container spacing={2} sx={{}}>
					<Grid item xs={12} md={6}>
						<Paper sx={{ p: 2, borderRadius: 2 }}>
							<UploadImage
								label="logo"
								type="Circle"
								handleChangeFile={handleChangeFile}
							/>
							<Box sx={{ mt: 2 }}>
								<Typography sx={{ fontWeight: 'bold' }}>Informacion</Typography>

								<TextField
									required
									variant="outlined"
									size="small"
									label="Razon social"
									placeholder="nombre de la empresa"
									sx={{ width: '100%', mt: 1 }}
									{...getFieldProps('razon_social')}
									error={Boolean(touched.razon_social && errors.razon_social)}
									helperText={touched.razon_social && errors.razon_social}
								/>
								<TextField
									required
									variant="outlined"
									label="Descripcion"
									size="small"
									multiline
									placeholder="Descripcion"
									sx={{ width: '100%', mt: 2 }}
									{...getFieldProps('descripcion')}
									error={Boolean(touched.descripcion && errors.descripcion)}
									helperText={touched.descripcion && errors.descripcion}
								/>

								<TextField
									required
									variant="outlined"
									label="telefono"
									size="small"
									placeholder="telefono"
									sx={{ width: '100%', mt: 2 }}
									{...getFieldProps('telefono')}
									error={Boolean(touched.telefono && errors.telefono)}
									helperText={touched.telefono && errors.telefono}
								/>
								<TextField
									variant="outlined"
									label="NIT (opcional)"
									size="small"
									placeholder="nit del negocio"
									sx={{ width: '100%', mt: 2 }}
									{...getFieldProps('nit')}
								/>
								{rule === 'ADM' ? (
									<>
										<Autocomplete
											disablePortal
											options={proveedores}
											sx={{ width: '100%', mt: 2 }}
											renderInput={(params) => (
												<TextField
													{...params}
													required
													label="Responsable"
													size="small"
												/>
											)}
										/>
									</>
								) : null}
								<Box sx={{ mt: 2 }}>
									{/* <Typography sx={{ fontWeight: 'bold' }}>Rubro</Typography> */}
									<FormControl fullWidth>
										<InputLabel id="rubro-label">rubro</InputLabel>
										<Select
											labelId="rubro-label"
											fullWidth
											id="select-multiple-chip"
											input={
												<OutlinedInput
													id="select-multiple-chip"
													label="rubro"
												/>
											}
											{...getFieldProps('rubro')}
											error={Boolean(touched.rubro && errors.rubro)}
											// helperText={touched.rubro && errors.rubro}
										>
											<MenuItem value="Restaurant">Restaurant</MenuItem>
											<MenuItem value="Tecnologia">Tecnologia</MenuItem>
											<MenuItem value="Belleza">Belleza</MenuItem>
											<MenuItem value="Entretenimiento">
												Entretenimiento
											</MenuItem>
											<MenuItem value="Deporte">Deporte</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6}>
						{/* segundo panel */}
						<Paper
							sx={{
								p: 2,
								borderRadius: 2,
								background: 'white',
							}}>
							<Box sx={{}}>
								{/* Agregar sucurusales */}

								<Box>
									<Box>
										<Typography sx={{ fontWeight: 'bold' }}>
											Sucursales
										</Typography>
										<Typography variant="body2" color="textSecondary">
											Se creo una sucursal por defecto, modifique sus datos
											(direccion, geolocalización) *
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
										{listSucursal.map((sucursal, index) => (
											<CompanyBranch
												sucursal={sucursal}
												key={sucursal.nombre}
												edit={edit}
												index={index}
											/>
										))}
									</Stack>
									<Box
										sx={{
											width: '100%',
											textAlign: 'end',
											mt: 1,
										}}>
										<AddCompanyBranch handleAddSucursal={handleAddSucursal} />
									</Box>
								</Box>
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

								<Box sx={{ width: '100%', mt: 1 }}>
									<Box sx={{}}>
										<Box sx={{ display: 'flex' }}>
											<Typography sx={{ fontWeight: 'bold' }}>
												Social
											</Typography>
											<Typography sx={{ fontWeight: 'none', ml: 1 }}>
												(opcional)
											</Typography>
										</Box>
										<TextField
											size="small"
											variant="outlined"
											label="facebook"
											sx={{ width: '100%', mt: 1 }}
											{...getFieldProps('facebook')}
										/>
										<TextField
											size="small"
											variant="outlined"
											label="instagram"
											sx={{ width: '100%', mt: 2 }}
											{...getFieldProps('instagram')}
										/>
										<TextField
											size="small"
											variant="outlined"
											label="sitio web"
											sx={{ width: '100%', mt: 2 }}
											{...getFieldProps('sitio_web')}
										/>
										<TextField
											size="small"
											variant="outlined"
											label="email"
											sx={{ width: '100%', mt: 2 }}
											{...getFieldProps('email')}
										/>
									</Box>
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									width: '100%',
									justifyContent: 'end',
									mt: 3,
								}}>
								<Button>Cancelar</Button>
								<Button sx={{ ml: 2 }} type="submit" variant="contained">
									Crear Empresa
								</Button>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Form>
		</FormikProvider>
	);
}
export const proveedores = [
	{ label: 'Cristhian Mercado Cespedes', iduser: 2 },
	{ label: 'Natalia Lafourcade', iduser: 2 },
	{ label: 'Aljosha kosntanty ', iduser: 2 },
	{ label: 'Guy Berriman', iduser: 2 },
	{ label: 'William Champion', iduser: 2 },
	{ label: 'Jonny Marck Buckland ', iduser: 2 },
	{ label: 'Carolina londever', iduser: 2 },
];

export default CompanieRegisterForm;
