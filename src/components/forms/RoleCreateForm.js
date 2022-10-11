import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Card, CircularProgress, Stack, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import AssignPrivilegesForm from './AssignPrivilegesForm';

function RoleCreateForm() {
	const formik = useFormik({
		initialValues: {
			nombre: '',
			abreviation: '',
			privileges: [],
		},
		validationSchema: Yup.object().shape({
			nombre: Yup.string().required('Nombre de rol es requerido.'),
			abreviation: Yup.string().required('Abreviacion del rol es requerido.'),
			// privileges: Yup.string().required(
			// 	'Es necesario asignar privilegios para el rol.'
			// ),
		}),
		onSubmit: (values, { resetForm }) => {},
	});
	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Card sx={{ p: 2 }}>
					<Button component={Link} to="/" startIcon={<ArrowBack></ArrowBack>}>
						Inicio
					</Button>
					<Stack spacing={2} sx={{ mt: 2 }}>
						<TextField
							required
							fullWidth
							variant="outlined"
							size="small"
							label="Nombre de rol"
							placeholder="ejem: Administrador"
							{...getFieldProps('nombre')}
							error={Boolean(touched.nombre && errors.nombre)}
							helperText={touched.nombre && errors.nombre}
						/>
						<TextField
							required
							fullWidth
							variant="outlined"
							size="small"
							label="Abreviacion"
							placeholder="ejem: ADM"
							{...getFieldProps('abreviation')}
							error={Boolean(touched.abreviation && errors.abreviation)}
							helperText={touched.abreviation && errors.abreviation}
						/>
						<AssignPrivilegesForm />
						<Box sx={{ position: 'relative', py: 1 }}>
							<Button
								color="primary"
								/* 						disabled={formik.isSubmitting} */
								fullWidth
								size="large"
								type="submit"
								disabled={isSubmitting}
								variant="contained">
								Crear Rol
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
					</Stack>
				</Card>
			</Form>
		</FormikProvider>
	);
}

export default RoleCreateForm;
