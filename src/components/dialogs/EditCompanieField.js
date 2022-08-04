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
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import API from '../../conection';
import { getProveedores } from '../../store/companiesSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditCompanieField({ fieldName, tooltip, data }) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const { accessToken } = useSelector(state => state.login);
	const { user, isAdmin } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const { providers } = useSelector(state => state.companies);
	const [rubros, setRubros] = useState(null);
	useEffect(() => {
		const getRubros = async () => {
			const r = await API.get('empresa/rubros', {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setRubros(r.data);
		};
		getRubros();

		isAdmin && dispatch(getProveedores(accessToken));
	}, []);

	const irubroial =
		fieldName === 'rubro'
			? { rubro: data }
			: fieldName === 'responsable' && { id_proveedor: data };

	const formik = useFormik({
		irubroialValues: irubroial,
		validationSchema: Yup.object().shape({
			rubro:
				fieldName === 'rubro' &&
				Yup.string().required('El titulo del sitio es necesario'),
			id_proveedor:
				fieldName === 'responsable' &&
				Yup.number().required('Es necesario asingar el responsable'),
		}),
		onSubmit: (values, { resetForm }) => {
			console.log(values);
		},
	});
	const { errors, values, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<Tooltip title={tooltip}>
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
				<DialogTitle>{'Editar ' + fieldName}</DialogTitle>
				<FormikProvider value={formik}>
					<Form onSubmit={handleSubmit}>
						<DialogContent sx={{ minWidth: 400, pt: 1 }}>
							{fieldName === 'rubro' && (
								<FormControl fullWidth size="small">
									<InputLabel id="rubro-label">rubro</InputLabel>
									<Select
										labelId="rubro-label"
										id="select-rubro-c"
										input={<OutlinedInput id="select-rubro-c" label="rubro" />}
										{...getFieldProps('rubro')}
										error={Boolean(touched.rubro && errors.rubro)}
										// helperText={touched.rubro && errors.rubro}
									>
										{rubros?.map(r => (
											<MenuItem key={r.nombre} value={r.nombre}>
												{r.nombre}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
							{fieldName === 'responsable' && (
								<FormControl fullWidth size="small">
									<InputLabel id="prv-label">Responsable *</InputLabel>
									<Select
										labelId="prv-label"
										id="select-prv"
										input={<OutlinedInput id="select-prv" label="Responsable *" />}
										{...getFieldProps('id_proveedor')}
										error={Boolean(touched.id_proveedor && errors.id_proveedor)}>
										{providers?.map(r => (
											<MenuItem key={r.id} value={r.id}>
												{r.nombres} {r.apellidos}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}

							<DialogActions sx={{ mt: 2, p: 0 }}>
								<Button onClick={handleClose}>Cancelar</Button>
								<Box sx={{ position: 'relative' }}>
									<Button disabled={isSubmitting} type="submit">
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
						</DialogContent>
					</Form>
				</FormikProvider>
			</Dialog>
		</>
	);
}
