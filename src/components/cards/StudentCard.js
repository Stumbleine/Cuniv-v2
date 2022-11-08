import { Card, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { Box } from '@mui/system';

/**
 * Tarjeta para mostrar los datos del estudiante que ha canjeado el codigo, realizado mediante el formulario del cajero.
 * @component StudentCard
 * @property {Object} offer datos de la oferta relacionada con el codigo de canje.
 * @property {Object} student datos del estudiante que genero el codigo.
 * @exports StudentCard
 */
export default function StudentCard({ offer, student }) {
	return (
		<Grid container justifyContent="center">
			<Grid item sm={6} xs={12}>
				<Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }} width={1}>
					<Box
						component="img"
						src={student?.picture}
						sx={{ borderRadius: 5, minWidth: 200, height: 'auto' }}></Box>
				</Box>
				<Box
					sx={{
						fontWeight: 'bold',
						color: green[500],
						textAlign: 'center',
						width: 1,
						p: 1,
					}}>
					¡Codigo canjeado!
				</Box>
			</Grid>
			<Grid item sm={6} xs={12}>
				<Stack sx={{ p: 1 }} spacing={1}>
					<Box>
						<Typography sx={{ fontWeight: 'bold' }}>Universitario</Typography>
						<Typography> {student?.nombres + ' ' + student?.apellidos}</Typography>
					</Box>
					<Box>
						<Typography sx={{ fontWeight: 'bold' }}>Correo </Typography>
						<Typography>{student?.email}</Typography>
					</Box>
					<Box>
						<Typography sx={{ fontWeight: 'bold' }}>Codigo valido para</Typography>
						<Card elevation={0} sx={{ background: grey[200], mt: 1, display: 'flex' }}>
							<CardMedia component="img" image={offer?.image} sx={{ maxWidth: 100 }} />
							<Box sx={{ p: 1 }}>
								<Typography>{offer?.title}</Typography>
								{offer?.type_discount === 'Porcentual' && (
									<Typography color="textSecondary">
										descuento: {offer?.discount} %
									</Typography>
								)}
								{offer?.type_discount === 'Monetario' && (
									<Typography color="textSecondary">
										descuento: Bs. {offer?.discount}
									</Typography>
								)}
								{offer?.type_discount === 'Descripcion' && (
									<Typography color="textSecondary">{offer?.discount}</Typography>
								)}
							</Box>
						</Card>
					</Box>
				</Stack>
			</Grid>
		</Grid>
	);
}

// export const est = {
// 	nombres: 'Cristhian',
// 	apellidos: 'Mercado Cespedes',
// 	email: '201604525@est.umss.edu',
// 	nro_canjeados: 23,
// 	offer_title: 'Pollos navidad',
// 	type_discount: 'Monetario',
// 	discount: 20,
// };
