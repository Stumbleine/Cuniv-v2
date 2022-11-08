import {
	Box,
	Button,
	Card,
	CircularProgress,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createRubroAsync } from '../../store/rubrosSlice';
import UploadImage from '../UploadImage';
/**
 * Formulario para registar rubros
 * @component RubroAddForm
 * @property {Function} handleSnack llama al componente snackbar (alerta)
 * @exports RubroAddForm
 */
export default function RubroAddForm({ handleSnack }) {
	const [fileImage, setFileImage] = useState(null);
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	/**
	 * Asigna el archivo icono proveniente de <UploadImage/>
	 * @function handleChangeFile
	 */
	const handleChangeFile = file => {
		setFileImage(file);
	};
	/**
	 * Verifica que se haya subido un archivo icono
	 * @function handleChangeFile
	 */
	const validateIcon = values => {
		let errors = {};
		if (fileImage === null) {
			errors.icon = 'Es necesario subir un icono que identifique al rubro.';
		}
		return errors;
	};
	/**
	 * Creacion y configuracion del formulario para crear un rubro
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
		},
		validationSchema: Yup.object().shape({
			nombre: Yup.string().required('Nombre de rubro es requerido.'),
		}),
		validate: validateIcon,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			/**
			 * Ejecuta el dispatch hacia createRubroAsync con valores del form para crear un nuevo link
			 * @function {async} add
			 */
			const add = async () => {
				return await dispatch(createRubroAsync(accessToken, values, fileImage));
			};
			add()
				.then(() => {
					handleSnack('Rubro agregado exitosamente.', 'success');
					resetForm();
				})
				.catch(() => {
					handleSnack('Algo salió, vuelva a intentarlo.', 'error');
					setSubmitting(false);
				});
		},
	});
	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
	return (
		<Card sx={{ p: 2 }}>
			<FormikProvider value={formik}>
				<Form onSubmit={handleSubmit}>
					<Stack spacing={2}>
						<Typography align="center" sx={{ fontWeight: 'bold' }}>
							Registro de rubro
						</Typography>
						<UploadImage label="icono" handleChangeFile={handleChangeFile} type="Circle">
							{errors.icon && (
								<Typography
									textAlign="center"
									sx={{ mt: 1 }}
									color="error"
									variant="caption">
									{errors.icon}
								</Typography>
							)}
						</UploadImage>
						<TextField
							required
							fullWidth
							variant="outlined"
							size="small"
							type="text"
							label="Nombre rubro"
							placeholder="Nombre del rubro"
							{...getFieldProps('nombre')}
							error={Boolean(touched.nombre && errors.nombre)}
							helperText={touched.nombre && errors.nombre}
						/>
						<TextField
							fullWidth
							variant="outlined"
							size="small"
							type="text"
							label="Descripcion"
							placeholder="Descripción"
							{...getFieldProps('descripcion')}
						/>
						<Box sx={{ position: 'relative', py: 1 }}>
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
