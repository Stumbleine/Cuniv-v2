import {
	Box,
	Button,
	Card,
	CircularProgress,
	FormHelperText,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import UploadImage from '../UploadImage';

function RubroAddForm() {
	const [fileImage, setFileImage] = useState(null);

	const handleChangeFile = file => {
		console.log('file-add-success', file);
		setFileImage(file);
	};
	const validateIcon = values => {
		let errors = {};
		if (fileImage === null) {
			errors.icon = 'Es necesario subir un icono que identifique al rubro.';
		}

		return errors;
	};
	const formik = useFormik({
		initialValues: {
			nombre: '',
			descripcion: '',
		},
		validationSchema: Yup.object().shape({
			nombre: Yup.string().required('Nombre de rubro es requerido.'),
		}),
		validate: validateIcon,
		onSubmit: (values, { resetForm }) => {
			console.log(values);
		},
	});
	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
	return (
		<Card sx={{ p: 2 }}>
			<FormikProvider value={formik}>
				<Form onSubmit={handleSubmit}>
					<Stack spacing={2}>
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
							placeholder="Descripcion (opcional)"
							{...getFieldProps('descripcion')}
							// error={Boolean(touched.nombre && errors.nombre)}
							// helperText={touched.nombre && errors.nombre}
						/>
						<Box sx={{ position: 'relative', py: 1 }}>
							<Button
								color="primary"
								/* 						disabled={formik.isSubmitting} */
								fullWidth
								size="large"
								type="submit"
								disabled={isSubmitting}
								variant="contained">
								Crear Rol
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

export default RubroAddForm;
