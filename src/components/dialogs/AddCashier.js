import { Add, Edit } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormHelperText,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Slide,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { edituserAsync } from '../../store/umssSlice';
import UploadImage from '../UploadImage';
import { green } from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCashier({ addCashierAsync }) {
	// console.log(user)
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const { user } = useSelector(state => state.user);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const formik = useFormik({
		initialValues: {
			nombres: '',
			apellidos: '',
			email: '',
			rol: 'CJRO',
			cajero_de: user?.companie || null,
		},
		validationSchema: Yup.object().shape({
			nombres: Yup.string().required('Los nombres son requeridos.'),
			apellidos: Yup.string().required('Los apellidos son requeridos.'),
			email: Yup.string().email().required('Correo electronico es requerido.'),
		}),
		enableReinitialize: true,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const sub = async () => {
				addCashierAsync(values);
			};
			sub().then(r => {
				resetForm();
				setSubmitting(false);
				handleClose();
			});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<Button
				sx={{ width: { xs: '100%', md: 'auto' } }}
				startIcon={<Add />}
				onClick={handleClickOpen}
				variant="contained">
				Cuenta de cajero
			</Button>

			<Dialog
				PaperProps={{ style: { borderRadius: 2 } }}
				open={open}
				disableEscapeKeyDown={true}
				TransitionComponent={Transition}>
				<DialogTitle>Añadir cajero</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Stack spacing={2}>
								<TextField
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
									fullWidth
									variant="outlined"
									size="small"
									label="Email"
									placeholder="Correo electronico"
									{...getFieldProps('email')}
									error={Boolean(touched.email && errors.email)}
									helperText={touched.email && errors.email}
								/>
								<Typography variant="body2" color="textSecondary">
									Nota: La contraseña se enviara al correo electronico
								</Typography>
								<DialogActions sx={{ p: 0 }}>
									<Button onClick={handleClose}>Cancelar</Button>
									<Box sx={{ position: 'relative' }}>
										<Button fullWidth type="submit" disabled={isSubmitting}>
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
								</DialogActions>
							</Stack>
						</Form>
					</FormikProvider>
				</DialogContent>
			</Dialog>
		</>
	);
}
