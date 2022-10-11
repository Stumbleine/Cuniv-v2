import { WarningAmber } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { rejectCompanieAsync } from '../../store/companiesSlice';
import { green } from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
export default function RejectCompanie({ companie, handleSnack, setReload, reload }) {
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const { accessToken } = useSelector(state => state.login);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const formik = useFormik({
		initialValues: {
			id_empresa: companie.id_empresa,
			rejection_reason: '',
		},
		validationSchema: Yup.object().shape({
			rejection_reason: Yup.string().required('Ingrese el motivo del rechazo'),
		}),
		onSubmit: (values, { resetForm }) => {
			const reject = async () => {
				return await dispatch(rejectCompanieAsync(accessToken, values));
			};
			reject()
				.then(() => {
					handleSnack('Se ha rechazo con exito agregado exitosamente', 'success');
					setReload(!reload);
					resetForm();
					handleClose();
				})
				.catch(() => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
					resetForm();
					handleClose();
				});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<Button color="error" onClick={handleClickOpen}>
				Rechazar
			</Button>
			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<DialogTitle>{'Rechazar a ' + companie?.razon_social + '?'}</DialogTitle>
				<FormikProvider value={formik}>
					<Form onSubmit={handleSubmit}>
						<DialogContent sx={{ py: 0 }}>
							<DialogContentText display="flex">
								<WarningAmber color="error" sx={{ mr: 1 }} />
								Esta accion removera el acceso a beneficios estudiantiles, para la empresa{' '}
								{companie.razon_social} y su responsable.
							</DialogContentText>
							<Typography component="div" sx={{ color: 'warning.main', mt: 2 }}>
								Nota: debe ingresar las razones por cual se rechaza la solicitud.
							</Typography>
							<TextField
								sx={{ mt: 1 }}
								multiline
								variant="outlined"
								fullWidth
								size="small"
								{...getFieldProps('rejection_reason')}
								error={Boolean(touched.rejection_reason && errors.rejection_reason)}
								helperText={touched.rejection_reason && errors.rejection_reason}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => {
									handleClose();
								}}>
								Cancelar
							</Button>
							<Box sx={{ position: 'relative' }}>
								<Button fullWidth type="submit" color="error" disabled={isSubmitting}>
									Rechazar
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
			</Dialog>
		</>
	);
}
