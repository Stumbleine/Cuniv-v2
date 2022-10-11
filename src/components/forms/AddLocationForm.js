import {
	Button,
	Card,
	CircularProgress,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import SnackCustom from '../SnackCustom';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import MapView from '../MapView';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addLocationAsync } from '../../store/umssSlice';

export default function AddLocationForm() {
	const [position, setPosition] = useState(null);
	const { accessToken } = useSelector(state => state.login);
	const dispatch = useDispatch();

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

	const sendPosition = pos => {
		setPosition(pos);
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			type: 'Biblioteca',
			description: '',
			pos: '',
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('El nombre de la locacion es necesario'),
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
				return await dispatch(addLocationAsync(accessToken, values, position));
			};
			add()
				.then(() => {
					handleSnack('Locacion agregado exitosamente', 'success');
					resetForm();
				})
				.catch(() => {
					handleSnack('Algo salio, vuelva a intentarlo', 'error');
					resetForm();
				});
		},
	});
	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<Card>
			<SnackCustom data={snack} closeSnack={closeSnack} />
			<FormikProvider value={formik}>
				<Form onSubmit={handleSubmit}>
					<Stack spacing={2} sx={{ p: 2 }}>
						<Typography align="center" sx={{ fontWeight: 'bold' }}>
							Registrar locación
						</Typography>
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
							label="Descripcion (opcional)"
							{...getFieldProps('description')}
						/>

						<Box>
							<Typography variant="body2" color="textSecondary">
								Especificar el tipo *
							</Typography>
							<Select
								sx={{ width: '100%', mt: 1 }}
								size="small"
								{...getFieldProps('type')}
								error={Boolean(touched.type && errors.type)}>
								<MenuItem value="Biblioteca"> Biblioteca</MenuItem>
								<MenuItem value="Aula">Aula</MenuItem>
								<MenuItem value="Otro">Otro</MenuItem>
							</Select>
							<Typography sx={{ ml: 2 }} variant="caption" color="error">
								{errors.type}
							</Typography>
						</Box>
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
						<Box sx={{ position: 'relative' }}>
							<Button
								color="primary"
								fullWidth
								type="submit"
								disabled={isSubmitting}
								variant="contained">
								Añadir
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
				</Form>
			</FormikProvider>
		</Card>
	);
}
