import {
	Typography,
	TextField,
	InputLabel,
	FormControl,
	Select,
	MenuItem,
	InputAdornment,
	Stack,
	Button,
	Card,
	Grid,
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
import API from '../../conection';
import { green } from '@mui/material/colors';
import CheckFrequency from './CheckFrequency';
/**
 * Formulario para registar ofertas
 * @component OfferRegisterForm
 * @property {Function} handleSnack llama al componente snackbar (alerta)
 * @exports OfferRegisterForm
 */
export default function OfferRegisterForm({ handleSnack }) {
	const dispatch = useDispatch();
	const { user, isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const [fileImage, setFileImage] = useState(null);
	const [prdInclude, setPrdInclude] = useState([]);
	const [branchSelected, setBranchSelected] = useState([]);
	const [products, setProducts] = useState(null);
	const [companies, setCompanies] = useState(null);
	const [branchOffices, setBranchOffices] = useState(null);

	useEffect(() => {
		/**
		 * Hace una peticion a las empresas, en caso de ser administrador.
		 * @function {async} fetch
		 */
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

	const theme = useTheme();
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	/**
	 * configuracion de propiedades con estilos para el component MenuItem
	 * @constant MenuProps
	 */
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
	/**
	 * Asigna el archivo imagen proveniente de <UploadImage/>
	 * @function handleChangeFile
	 */
	const handleChangeFile = file => {
		setFileImage(file);
	};
	/**
	 * Actualiza el estado de productos incluidos "prdInclude"
	 * @function handleChange
	 */
	const handleChange = event => {
		const {
			target: { value },
		} = event;
		setPrdInclude(typeof value === 'string' ? value.split(',') : value);
	};
	/**
	 * Actualiza el estado de sucursales disponibles "branchSelected"
	 * @function handleSelectBranch
	 */
	const handleSelectBranch = event => {
		const {
			target: { value },
		} = event;
		setBranchSelected(typeof value === 'string' ? value.split(',') : value);
	};
	/**
	 * Otorga estilos para el item de un Item seleccionado en un componente Select
	 * @function getStyles
	 * @param {String} name
	 * @param {Object} item
	 * @param {Object} theme configuacion del tema MUI
	 */
	function getStyles(name, itemName, theme) {
		return {
			fontWeight:
				itemName.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}
	const [frequency, setFrequency] = useState('unlimited');
	/**
	 * Actualiza el estado frequency, asigna una frecuencia de canje
	 * @function handleFrequency
	 * @param {Object} event evento de Check
	 */
	const handleFrequency = event => {
		setFrequency(event.target.value);
	};

	/**
	 * Creacion y configuracion del formulario para registrar una oferta
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
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
			titulo: Yup.string().required('Título es requerido'),
			fecha_inicio: Yup.string().required('Es requerido'),
			fecha_fin: Yup.string().required('Es requerido'),
			descuento: Yup.string().required('Es requerido'),
			id_empresa: isAdmin
				? Yup.number().required('Es necesario asignar a una empresa')
				: '',
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Realiza el dispatch hacia la peticion createOfferAsync con con los valores del form
			 * @function {async} register
			 */
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
					handleSnack('Oferta agregado exitosamente.', 'success');
					setSubmitting(false);
					resetForm();
				})
				.catch(() => {
					handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
					setSubmitting(false);
				});
		},
	});
	const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;

	useEffect(() => {
		/**
		 * Hace una peticion a productos de la empresa para seleccionar que productos van incluidos
		 * @function {async} fetchProducts
		 */
		async function fetchProducts() {
			const id = isAdmin ? values.id_empresa : user.companie;
			const r = await API.get('select/products?empresa=' + id, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setProducts(r.data);
		}
		/**
		 * Hace una peticion a sucursales de la empresa para seleccionar en cuales esta disponible la oferta
		 * @function {async} fetchBranchs
		 */
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
									label="Título *"
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
										Seleccione sucursales donde estará disponible la oferta.
									</Typography>
									<Typography sx={{ color: 'warning.main', mb: 1 }}>
										Por defecto estará disponible en todas las sucursales.
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
										// disabled={!branchOffices}
										input={<OutlinedInput />}
										renderValue={s => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{s?.map(value => (
													<Chip key={value.id_branch} label={value.name} />
												))}
											</Box>
										)}
										MenuProps={MenuProps}>
										{branchOffices?.map(branch => (
											<MenuItem
												key={branch.id_branch}
												value={branch}
												style={getStyles(branch.name, branchSelected, theme)}>
												{branch.name}
											</MenuItem>
										))}
									</Select>
									{!branchOffices && (
										<Typography color="textSecondary" variant="caption">
											Cargando..
										</Typography>
									)}
								</Box>

								<Box sx={{ width: '100%' }}>
									<Typography sx={{ fontWeight: 'bold' }}>Productos</Typography>
									<InputLabel>Seleccione los productos que incluye la oferta.</InputLabel>
									<Typography sx={{ color: 'warning.main', mb: 1 }}>
										Por defecto se incluirán todos.
									</Typography>
									<Select
										labelId="prd-select-label"
										multiple
										fullWidth
										size="small"
										value={prdInclude}
										onChange={handleChange}
										// disabled={!products}
										input={<OutlinedInput />}
										renderValue={selected => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{selected?.map(value => (
													<Chip key={value.id_product} label={value.name} />
												))}
											</Box>
										)}
										MenuProps={MenuProps}>
										{products?.map(p => (
											<MenuItem
												key={p.id_product}
												value={p}
												style={getStyles(p.name, prdInclude, theme)}>
												{p.name}
											</MenuItem>
										))}
									</Select>
									{!products && (
										<Typography color="textSecondary" variant="caption">
											Cargando... o no tiene productos registrados.
										</Typography>
									)}
								</Box>

								<CheckFrequency handleFrequency={handleFrequency} />
								<CardActions sx={{ justifyContent: 'end', p: 0 }}>
									<Button>Cancelar</Button>
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
