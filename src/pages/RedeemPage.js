import {
	Avatar,
	Button,
	Card,
	CircularProgress,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemIcon,
	ListItemText,
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
import { Link } from 'react-router-dom';
import { Add, Warning } from '@mui/icons-material';
import AddCashier from '../components/dialogs/AddCashier';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAsync, deleteUserAsync } from '../store/usersSlice';
import SnackCustom from '../components/SnackCustom';
import SkeletonList from '../components/skeletons/SkeletonList';
import EditLink from '../components/dialogs/EditLink';
import DeleteItem from '../components/dialogs/DeleteItem';
import { hasPrivilege } from '../Utils/RBAC';

function RedeemPage() {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);

	const [response, setResponse] = useState(null);
	const [redeemError, setRedeemError] = useState(false);
	const [redeemSuccess, setRedeemSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [cashiers, setCashiers] = useState(null);

	const [errorFetch, setErrorFetch] = useState(false);
	const { user, isAdmin } = useSelector(state => state.user);

	const getCashiers = async () => {
		return await API.get('user/cashiers', {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
	};
	useEffect(() => {
		document.title = 'ssansi | cajero';
		!isAdmin &&
			getCashiers()
				.then(r => {
					setLoading(false);
					setCashiers(r.data);
				})
				.catch(r => {
					setLoading(false);
					setErrorFetch(true);
				});
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
	const addCashierAsync = () => {
		const update = async () => {
			return await dispatch(createUserAsync(accessToken, values));
		};
		update()
			.then(r => {
				handleSnack('Cajero creado exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};
	const deleteAsync = id => {
		const delet = async () => {
			await dispatch(deleteUserAsync(accessToken, id));
		};
		delet()
			.then(r => {
				handleSnack('Usuario eliminado exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};
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
			<ShowRoles addCashierAsync={addCashierAsync} />
			<SnackCustom data={snack} closeSnack={closeSnack} />

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
					<Stack
						direction={{ xs: 'column', md: 'row' }}
						alignItems="center"
						spacing={2}
						justifyContent="flex-end"
						sx={{ mb: 3 }}>
						<AddCashier />
					</Stack>
				</Box>
				<Grid container spacing={2} justifyContent="center">
					<Grid item xs={12} md={8}>
						<FormikProvider value={formik}>
							<Form onSubmit={handleSubmit}>
								<Card sx={{ p: 2 }}>
									<Stack spacing={2}>
										{/* panel resumen */}
										<Typography variant="h6" fontWeight="bold" textAlign="center">
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
								</Card>
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

					{!isAdmin && hasPrivilege(['listar cajeros'], user.permisos) && (
						<Grid item xs={12} md={4}>
							<List component={Card} sx={{ p: 2 }}>
								<Typography
									variant="h6"
									sx={{
										mb: 2,
										fontWeight: 'bold',
										// color: 'text.title',
										// fontStyle: 'italic',
									}}>
									Cajeros
								</Typography>
								{loading ? (
									<SkeletonList iteration={3} />
								) : (
									cajeros?.map((cashier, index) => (
										<React.Fragment key={index}>
											<ListItem>
												<ListItemAvatar>
													<Avatar src={cashier.picture} />
												</ListItemAvatar>
												<ListItemText
													sx={{
														overflowX: 'hidden',
														textOverflow: 'ellipsis',
														whiteSpace: 'nowrap',
													}}
													primary={cashier.nombres + cashier.apellidos}
													secondary={
														<React.Fragment>
															<Typography display={'block'} color="textSecondary">
																{cashier.email}
															</Typography>
														</React.Fragment>
													}
												/>
												<ListItemIcon>
													<DeleteItem
														deleteAsync={deleteAsync}
														id={cashier.id}
														itemName="Link"
													/>
												</ListItemIcon>
											</ListItem>
											{index !== cajeros.length - 1 && (
												<Divider variant="inset" sx={{ mr: 2 }} component="li" />
											)}
										</React.Fragment>
									))
								)}
								{!cashiers && !loading && !errorFetch && (
									<Typography align="center">No se econtraron cajeros</Typography>
								)}
								{errorFetch && (
									<Box
										width={1}
										sx={{
											py: 2,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}>
										<Warning color="error" sx={{ mr: 2 }} />

										<Typography textAlign="center" color="error">
											Error del servidor
										</Typography>
									</Box>
								)}
							</List>
						</Grid>
					)}
				</Grid>
			</Box>
		</Container>
	);
}

export default RedeemPage;

const cajeros = [
	{
		id: 1,
		nombres: 'juan ',
		apellidos: 'delivery crazo',
		email: 'juangarsa@gmail.com',
		pciture: null,
	},
	{
		id: 2,
		nombres: 'juan ',
		apellidos: 'delivery crazo',
		pciture: null,
		email: 'juangarsa@gmail.com',
	},
	{
		id: 3,
		nombres: 'juan ',
		apellidos: 'delivery crazo',
		pciture: null,
		email: 'juangarsa@gmail.com',
	},
	{
		id: 4,
		nombres: 'juan ',
		apellidos: 'delivery crazo',
		pciture: null,
		email: 'juangarsa@gmail.com',
	},
];
