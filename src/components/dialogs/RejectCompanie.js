import { Delete, Warning, WarningAmber } from '@mui/icons-material';
import {
	Button,
	CardActionArea,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Slide,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import SnackCustom from '../SnackCustom';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { rejectCompanieAsync } from '../../store/companiesSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
export default function RejectCompanie({ companie }) {
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const { accessToken } = useSelector(state => state.login);

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
			id_empresa: companie.id_empresa,
			rejection_reason: '',
		},
		validationSchema: Yup.object().shape({
			reject_reason: Yup.string().required('Ingrese el motivo del rechazo'),
		}),
		onSubmit: (values, { resetForm }) => {
			const add = async () => {
				return await dispatch(rejectCompanieAsync(accessToken, values));
			};
			add()
				.then(() => {
					handleSnack('Link agregado exitosamente', 'success');
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
	const { errors, resetForm, touched, handleSubmit, getFieldProps, isSubmitting } =
		formik;

	return (
		<>
			<SnackCustom data={snack} closeSnack={closeSnack} />

			<Button color="error" onClick={handleClickOpen}>
				Rechazar
			</Button>
			<Dialog open={open} TransitionComponent={Transition}>
				<DialogTitle>{'Rechazar a ' + companie?.razon_social + '?'}</DialogTitle>
				<FormikProvider value={formik}>
					<Form onSubmit={handleSubmit}>
						<DialogContent sx={{ py: 0 }}>
							<DialogContentText display="flex">
								<WarningAmber color="error" sx={{ mr: 1 }} />
								Esta accion removera el acceso a beneficios estudiantiles, para la empresa{' '}
								{companie.razon_social} y a su responsable.
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
									resetForm();
								}}>
								Cancelar
							</Button>
							<Button color="error" type="submit">
								Rechazar
							</Button>
						</DialogActions>
					</Form>
				</FormikProvider>
			</Dialog>
		</>
	);
}
