import { Add } from '@mui/icons-material';
import {
	Dialog,
	Button,
	Slide,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import { useEffect, useState, forwardRef } from 'react';
import MapView from './MapView';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
function AddCompanyBranch({ handleAddSucursal }) {
	const [open, setOpen] = useState(false);
	const [position, setPosition] = useState(null);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const sendPosition = (pos) => {
		setPosition(pos);
		console.log(typeof pos.lat);
	};
	const validateMap = (valores) => {
		let errores = {};
		if (position === null) {
			errores.pos = 'No se ha elegido la ubicacion';
		}
		return errores;
	};
	const formik = useFormik({
		initialValues: {
			name: '',
			address: '',
			pos: 0,
		},

		validationSchema: Yup.object().shape({
			name: Yup.string().required('nombre de sucursal es requerido'),
			address: Yup.string().required('direccion es requerido'),
			/* 			pos: Yup.number()
				.min(2)
				.required('Debe seleccionar la ubicacion en el mapa'), */
		}),
		validate: validateMap,
		onSubmit: (valores, { resetForm }) => {
			const sucursal = {
				nombre: valores.name,
				direccion: valores.address,
				latitud: position.lat,
				longitud: position.lng,
			};
			handleAddSucursal(sucursal);
			resetForm();
			setPosition(null);
			handleClose();
		},
	});
	const {
		errors,
		touched,
		values,
		isSubmitting,
		handleSubmit,
		getFieldProps,
		handleChange,
	} = formik;
	return (
		<>
			<Button onClick={handleClickOpen} startIcon={<Add></Add>}>
				Sucursal
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				sx={{ minWidth: 500 }}>
				<DialogTitle sx={{ color: 'primary.main' }}>Nueva Sucursal</DialogTitle>
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
							<Box
								sx={{ width: '100%', height: 250, background: 'pink', mt: 1 }}>
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
							<DialogActions sx={{ background: grey[100], p: 0, mt: 1 }}>
								<Button onClick={handleClose}>Cancelar</Button>
								<Button type="submit">Guardar</Button>
							</DialogActions>
						</Form>
					</FormikProvider>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default AddCompanyBranch;
