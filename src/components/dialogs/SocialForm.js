import { AddRounded, Edit } from '@mui/icons-material';
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
import React, { useEffect, useState } from 'react';
import UploadImage from '../UploadImage';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfoAsync, updateSocialAsync } from '../../store/companiesSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function SocialForm({ companie, mode, handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const formik = useFormik({
		initialValues: {
			facebook: companie?.facebook || '',
			instagram: companie?.instagram || '',
			sitio_web: companie?.sitio_web || '',
			email: companie?.email || '',
		},
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const add = async () => {
				return await dispatch(
					updateSocialAsync(accessToken, values, companie.id_empresa)
				);
			};
			add()
				.then(() => {
					handleSnack('Link actualizado exitosamente', 'success');
					handleClose();
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
			<Tooltip title={mode === 'edit' ? 'Editar' : 'Agregar'}>
				<IconButton size="small" sx={{ ml: 1, p: 0 }} onClick={handleClickOpen}>
					{mode === 'edit' ? (
						<Edit
							sx={{
								fontSize: 20,
								color: 'text.icon',
								'&:hover': {
									color: 'warning.light',
								},
							}}
						/>
					) : (
						<AddRounded
							sx={{
								fontSize: 22,

								color: 'text.icon',
								'&:hover': {
									color: 'primary',
								},
							}}
						/>
					)}
				</IconButton>
			</Tooltip>
			<Dialog open={open} disableEscapeKeyDown={true} TransitionComponent={Transition}>
				<DialogTitle>{mode === 'edit' ? 'Editar' : 'Agregar'} redes sociales</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form onSubmit={handleSubmit}>
							<Stack spacing={2} sx={{ mt: 1 }}>
								<TextField
									variant="outlined"
									size="small"
									label="Facebook"
									{...getFieldProps('facebook')}
									error={Boolean(touched.facebook && errors.facebook)}
									helperText={touched.facebook && errors.facebook}
								/>
								<TextField
									variant="outlined"
									size="small"
									multiline
									label="Instagram"
									{...getFieldProps('instagram')}
									error={Boolean(touched.instagram && errors.instagram)}
									helperText={touched.instagram && errors.instagram}
								/>
								<TextField
									variant="outlined"
									size="small"
									label="Sitio web"
									{...getFieldProps('sitio_web')}
									error={Boolean(touched.sitio_web && errors.sitio_web)}
									helperText={touched.sitio_web && errors.sitio_web}
								/>
								<TextField
									variant="outlined"
									size="small"
									label="Correo electronico"
									{...getFieldProps('email')}
									error={Boolean(touched.email && errors.email)}
									helperText={touched.email && errors.email}
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
