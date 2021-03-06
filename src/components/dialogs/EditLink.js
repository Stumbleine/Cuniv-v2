import { Edit } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Slide,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { editLinkAsync } from '../../store/umssSlice';
import UploadImage from '../UploadImage';
import { green } from '@mui/material/colors';
import SnackCustom from '../SnackCustom';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditLink({ link }) {
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
			title: link.title,
			url: link.url,
			priority: link.priority,
		},
		validationSchema: Yup.object().shape({
			title: Yup.string().required('El titulo del sitio es necesario'),
			url: Yup.string().required('Especifique el URL'),
			priority: Yup.number().required('Debe introducir una prioridad'),
		}),
		onSubmit: (values, { resetForm }) => {
			console.log('asda');
			const add = async () => {
				return await dispatch(
					editLinkAsync(accessToken, values, link.id, fileImage, editFile)
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

			<Dialog open={open} disableEscapeKeyDown={true} TransitionComponent={Transition}>
				<DialogTitle>{'Editar ' + link.title}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form onSubmit={handleSubmit}>
							<Stack spacing={2}>
								<UploadImage
									handleChangeFile={handleChangeFile}
									id="update-link"
									preload={link.image}
									label="update"
									type="Circle"
								/>
								{/* <UpdateImage label="update" type="Circle" /> */}
								<TextField
									variant="outlined"
									size="small"
									label="Titulo del sitio web"
									{...getFieldProps('title')}
									error={Boolean(touched.title && errors.title)}
									helperText={touched.title && errors.title}
								/>
								<TextField
									variant="outlined"
									size="small"
									label="Url"
									{...getFieldProps('url')}
									error={Boolean(touched.url && errors.url)}
									helperText={touched.url && errors.url}
								/>
								<TextField
									variant="outlined"
									size="small"
									label="Prioridad"
									{...getFieldProps('priority')}
									error={Boolean(touched.priority && errors.priority)}
									helperText={touched.priority && errors.priority}
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
