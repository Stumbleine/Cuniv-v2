import { SearchRounded } from '@mui/icons-material';
import { IconButton, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
/**
 * Barra de buscador y filtros diferentes
 * @component FilterBar
 * @property {Function} handleSearch asigna los caracteres que se introdujeron en el input search
 * @property {Component} children redenriza los componentes dentro del tag
 * @property {Number} [w] width preferido para input search
 * @exports FilterBar
 */
export default function FilterBar({ handleSearch, children, w }) {
	/**
	 * Creacion y configuracion del formulario para buscar por caracteres
	 * propiedades:
	 * 	initialValues: inicializa valores del formulario,
	 * 	validationSchema: configura la validacion de los campos, usando la libreria yup
	 * 	onSubmit: Funcion que se ejecuta con el evento "submit"
	 * @constant formik
	 */
	const formik = useFormik({
		initialValues: {
			search: '',
		},
		validationSchema: Yup.object({
			search: Yup.string().required('heloo'),
		}),
		onSubmit: values => {
			handleSearch(values);
		},
	});
	const { getFieldProps } = formik;
	return (
		<Stack
			direction={{ xs: 'column', sm: 'row' }}
			alignItems={{ xs: 'none', sm: 'center' }}
			width={1}
			sx={{ flexGrow: 1 }}
			spacing={2}>
			<FormikProvider value={formik} sx={{ background: 'pink' }}>
				<Form onSubmit={formik.handleSubmit} style={{ minWidth: w || '40%' }}>
					<TextField
						fullWidth
						size="small"
						name="search"
						{...getFieldProps('search')}
						variant="outlined"
						placerholder="Buscar usuario"
						InputProps={{
							startAdornment: (
								<IconButton type="submit" edge="end" sx={{ mr: 0.5 }}>
									<SearchRounded />
								</IconButton>
							),
						}}
					/>
				</Form>
				{children}
			</FormikProvider>
		</Stack>
	);
}
