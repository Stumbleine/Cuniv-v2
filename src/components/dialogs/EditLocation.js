import { Edit } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Slide,
	Stack,
	TextField,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SnackCustom from '../SnackCustom';
import * as Yup from 'yup';
import { editLocationAsync } from '../../store/umssSlice';
import { green } from '@mui/material/colors';
import MapView from '../MapView';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
export default function EditLocation({ location }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const [open, setOpen] = useState(false);
	const [position, setPosition] = useState({ lat: location.lat, lng: location.lng });

	const sendPosition = pos => {
		setPosition(pos);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
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
			name: location.name,
			type: location.type,
			pos: '',
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('Nombre de locacion es necesario'),
			type: Yup.string().required('Especifique el tipo'),
		}),
		validate: () => {
			let errors = {};
			if (position === null) {
				errors.pos = 'Es necesario una ubicacion';
			}
			return errors;
		},
		onSubmit: (values, { resetForm }) => {
			const add = async () => {
				return await dispatch(
					editLocationAsync(accessToken, values, position, location.id)
				);
			};
			add()
				.then(() => {
					handleSnack('Locacion actualizado exitosamente', 'success');
					handleClose();
					resetForm();
				})
				.catch(() => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
					handleClose();
					resetForm();
				});
		},
	});
	const { errors, values, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<IconButton size="small" onClick={handleClickOpen}>
				<Edit
					sx={{
						color: 'text.icon',
						'&:hover': {
							color: 'warning.light',
						},
					}}
				/>
			</IconButton>
			<SnackCustom data={snack} closeSnack={closeSnack} />

			<Dialog open={open} TransitionComponent={Transition}>
				<DialogTitle>{'Editar ' + location.name}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form onSubmit={handleSubmit}>
							<Stack spacing={2} sx={{ mt: 2 }}>
								{/* <UpdateImage label="update" type="Circle" /> */}
								<TextField
									variant="outlined"
									size="small"
									label="Nombre de locacion"
									{...getFieldProps('name')}
									error={Boolean(touched.name && errors.name)}
									helperText={touched.name && errors.name}
								/>
								<TextField
									variant="outlined"
									size="small"
									label="Tipo"
									{...getFieldProps('type')}
									error={Boolean(touched.type && errors.type)}
									helperText={touched.type && errors.type}
								/>
								<Box sx={{ width: '100%', height: 280, background: 'pink', mt: 1 }}>
									<MapView sendPosition={sendPosition} />
								</Box>

								<TextField
									focused
									variant="outlined"
									size="small"
									value={position ? position.lat + ' , ' + position.lng : ''}
									disabled={true}
									placeholder="Coordenadas"
									error={Boolean(position ? false : errors.pos)}
									helperText={position ? '' : errors.pos}
								/>
								{/* <TextField
									variant="outlined"
									size="small"
									label="Latitud"
									{...getFieldProps('lat')}
									error={Boolean(touched.lat && errors.lat)}
									helperText={touched.lat && errors.lat}
								/>
								<TextField
									variant="outlined"
									size="small"
									label="lng"
									{...getFieldProps('lng')}
									error={Boolean(touched.lng && errors.lng)}
									helperText={touched.lng && errors.lng}
								/> */}
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
