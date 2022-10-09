import { Edit } from '@mui/icons-material';
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Slide,
	Stack,
	TextField,
	Tooltip,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import { FastField, Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import UploadImage from '../UploadImage';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfoAsync } from '../../store/companiesSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditCompanie({ companie, handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const { selectRubros } = useSelector(state => state.companies);

	const [open, setOpen] = useState(false);
	const [fileImage, setFileImage] = useState(null);

	const handleChangeFile = file => {
		setFileImage(file);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const formik = useFormik({
		initialValues: {
			razon_social: companie?.razon_social,
			descripcion: companie?.descripcion,
			telefono: companie?.telefono,
			rubro: companie?.rubro,
			nit: companie?.nit,
			id_empresa: companie.id_empresa,
		},
		validationSchema: Yup.object().shape({
			razon_social: Yup.string().required('El titulo del sitio es necesario'),
			descripcion: Yup.string().required('Especifique la descripcion'),
			telefono: Yup.string().required('Debe introducir una prioridad'),
		}),
		enableReinitialize: true,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const edit = async () => {
				return await dispatch(updateInfoAsync(accessToken, values, fileImage));
			};
			edit()
				.then(() => {
					handleSnack('Empresa actualizada exitosamente', 'success');
					resetForm();
					handleClose();
				})
				.catch(() => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
					setSubmitting(false);
					handleClose();
				});
			// const sub = async () => {
			// 	updateAsync(values, fileImage);
			// };
			// sub().then(r => {
			// 	setSubmitting(false);
			// 	handleClose();
			// 	resetForm();
			// });
		},
	});
	const { errors, values, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<Tooltip title="Editar informacion">
				<IconButton size="small" sx={{ ml: 1, p: 0 }} onClick={handleClickOpen}>
					<Edit
						sx={{
							fontSize: 22,
							color: 'text.icon',
							'&:hover': {
								color: 'warning.light',
							},
						}}
					/>
				</IconButton>
			</Tooltip>
			<Dialog open={open} disableEscapeKeyDown={true} TransitionComponent={Transition}>
				<DialogTitle>{'Editar ' + companie?.razon_social}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form onSubmit={handleSubmit}>
							<Stack spacing={2}>
								<UploadImage
									handleChangeFile={handleChangeFile}
									id="update-companie-info"
									preload={companie?.logo}
									label="logo"
									type="Circle"
								/>
								{/* <UpdateImage label="update" type="Circle" /> */}
								<TextField
									variant="outlined"
									size="small"
									label="Razon social *"
									{...getFieldProps('razon_social')}
									error={Boolean(touched.razon_social && errors.razon_social)}
									helperText={touched.razon_social && errors.razon_social}
								/>
								<TextField
									variant="outlined"
									size="small"
									multiline
									label="Descripcion *"
									{...getFieldProps('descripcion')}
									error={Boolean(touched.descripcion && errors.descripcion)}
									helperText={touched.descripcion && errors.descripcion}
								/>
								<TextField
									variant="outlined"
									size="small"
									label="Telefono *"
									{...getFieldProps('telefono')}
									error={Boolean(touched.telefono && errors.telefono)}
									helperText={touched.telefono && errors.telefono}
								/>
								<TextField
									variant="outlined"
									size="small"
									label="NIT (opcional)"
									{...getFieldProps('nit')}
									error={Boolean(touched.nit && errors.nit)}
									helperText={touched.nit && errors.nit}
								/>
								<FormControl fullWidth size="small">
									<InputLabel id="rubro-label-e">rubro</InputLabel>
									<FastField name="rubro">
										{({ field, form, meta }) => (
											<Select
												labelId="rubro-label-e"
												id="select-rubro-e"
												input={<OutlinedInput id="select-rubro-e" label="rubro" />}
												{...field}
												error={Boolean(meta.touched && meta.errors)}>
												{selectRubros?.map(r => (
													<MenuItem key={r.nombre} value={r.nombre}>
														{r.nombre}
													</MenuItem>
												))}
											</Select>
										)}
									</FastField>
								</FormControl>
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