import {
	Button,
	Card,
	CircularProgress,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import SnackCustom from '../SnackCustom';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import MapView from '../MapView';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addLocationAsync, addSiteASync } from '../../store/umssSlice';
import UploadImage from '../UploadImage';

export default function AddLinkForm() {
	const [position, setPosition] = useState(null);
	const { accessToken } = useSelector(state => state.login);
	const [fileImage, setFileImage] = useState(null);

	const handleChangeFile = file => {
		console.log('cassd');
		setFileImage(file);
	};
	const dispatch = useDispatch();

	const [snack, setSnack] = useState({
		open: false,
		msg: '',
		severity: 'success',
		redirectPath: null,
	});
	const closeSnack = () => {
		setSnack({ ...snack, open: false });
	};
	const handleSnack = (msg, sv, path) => {
		setSnack({ ...snack, open: true, msg: msg, severity: sv, redirectPath: path });
	};

	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			url: '',
			priority: '',
		},
		validationSchema: Yup.object().shape({
			title: Yup.string().required('El titulo del sitio es necesario'),
			// description: Yup.string().required('El titulo del sitio es necesario'),
			url: Yup.string().required('Especifique el URL'),
			priority: Yup.number().required('Debe introducir una prioridad'),
		}),
		onSubmit: (values, { resetForm }) => {
			console.log('asda');
			const add = async () => {
				return await dispatch(addSiteASync(accessToken, values, fileImage));
			};
			add()
				.then(() => {
					handleSnack('Link agregado exitosamente', 'success');
					resetForm();
					setFileImage(null);
				})
				.catch(() => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
					resetForm();
				});
		},
	});
	const { errors, values, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<Card>
			<SnackCustom data={snack} closeSnack={closeSnack} />

			<FormikProvider value={formik}>
				<Form onSubmit={handleSubmit}>
					<Stack spacing={2} sx={{ p: 2 }}>
						<Typography align="center" sx={{ fontWeight: 'bold' }}>
							Registro de setio web
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
							label="Titulo del sitio web"
							{...getFieldProps('title')}
							error={Boolean(touched.title && errors.title)}
							helperText={touched.title && errors.title}
						/>
						<TextField
							variant="outlined"
							size="small"
							label="Descripcion (opcional)"
							{...getFieldProps('description')}
							// error={Boolean(touched.description && errors.description)}
							// helperText={touched.description && errors.description}
						/>
						<TextField
							variant="outlined"
							size="small"
							label="Url"
							{...getFieldProps('url')}
							error={Boolean(touched.url && errors.url)}
							helperText={touched.url && errors.url}
						/>
						<TextField
							variant="outlined"
							size="small"
							type="number"
							label="Prioridad (1-n)"
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
