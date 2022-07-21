import {
	Button,
	Card,
	CircularProgress,
	Container,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { amber, green, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import ShowRoles from '../components/ShowRoles';
import StudentCard from '../components/cards/StudentCard';
import * as Yup from 'yup';
import API from '../conection';

function RedeemPage() {
	const [response, setResponse] = useState(null);
	const [redeemError, setRedeemError] = useState(false);
	const [redeemSuccess, setRedeemSuccess] = useState(false);
	useEffect(() => {
		document.title = 'cuniv | cajero';
	}, []);

	const formik = useFormik({
		initialValues: {
			code: '',
		},
		validationSchema: Yup.object().shape({
			code: Yup.string().required('Es necesario introducirse un codigo'),
			// frequencyRedeem: Yup.number().required('Es necesario marcar'),
		}),
		onSubmit: (values, { resetForm }) => {
			const redeem = async () => {
				try {
					const r = await API.post('codigo/redeem', values);
					setResponse(r.data);
					setRedeemSuccess(true);
					setRedeemError(false);
					resetForm();
				} catch (e) {
					setRedeemError(true);
					setRedeemSuccess(false);
					resetForm();
					throw new Error(e);
				}
			};
			redeem();
		},
	});
	const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;

	const codeError = () => {
		return (
			<Box width={1} sx={{ borderRadius: 3, background: red[100], p: 2, mt: 2 }}>
				<Typography color="error" textAlign="center">
					¡El codigo no esta relacionado con sus ofertas, o no existe!
				</Typography>
			</Box>
		);
	};
	const codeErrorRedeemed = () => {
		return (
			<Box width={1} sx={{ borderRadius: 3, background: amber[200], p: 2, mt: 2 }}>
				<Typography color="warning" textAlign="center">
					¡El codigo ya fue canjeado anteriormente!
				</Typography>
				<Typography color="warning" textAlign="center">
					por el estudiante:{' '}
					{response?.student.nombres + ' ' + response?.student.apellidos}
				</Typography>
			</Box>
		);
	};
	return (
		<Container maxWidth="lg">
			<ShowRoles />
			<Box>
				<Box>
					<Typography
						variant="h5"
						sx={{
							mb: 3,
							fontWeight: 'bold',
							color: 'text.title',
							fontStyle: 'italic',
						}}>
						Cajero
					</Typography>
				</Box>
				<Grid container justifyContent="center">
					<Grid item xs={12} md={8}>
						<FormikProvider value={formik}>
							<Form onSubmit={handleSubmit}>
								<Paper sx={{ p: 2 }}>
									<Stack spacing={2}>
										{/* panel resumen */}
										<Typography variant="h6" textAlign="center">
											Formulario de canje
										</Typography>
										<TextField
											label="Codigo"
											size="small"
											placeholder="introduce el codigo de canje"
											maxRows={10}
											{...getFieldProps('code')}
											error={Boolean(touched.code && errors.code)}
											helperText={touched.code && errors.code}
										/>
										<Box sx={{ position: 'relative' }}>
											<Button
												color="primary"
												fullWidth
												type="submit"
												disabled={isSubmitting}
												variant="contained">
												Verificar codigo
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
								</Paper>
								{redeemError
									? codeError()
									: response?.redeemed
									? codeErrorRedeemed(response?.redeemed)
									: redeemSuccess && (
											<Paper sx={{ p: 2, mt: 2 }}>
												<StudentCard data={response} />
											</Paper>
									  )}
							</Form>
						</FormikProvider>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default RedeemPage;
