import {
	Button,
	Card,
	CircularProgress,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Paper,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShowRoles from '../components/ShowRoles';
import { green } from '@mui/material/colors';
import UploadImage from '../components/UploadImage';

export default function EditCompaniePage() {
	const location = useLocation();
	const companie = location.state.data;
	const navigate = useNavigate();
	const [editFile, setEditFile] = useState(false);
	const [fileImage, setFileImage] = useState(null);

	const handleChangeFile = file => {
		setEditFile(true);
		setFileImage(file);
	};
	const formik = useFormik({
		initialValues: {
			razon_social: companie?.razon_social,
			descripcion: companie?.descripcion,
			telefono: companie?.telefono,
			rubro: companie?.rubro,
			nit: companie?.nit,
			facebook: companie?.facebook,
			instagram: companie?.instagram,
			sitio_web: companie?.sitio_web,
			email: companie?.email,
		},
		validationSchema: Yup.object({
			razon_social: Yup.string().required('nombre de la empresa es requerido'),
			descripcion: Yup.string().required('Describa su empresa'),
			rubro: Yup.string().required('Es necesario indicar su rubro'),
			telefono: Yup.string().required('Es necesario el telefono de su empresa'),
		}),
		onSubmit: (values, { resetForm }) => {
			console.log(values);
		},
	});
	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

	return (
		<Container maxWidth="lg">
			<ShowRoles />
			<Box>
				<Box>
					<Typography
						variant="h5"
						sx={{
							mb: 2,
							fontWeight: 'bold',
							color: 'text.title',
							fontStyle: 'italic',
						}}>
						Editar {companie.razon_social}
					</Typography>
				</Box>
				<Paper
					sx={{
						p: 2,
					}}>
					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6}>
									<Stack spacing={2} padding={1}>
										<UploadImage
											handleChangeFile={handleChangeFile}
											id="update-companie"
											preload={companie?.logo}
											label="logo"
											type="Circle"
										/>
										<TextField
											required
											variant="outlined"
											size="small"
											label="Razon social"
											placeholder="nombre de la empresa"
											fullWidth
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
											fullWidth
											{...getFieldProps('descripcion')}
											error={Boolean(touched.descripcion && errors.descripcion)}
											helperText={touched.descripcion && errors.descripcion}
										/>
									</Stack>
								</Grid>
								<Grid item xs={12} md={6}>
									<Stack spacing={2} padding={1} sx={{ height: '100%' }}>
										<TextField
											required
											variant="outlined"
											label="telefono"
											size="small"
											placeholder="telefono"
											fullWidth
											{...getFieldProps('telefono')}
											error={Boolean(touched.telefono && errors.telefono)}
											helperText={touched.telefono && errors.telefono}
										/>

										<FormControl required fullWidth size="small">
											<InputLabel id="rubro-label">rubro</InputLabel>
											<Select
												labelId="rubro-label"
												id="select-rubro-e"
												input={<OutlinedInput id="select-rubro-e" label="rubro" />}
												{...getFieldProps('rubro')}
												error={Boolean(touched.rubro && errors.rubro)}
												// helperText={touched.rubro && errors.rubro}
											>
												<MenuItem value="Restaurant">Restaurant</MenuItem>
												<MenuItem value="Tecnologia">Tecnologia</MenuItem>
												<MenuItem value="Belleza">Belleza</MenuItem>
												<MenuItem value="Entretenimiento">Entretenimiento</MenuItem>
												<MenuItem value="Musica">Musica</MenuItem>

												<MenuItem value="Deporte">Deporte</MenuItem>
											</Select>
										</FormControl>

										<TextField
											size="small"
											variant="outlined"
											label="facebook"
											fullWidth
											{...getFieldProps('facebook')}
										/>
										<TextField
											size="small"
											variant="outlined"
											label="instagram"
											fullWidth
											{...getFieldProps('instagram')}
										/>
										<TextField
											size="small"
											variant="outlined"
											label="sitio web"
											fullWidth
											{...getFieldProps('sitio_web')}
										/>

										<TextField
											size="small"
											variant="outlined"
											label="email"
											fullWidth
											sx={{ flexGrow: 1 }}
											{...getFieldProps('email')}
										/>
										<Stack direction="row" spacing={2} justifyContent="end">
											<Button
												onClick={() => {
													navigate(-1);
												}}>
												Cancelar
											</Button>
											<Box sx={{ position: 'relative' }}>
												<Button type="submit" disabled={isSubmitting} variant="contained">
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
				</Paper>
			</Box>
		</Container>
	);
}
