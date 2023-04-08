import {
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
	CircularProgress,
} from '@mui/material';
import { FastField, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import CompanyBranch from '../cards/CompanyBranch';
import { useDispatch, useSelector } from 'react-redux';
import {
	createCompanieAsync,
	getProveedores,
	getRubros,
} from '../../store/companiesSlice';
import { green } from '@mui/material/colors';
import UploadImage from '../UploadImage';
import { useNavigate } from 'react-router-dom';
/**
 * Formulario para registar empresas
 * @component CompanieRegisterForm
 * @property {Function} handleSnack llama al componente snackbar (alerta)
 * @exports CompanieRegisterForm
 */
export default function CompanieRegisterForm({ handleSnack }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const { providers, selectRubros } = useSelector(state => state.companies);
	const [fileLogo, setFileLogo] = useState(null);
	/**
	 * Inicializa una sucursal por defecto para cada empresa
	 * @constant defaultBranch
	 */
	const defaultBranch = {
		nombre: 'Sucursal central',
		direccion: 's/n',
		latitud: 's/n',
		longitud: 's/n',
	};
	const [branchs, setBranchs] = useState([defaultBranch]);

	useEffect(() => {
		isAdmin && dispatch(getProveedores(accessToken));
		dispatch(getRubros(accessToken));
	}, []);
	/**
	 * Asigna el archivo logo de empresa proveniente de UploadImage
	 * @function handleChangeFile
	 */
	const handleChangeFile = file => {
		setFileLogo(file);
	};
	/**
	 * Actualiza el arreglo de sucursales añadidos
	 * @function updateListBranchs
	 */
	const updateListBranchs = data => {
		setBranchs(data);
	};
	/**
	 * Creacion y configuracion del formulario el registro de una empresa
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			razon_social: '',
			descripcion: '',
			telefono: '',
			rubro: '',
			nit: '',
			id_proveedor: '',
		},
		validationSchema: Yup.object().shape({
			razon_social: Yup.string().required('Razón social es requerido'),
			descripcion: Yup.string().required('Descripción es requerido'),
			rubro: Yup.string().required('Rubro es requerido'),
			telefono: Yup.string().required('Teléfono/Celular es requerido'),
			id_proveedor: isAdmin && Yup.number().required('Debe asignar al responsable'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Ejecuta el dispatch hacia createCompanieAsync con valores del form para registrar empresa
			 * @function {async} post
			 */
			async function post() {
				return await dispatch(
					createCompanieAsync(accessToken, values, fileLogo, branchs)
				);
			}
			post()
				.then(() => {
					handleSnack('Empresa registrado exitosamente.', 'success');
					setSubmitting(false);
					resetForm();
				})
				.catch(() => {
					handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
					setSubmitting(false);
				});
		},
	});
	const { isSubmitting, handleSubmit } = formik;

	return (
		<>
			<FormikProvider value={formik}>
				<Form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Stack component={Paper} sx={{ p: 2, borderRadius: 2 }} spacing={2}>
								<UploadImage
									label="logo"
									type="Circle"
									handleChangeFile={handleChangeFile}
									id="register-companie"
								/>
								<Typography sx={{ fontWeight: 'bold' }}>Información</Typography>
								<FastField name="razon_social">
									{({ field, form, meta }) => (
										<TextField
											fullWidth
											variant="outlined"
											size="small"
											label="Razón social *"
											placeholder="Razón social de la empresa"
											{...field}
											error={Boolean(meta.touched && meta.error)}
											helperText={meta.touched && meta.error}
										/>
									)}
								</FastField>

								<FastField name="descripcion">
									{({ field, form, meta }) => (
										<TextField
											fullWidth
											variant="outlined"
											label="Descripción  *"
											size="small"
											multiline
											placeholder="Descripción"
											{...field}
											error={Boolean(meta.touched && meta.error)}
											helperText={meta.touched && meta.error}
										/>
									)}
								</FastField>
								<FastField name="telefono">
									{({ field, form, meta }) => (
										<TextField
											fullWidth
											variant="outlined"
											label="Teléfono/Celular  *"
											size="small"
											placeholder="Teléfono/Celular"
											{...field}
											error={Boolean(meta.touched && meta.error)}
											helperText={meta.touched && meta.error}
										/>
									)}
								</FastField>
							</Stack>
						</Grid>
						<Grid item xs={12} md={6}>
							{/* segundo panel */}

							<Stack component={Paper} sx={{ p: 2, borderRadius: 2 }} spacing={2}>
								<FormControl fullWidth size="small">
									<InputLabel id="rubro-label">Rubro *</InputLabel>
									<FastField name="rubro">
										{({ field, form, meta }) => (
											<Select
												labelId="rubro-label"
												id="select-rubro-c"
												input={<OutlinedInput id="select-rubro-c" label="Rubro *" />}
												{...field}
												error={Boolean(meta.touched && meta.errors)}>
												{selectRubros?.map(r => (
													<MenuItem key={r.nombre} value={r.nombre}>
														{r.nombre}
													</MenuItem>
												))}
											</Select>
										)}
									</FastField>
								</FormControl>

								<FastField name="nit">
									{({ field, form, meta }) => (
										<TextField
											fullWidth
											variant="outlined"
											label="NIT"
											size="small"
											placeholder="NIT del negocio"
											{...field}
										/>
									)}
								</FastField>
								{isAdmin && (
									<FormControl fullWidth size="small">
										<InputLabel id="resp-label">Responsable *</InputLabel>
										<FastField name="id_proveedor">
											{({ field, form, meta }) => (
												<Select
													{...field}
													labelId="resp-label"
													id="select-resp-c"
													input={
														<OutlinedInput id="select-resp-c" label="Responsable *" />
													}
													error={Boolean(meta.touched && meta.errors)}>
													{providers?.map(r => (
														<MenuItem key={r.id} value={r.id}>
															{r.nombres} {r.apellidos}
														</MenuItem>
													))}
												</Select>
											)}
										</FastField>
									</FormControl>
								)}
								{/* Agregar sucurusales */}

								<CompanyBranch updateListBranchs={updateListBranchs} />

								<Stack direction="row" spacing={2} justifyContent="end">
									<Button
										onClick={() => {
											navigate(-1);
										}}>
										Cancelar
									</Button>
									<Box sx={{ position: 'relative' }}>
										<Button disabled={isSubmitting} type="submit" variant="contained">
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
								</Stack>
							</Stack>
						</Grid>
					</Grid>
				</Form>
			</FormikProvider>
		</>
	);
}
