import { Button, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
/**
 * Pasos segurido a seguir para el proveedor una vez que ingreso al sistema
 * @component Steps
 * @exports Steps
 */
export default function Steps() {
	const { user } = useSelector(state => state.user);
	return (
		<Stack spacing={2} maxWidth="md">
			<Box>
				<Typography variant="h5" sx={{ mt: 2 }}>
					Primero lo primero, aqui algunos pasos a seguir sugeridos.
				</Typography>
				<Typography variant="h6" color="textSecondary">
					Si ya completo estos pasos, ignorelos.
				</Typography>
			</Box>
			<Paper sx={{ p: 2 }}>
				<Typography variant="h6">#1 Registrar su empresa</Typography>
				<Typography color="textSecondary">
					Antes de publicar su ofertas, es necesario registrar su empresa y ser aprobado
					por los administradores, de esta forma los estudiantes conoceran más sobre su
					empresa.
				</Typography>
				<Box sx={{ textAlign: 'end', mt: 2 }}>
					<Button
						component={Link}
						to={
							user.companieVerified ? '/main/profileCompanie' : `/main/registerCompanie`
						}
						variant="contained">
						Registrar Empresa
					</Button>
				</Box>
			</Paper>
			<Paper sx={{ p: 2 }}>
				<Typography variant="h6">#2 Registrar productos</Typography>
				<Typography color="textSecondary">
					Registrar los productos o servicios que ofrece su empresa (paso opcional)
				</Typography>
				<Box sx={{ textAlign: 'end', mt: 2 }}>
					<Button component={Link} to={`/main/products`} variant="contained">
						Agregar Producto
					</Button>
				</Box>
			</Paper>
			<Paper sx={{ p: 2 }}>
				<Typography variant="h6">#3 Publicar sus ofertas</Typography>
				<Typography color="textSecondary">
					Al publicar sus ofertas se mostraran a los beneficiarios con todos los detalles
					acerca de su empresa y productos.
				</Typography>
				<Box sx={{ textAlign: 'end', mt: 2 }}>
					<Button component={Link} to={`/main/createOffer`} variant="contained">
						publicar oferta
					</Button>
				</Box>
			</Paper>
		</Stack>
	);
}
