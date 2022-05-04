import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Steps() {
	const { rulepath } = useSelector((state) => state.user);
	return (
		<Stack spacing={2} maxWidth="md">
			<Typography variant="h4">Primero lo primero</Typography>
			<Typography variant="h6" color="textSecondary">
				Aqui algunos pasos a seguir sugeridos
			</Typography>
			<Paper sx={{ p: 2 }}>
				<Typography variant="h6">#1 Registrar su empresa</Typography>
				<Typography color="textSecondary">
					Antes de publicar su ofertas, es necesario registrar su empresa, de
					esta forma los beneficiarios conoceran más sobre su empresa.
				</Typography>
				<Box sx={{ textAlign: 'end', mt: 2 }}>
					<Button
						component={Link}
						to={`/${rulepath}/registerCompanie`}
						variant="contained">
						Registrar Empresa
					</Button>
				</Box>
			</Paper>
			<Paper sx={{ p: 2 }}>
				<Typography variant="h6">#2 Registrar productos</Typography>
				<Typography color="textSecondary">
					Registrar los productos o servicios que ofrece su empresa (este paso
					es opcional)
				</Typography>
				<Box sx={{ textAlign: 'end', mt: 2 }}>
					<Button
						component={Link}
						to={`/${rulepath}/products`}
						variant="contained">
						Agregar Producto
					</Button>
				</Box>
			</Paper>
			<Paper sx={{ p: 2 }}>
				<Typography variant="h6">#3 Publicar sus ofertas</Typography>
				<Typography color="textSecondary">
					Al publicar sus ofertas se mostraran a los beneficiarios con todo los
					detalles acerca de su empresa.
				</Typography>
				<Box sx={{ textAlign: 'end', mt: 2 }}>
					<Button
						component={Link}
						to={`/${rulepath}/createOffer`}
						variant="contained">
						publicar oferta
					</Button>
				</Box>
			</Paper>
		</Stack>
	);
}

export default Steps;
