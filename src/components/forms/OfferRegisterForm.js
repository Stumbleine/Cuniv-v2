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
	CardActions,
	CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import UploadImage from '../UploadImage';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { createOfferAsync } from '../../store/offersSlice';
import * as Yup from 'yup';
import SnackCustom from '../SnackCustom';
import API from '../../conection';
import { amber, green } from '@mui/material/colors';
import CheckFrequency from './CheckFrequency';

function OfferRegisterForm() {
	const dispatch = useDispatch();
	const { user, isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const [fileImage, setFileImage] = useState(null);
	const [prdInclude, setPrdInclude] = useState([]);
	const [branchSelected, setBranchSelected] = useState([]);
	const [products, setProducts] = useState(null);
	const [companies, setCompanies] = useState(null);
	const [branchOffices, setBranchOffices] = useState(null);
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
			setBranchOffices(null);
			setProducts(null);
		}

		isAdmin && fetch();
	}, []);

	// useEffect(() => {
	// 	console.log('productos Seleccionados', prdInclude);
	// 	console.log('sucursal Seleccionados', branchSelected);
	// }, [prdInclude, branchSelected]);

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

	const handleChangeFile = file => {
		setFileImage(file);
	};

	const handleChange = event => {
		const {
			target: { value },
		} = event;
		setPrdInclude(typeof value === 'string' ? value.split(',') : value);
	};

	const handleSelectBranch = event => {
		const {
			target: { value },
		} = event;
		setBranchSelected(typeof value === 'string' ? value.split(',') : value);
	};

	function getStyles(name, personName, theme) {
		return {
			fontWeight:
				personName.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}
	const [frequency, setFrequency] = useState('unlimited');

	const handleFrequency = event => {
		setFrequency(event.target.value);
	};

	const closeSnack = () => {
		setSnack({ ...snack, open: false });
	};
	const handleSnack = (msg, sv, path) => {
		setSnack({ ...snack, open: true, msg: msg, severity: sv, redirectPath: path });
	};

	const formik = useFormik({
		initialValues: {
			titulo: '',
			fecha_inicio: '',
			fecha_fin: '',
			tipo_descuento: 'Porcentual',
			descuento: '',
			condiciones: '',
			id_empresa: '',
		},
		validationSchema: Yup.object().shape({
			titulo: Yup.string().required('Titulo de oferta es necesario'),
			fecha_inicio: Yup.string().required('es requerido'),
			fecha_fin: Yup.string().required('es requerido'),
			descuento: Yup.string().required('es requerido'),
			id_empresa: isAdmin ? Yup.number().required('Es necesario asignar la empresa') : '',
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const register = async () => {
				return await dispatch(
					createOfferAsync(
						accessToken,
						values,
						fileImage,
						prdInclude,
						branchSelected,
						frequency
					)
				);
			};
			register()
				.then(() => {
					handleSnack('Oferta agregado exitosamente', 'success');
					setSubmitting(false);
					// resetForm();
				})
				.catch(() => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
					setSubmitting(false);
				});
		},
	});
	const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;
	const [loadingProd, setLoadingProd] = useState(false);
	useEffect(() => {
		console.log('cambios valor');
		async function fetchProducts() {
			setLoadingProd(true);

			const id = isAdmin ? values.id_empresa : user.companie;
			const r = await API.get('select/products?empresa=' + id, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setProducts(r.data);
		}
		async function fetchBranchs() {
			const id = isAdmin ? values.id_empresa : user.companie;

			const r = await API.get('select/sucursales?empresa=' + id, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setBranchOffices(r.data);
		}
		if (!isAdmin) {
			fetchBranchs();
			fetchProducts();
		} else if (isAdmin && values.id_empresa !== 0) {
			fetchBranchs();
			fetchProducts();
		}
	}, [values.id_empresa]);
	return (
		<FormikProvider value={formik}>
			<SnackCustom data={snack} closeSnack={closeSnack} />
			<Form onSubmit={handleSubmit}>
				<Grid container spacing={2} sx={{}}>
					{/* primer panel(image y titulos) */}
					<Grid item xs={12} md={6} lg={6} sx={{}}>
						<Card sx={{ p: 2 }}>
							<UploadImage
								type="Rectangle"
								label="imagen"
								handleChangeFile={handleChangeFile}
							/>
							{/* datos de la oferta */}
							<Typography sx={{ fontWeight: 'bold', mb: 1, mt: 1 }}>
								Información
							</Typography>
							<Stack spacing={2}>
								<TextField
									variant="outlined"
									size="small"
									label="titulo"
									placeholder="Titulo de oferta"
									{...getFieldProps('titulo')}
									error={Boolean(touched.titulo && errors.titulo)}
									helperText={touched.titulo && errors.titulo}
								/>
								<TextField
									fullWidth
									variant="outlined"
									label="Condiciones de canje (opcional)"
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
												<MenuItem value="Porcentual">porcentaje</MenuItem>
												<MenuItem value="Monetario">monto</MenuItem>
												<MenuItem value="Descripcion">descriptivo</MenuItem>
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
							</Stack>
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
							<Stack spacing={2}>
								{isAdmin && (
									<Box>
										<Typography color="textSecondary" sx={{ mb: 1 }}>
											Empresa para el cual es la oferta *
										</Typography>
										<Select
											fullWidth
											size="small"
											{...getFieldProps('id_empresa')}
											placeholder="sas"
											defaultValue={0}
											disabled={!companies}
											error={Boolean(touched.id_empresa && errors.id_empresa)}>
											{companies?.map(item => (
												<MenuItem key={item.id_empresa} value={item.id_empresa}>
													{item.razon_social}
												</MenuItem>
											))}
											{!companies && <MenuItem value={0}>cargando.. </MenuItem>}
										</Select>
										<Typography sx={{ ml: 2 }} variant="caption" color="error">
											{errors.id_empresa}
										</Typography>
									</Box>
								)}
								<Box>
									<Typography fontWeight="bold">Sucursales</Typography>
									<Typography color="textSecondary">
										Seleccione sucursales donde aplica la oferta
									</Typography>
									<Typography sx={{ color: 'warning.main', mb: 1 }}>
										Por defecto se mostrara en todas las sucursales
									</Typography>
									{/* Aqui checks de sucursales */}

									<Select
										labelId="branch-select-label"
										multiple
										defaultValue={{ id: 0, name: 'Todas' }}
										fullWidth
										size="small"
										value={branchSelected}
										onChange={handleSelectBranch}
										disabled={!branchOffices}
										input={<OutlinedInput />}
										renderValue={s => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{s?.map(value => (
													<Chip key={value.id_sucursal} label={value.nombre} />
												))}
											</Box>
										)}
										MenuProps={MenuProps}>
										{branchOffices?.map(branch => (
											<MenuItem
												key={branch.id_sucursal}
												value={branch}
												style={getStyles(branch.nombre, branchSelected, theme)}>
												{branch.nombre}
											</MenuItem>
										))}
									</Select>
									{!branchOffices && (
										<Typography color="textSecondary" variant="caption">
											cargando..
										</Typography>
									)}
								</Box>

								<Box sx={{ width: '100%' }}>
									<Typography sx={{ fontWeight: 'bold' }}>Productos</Typography>
									<InputLabel>
										Seleccione los productos que incluye la oferta (opcional)
									</InputLabel>
									<Typography sx={{ color: 'warning.main', mb: 1 }}>
										Por defecto se incluiran todos
									</Typography>
									<Select
										labelId="prd-select-label"
										multiple
										fullWidth
										size="small"
										value={prdInclude}
										onChange={handleChange}
										disabled={!products}
										input={<OutlinedInput />}
										renderValue={selected => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{selected?.map(value => (
													<Chip key={value.id_producto} label={value.nombre} />
												))}
											</Box>
										)}
										MenuProps={MenuProps}>
										{products?.map(p => (
											<MenuItem
												key={p.id_producto}
												value={p}
												style={getStyles(p.nombre, prdInclude, theme)}>
												{p.nombre}
											</MenuItem>
										))}
									</Select>
									{!products && (
										<Typography color="textSecondary" variant="caption">
											cargando.. o puede no tener registros.
										</Typography>
									)}
								</Box>

								<CheckFrequency handleFrequency={handleFrequency} />
								<CardActions sx={{ justifyContent: 'end', p: 0 }}>
									<Button onClick={() => console.log(values)}>Cancelar</Button>
									<Box sx={{ position: 'relative' }}>
										<Button
											color="primary"
											fullWidth
											type="submit"
											disabled={isSubmitting}
											variant="contained">
											Crear oferta
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
									</Box>{' '}
								</CardActions>
							</Stack>
						</Card>
					</Grid>
				</Grid>
			</Form>
		</FormikProvider>
	);
}
export default OfferRegisterForm;

export const list = [
	{
		id: 1,
		name: 'Sucursal central',
		address: 'Av. Junin y Ayaroa',
	},
	{
		id: 2,
		name: 'Sucursal Km4',
		address: 'Av. Blanco Galindo',
	},
	{
		id: 3,
		name: 'Sucursal Sur',
		address: 'Av. Junin y Ayaroa',
	},
	{
		id: 4,
		name: 'Sucursal Sacaba',
		address: 'Av. Blanco Galindo',
	},
];
/* <Stack
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
										{[
											{
												id_sucursal: 1,
												nombre: 'Sucursal central',
												direccion: 'Av. Junin y Ayaroa',
											},
											{
												id_sucursal: 2,
												nombre: 'Sucursal Km4',
												direccion: 'Av. Blanco Galindo',
											},
										]?.map(n => (
											<Paper
												key={n.id_sucursal}
												sx={{
													display: 'flex',
													alignItems: 'center',
													width: '90%',
													borderRadius: 1,
													minWidth: 200,
													minHeight: 60,
													p: 1,
													bgcolor: 'background.paper',
												}}>
												<FormControlLabel
													control={<Checkbox value={n} />}
													sx={{ ml: 0.5 }}
												/>
												<Box>
													<Typography variant="body1">{n.nombre}</Typography>
													<Typography variant="body2" color="textSecondary">
														direccion: {n.direccion}
													</Typography>
												</Box>
											</Paper>
										))}
									</Stack> */
