import { Edit } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	Grid,
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShowRoles from '../components/ShowRoles';
import * as Yup from 'yup';
import { updateAccountAsync } from '../store/userSlice';
import SnackCustom from '../components/SnackCustom';
import { green } from '@mui/material/colors';
import UploadImage from '../components/UploadImage';

export default function AccountProfile() {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const [fileImage, setFileImage] = useState(null);
	const [updateAccount, setUpdateAccount] = useState(false);
	const handleChangeFile = file => {
		setFileImage(file);
	};
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
			email: user?.email,
			nombres: user.nombres,
			apellidos: user.apellidos,
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.email(
					'El correo electrónico debe ser una dirección de correo electrónico válida'
				)
				.required('Correo Electronico es requerido'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			// fileImage!==null && values = {values,picture:fileImage}
			const fetch = async () => {
				return await dispatch(updateAccountAsync(accessToken, values, fileImage));
			};
			fetch()
				.then(r => {
					handleSnack('Locacion agregado exitosamente', 'success');
					resetForm();
				})
				.catch(r => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
					setSubmitting(false);
				});
		},
	});
	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
	return (
		<Container maxWidth="lg">
			<ShowRoles />
			<SnackCustom data={snack} closeSnack={closeSnack} />
			<Box>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						fontWeight: 'bold',
						color: 'text.title',
						fontStyle: 'italic',
					}}>
					Perfil de cuenta
				</Typography>
			</Box>
			<Grid spacing={2} container alignContent="center" justifyContent="center">
				{!updateAccount && (
					<Grid item xs={12} sm={10} md={6}>
						<Stack component={Card} sx={{ p: 2 }} spacing={2}>
							<Box
								sx={{
									width: '100%',
									alignItems: 'center',
									justifyContent: 'center',
									display: 'flex',
									flexDirection: 'column',
									// background: 'pink',
								}}>
								{/* <IconButton></IconButton> */}
								<Avatar
									src={user.picture}
									alt="avatar"
									sx={{ width: 150, height: 150 }}
								/>
								<Typography sx={{ mt: 1, fontWeight: 'bold' }}>{user.nombres}</Typography>
								<Typography sx={{ fontWeight: 'bold' }}>{user.apellidos}</Typography>
								{/* <Typography>{user.email}</Typography> */}
								<Typography color="textSecondary">{user.email}</Typography>
							</Box>
							<Button
								onClick={() => {
									setUpdateAccount(true);
								}}
								color="primary"
								variant="outlined"
								startIcon={<Edit />}>
								Editar
							</Button>
						</Stack>
					</Grid>
				)}

				{updateAccount && (
					<Grid item xs={12} sm={10} md={6}>
						<FormikProvider value={formik}>
							<Form onSubmit={handleSubmit}>
								<Stack spacing={2} component={Card} sx={{ p: 2 }}>
									<UploadImage
										label="foto"
										type="Circle"
										handleChangeFile={handleChangeFile}
										id="update-account"
										preload={user?.picture}
									/>
									<TextField
										required
										fullWidth
										variant="outlined"
										size="small"
										label="Nombres"
										placeholder="nombres"
										{...getFieldProps('nombres')}
										error={Boolean(touched.nombres && errors.nombres)}
										helperText={touched.nombres && errors.nombres}
									/>
									<TextField
										required
										fullWidth
										variant="outlined"
										size="small"
										label="Apellidos"
										placeholder="Titulo de oferta"
										{...getFieldProps('apellidos')}
										error={Boolean(touched.apellidos && errors.apellidos)}
										helperText={touched.apellidos && errors.apellidos}
									/>
									<TextField
										required
										fullWidth
										variant="outlined"
										size="small"
										label="Email"
										placeholder="Correo electronico"
										{...getFieldProps('email')}
										error={Boolean(touched.email && errors.email)}
										helperText={touched.email && errors.email}
									/>

									<Box sx={{ position: 'relative' }}>
										<Button
											color="primary"
											/* 						disabled={formik.isSubmitting} */
											fullWidth
											// size="small"
											type="submit"
											disabled={isSubmitting}
											variant="contained">
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
									<Button
										onClick={() => {
											setUpdateAccount(false);
										}}
										color="primary"
										variant="outlined">
										Cancelar
									</Button>
								</Stack>
							</Form>
						</FormikProvider>
					</Grid>
				)}
			</Grid>
		</Container>
	);
}
