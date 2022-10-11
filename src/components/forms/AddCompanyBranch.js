import { Add, Edit } from '@mui/icons-material';
import {
	Dialog,
	Button,
	Slide,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
	IconButton,
	CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';
import { green, grey } from '@mui/material/colors';
import { useState, forwardRef } from 'react';
import MapView from '../MapView';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addBranchAsync, updateBranchAsync } from '../../store/companiesSlice';
const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
function AddCompanyBranch({
	handleAddSucursal,
	actionType,
	handleEditSucursal,
	editData,
	handleSnack,
	idEmpresa,
}) {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);

	const [position, setPosition] = useState(
		actionType !== 'add' ? { lat: editData?.latitud, lng: editData?.longitud } : null
	);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const sendPosition = pos => {
		setPosition(pos);
	};
	const validateMap = () => {
		let errores = {};
		if (position === null) {
			errores.pos = 'No se ha elegido la ubicacion';
		}
		return errores;
	};
	const formik = useFormik({
		initialValues: {
			name: editData?.nombre || '',
			address: editData?.direccion || '',
			pos: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object().shape({
			name: Yup.string().required('nombre de sucursal es requerido'),
			address: Yup.string().required('direccion es requerido'),
		}),
		validate: validateMap,
		onSubmit: (valores, { resetForm, setSubmitting }) => {
			const sucursal = {
				nombre: valores.name,
				direccion: valores.address,
				latitud: position.lat.toString(),
				longitud: position.lng.toString(),
			};
			if (actionType === 'edit') {
				handleEditSucursal(sucursal, editData.index);
				resetForm();
				setPosition(null);
				handleClose();
			} else if (actionType === 'add') {
				handleAddSucursal(sucursal);
				setPosition(null);
				resetForm();
				handleClose();
			} else if (actionType === 'update-fetch') {
				const editAsync = async () => {
					return await dispatch(
						updateBranchAsync(
							accessToken,
							sucursal,
							editData.id_sucursal,
							editData.id_empresa
						)
					);
				};
				editAsync()
					.then(() => {
						handleSnack('Sucursal actualizado exitosamente', 'success');
						resetForm();
						handleClose();
					})
					.catch(() => {
						handleSnack('Algo salio, vuelva a intentarlo', 'error');
						setSubmitting(false);
						handleClose();
					});
			} else if (actionType === 'add-fetch') {
				const addAsync = async () => {
					return await dispatch(addBranchAsync(accessToken, sucursal, idEmpresa));
				};
				addAsync()
					.then(() => {
						handleSnack('Sucursal añadido exitosamente', 'success');
						resetForm();
						handleClose();
					})
					.catch(() => {
						handleSnack('Algo salio, vuelva a intentarlo', 'error');
						setSubmitting(false);
						handleClose();
					});
			}
		},
	});
	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
	return (
		<>
			{actionType === 'add' || actionType === 'add-fetch' ? (
				<Button onClick={handleClickOpen} startIcon={<Add></Add>}>
					Sucursal
				</Button>
			) : (
				<IconButton onClick={handleClickOpen}>
					<Edit
						sx={{
							color: 'text.icon',
							'&:hover': {
								color: 'warning.light',
							},
						}}
					/>
				</IconButton>
			)}

			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				PaperProps={{ style: { borderRadius: 15 } }}
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				sx={{ minWidth: 500 }}>
				<DialogTitle sx={{ color: 'primary.main' }}>
					{actionType === 'edit' ? 'Editar Sucursal' : 'Nueva Sucursal'}
				</DialogTitle>
				<DialogContent>
					<FormikProvider value={formik}>
						<Form noValidate onSubmit={handleSubmit}>
							<Box>
								<TextField
									required
									variant="outlined"
									label="nombre"
									autoFocus
									InputProps={{
										style: {
											color: grey[900],
										},
									}}
									sx={{ width: '100%', mt: 2 }}
									{...getFieldProps('name')}
									error={Boolean(touched.name && errors.name)}
									helperText={touched.name && errors.name}
								/>
								<TextField
									required
									variant="outlined"
									label="Direccion"
									placeholder="ejem. Av. Ayacucho #723"
									autoFocus
									InputProps={{
										style: {
											color: grey[900],
										},
									}}
									sx={{ width: '100%', mt: 2 }}
									{...getFieldProps('address')}
									error={Boolean(touched.address && errors.address)}
									helperText={touched.address && errors.address}
								/>
							</Box>
							<Typography variant="body2" sx={{ mt: 2 }}>
								Seleccione la ubicación
							</Typography>
							<Box sx={{ width: '100%', height: 250, background: 'pink', mt: 1 }}>
								<MapView sendPosition={sendPosition}></MapView>
							</Box>
							<Box sx={{ display: 'flex' }}>
								<TextField
									required
									disabled
									size="small"
									variant="outlined"
									placeholder="latitud"
									InputProps={{
										style: {
											color: grey[900],
										},
									}}
									sx={{ width: '50%', mt: 2 }}
									name="pos"
									error={Boolean(errors.pos)}
									helperText={position != null ? '' : errors.pos}
									value={position != null ? position.lat : ''}
								/>
								<TextField
									required
									size="small"
									variant="outlined"
									disabled
									placeholder="longitud"
									value={position != null ? position.lng : ''}
									autoFocus
									InputProps={{
										style: {
											color: grey[900],
										},
									}}
									sx={{ width: '50%', mt: 2 }}
								/>
							</Box>
							<DialogActions sx={{ p: 0, mt: 1 }}>
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
						</Form>
					</FormikProvider>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default AddCompanyBranch;
