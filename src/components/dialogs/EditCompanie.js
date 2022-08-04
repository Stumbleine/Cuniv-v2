import { Edit } from '@mui/icons-material';
import {
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
	Tooltip,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
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

	const [open, setOpen] = useState(false);
	const [editFile, setEditFile] = useState(false);
	const [fileImage, setFileImage] = useState(null);

	const handleChangeFile = file => {
		setEditFile(true);
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
		},
		validationSchema: Yup.object().shape({
			title: Yup.string().required('El titulo del sitio es necesario'),
			descripcion: Yup.string().required('Especifique el descripcion'),
			telefono: Yup.number().required('Debe introducir una prioridad'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const add = async () => {
				return await dispatch(
					updateInfoAsync(accessToken, values, fileImage, editFile, companie.id_empresa)
				);
			};
			add()
				.then(() => {
					handleSnack('Link actualizado exitosamente', 'success');
					handleClose();
					resetForm();
				})
				.catch(() => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
					handleClose();
					setSubmitting(false);
				});
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
								<DialogActions sx={{ p: 0 }}>
									<Button onClick={handleClose}>Cancelar</Button>
									<Box sx={{ position: 'relative' }}>
										<Button
											fullWidth
											type="submit"
											disabled={isSubmitting}
											onClick={() => {
												console.log(values);
											}}>
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
