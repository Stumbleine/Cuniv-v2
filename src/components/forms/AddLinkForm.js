import {
	Button,
	Card,
	CircularProgress,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addSiteASync } from '../../store/umssSlice';
import UploadImage from '../UploadImage';
/**
 * Formulario para registar links importantes de la universidad
 * @component AddLinkForm
 * @property {Function} handleSnack llama al componente snackbar (alerta)
 * @exports AddLinkForm
 */
export default function AddLinkForm({ handleSnack }) {
	const { accessToken } = useSelector(state => state.login);
	const dispatch = useDispatch();
	const [fileImage, setFileImage] = useState(null);
	/**
	 * Asigna el archivo imagen proveniente de <UploadImage/>
	 * @function handleChangeFile
	 * @param {File} file
	 */
	const handleChangeFile = file => {
		setFileImage(file);
	};

	/**
	 * Creacion y configuracion del formulario para añadir un link
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario,
	 * 	validationSchema: especifica la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			url: '',
			priority: '',
		},
		validationSchema: Yup.object().shape({
			title: Yup.string().required('El titulo del sitio es requerido'),
			url: Yup.string().required('URL es requerido'),
			priority: Yup.number().required('Prioridad es requerido'),
		}),
		onSubmit: (values, { resetForm }) => {
			/**
			 * Ejecuta el dispatch hacia addSiteASync con valores del form para crear un nuevo link
			 * @function {async} add
			 */
			const add = async () => {
				return await dispatch(addSiteASync(accessToken, values, fileImage));
			};
			add()
				.then(() => {
					handleSnack('Link agregado exitosamente.', 'success');
					resetForm();
					setFileImage(null);
				})
				.catch(() => {
					handleSnack('Algo salió, vuelva a intentarlo.', 'error');
					resetForm();
				});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<Card>
			<FormikProvider value={formik}>
				<Form onSubmit={handleSubmit}>
					<Stack spacing={2} sx={{ p: 2 }}>
						<Typography align="center" sx={{ fontWeight: 'bold' }}>
							Registro de link
						</Typography>
						<UploadImage
							handleChangeFile={handleChangeFile}
							label="icon del sitio"
							type="Circle"
							id="register-link"
						/>
						<TextField
							variant="outlined"
							size="small"
							label="Título del sitio web *"
							{...getFieldProps('title')}
							error={Boolean(touched.title && errors.title)}
							helperText={touched.title && errors.title}
						/>
						<TextField
							variant="outlined"
							size="small"
							label="Descripción"
							{...getFieldProps('description')}
						/>
						<TextField
							variant="outlined"
							size="small"
							label="Url *"
							{...getFieldProps('url')}
							error={Boolean(touched.url && errors.url)}
							helperText={touched.url && errors.url}
						/>
						<TextField
							variant="outlined"
							size="small"
							type="number"
							label="Prioridad (1-n) *"
							{...getFieldProps('priority')}
							error={Boolean(touched.priority && errors.priority)}
							helperText={touched.priority && errors.priority}
						/>

						<Box sx={{ position: 'relative' }}>
							<Button fullWidth type="submit" disabled={isSubmitting} variant="contained">
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
