import { SearchRounded } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export default function FilterBar({ handleSearch, children, w }) {
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
								<IconButton
									type="submit"
									edge="end"
									sx={{ mr: 0.5 }}
									// onClick={() => {
									// 	console.log(formik.values);
									// }}
								>
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
