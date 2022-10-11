import { Android, Google } from '@mui/icons-material';
import {
	Box,
	Button,
	Container,
	Grid,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { loginGoogleAsync } from '../../store/loginSlice';

function srcset(image, size, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
	};
}

function LandingPage() {
	const dispatch = useDispatch();
	const clientId =
		'147363332194-u205vroo6c09j366f56qc6d7pbkob6q2.apps.googleusercontent.com';
	const onLoginSuccess = res => {
		console.log('Login Success:', res.profileObj);
		dispatch(loginGoogleAsync(res.profileObj));
	};

	const onLoginFailure = res => {
		console.log('Login Failed:', res);
	};

	const pasos = [
		{ paso: 1, texto: 'Ingresar con google' },
		{ paso: 2, texto: 'Registrar su empresa o institucion' },
		{ paso: 3, texto: 'Publique ofertas de productos y servicios' },
	];
	return (
		<>
			<Box
				sx={{
					background: '#0a1928',
				}}>
				<Container maxWidth="xl">
					<Grid sx={{ py: 5 }} container spacing={2}>
						<Grid item xs={12} md={6} lg={6}>
							<Grid item>
								<Box>
									<Stack spacing={2}>
										<Typography
											variant="h5"
											color={grey[300]}
											sx={{
												fontWeight: 'bold',
												lineHeight: 1,
												textAlign: { xs: 'center', md: 'left' },
											}}>
											Comparte ofertas, promociona productos y{' '}
										</Typography>
										<Typography
											variant="h2"
											sx={{
												fontWeight: 'bold',
												lineHeight: 1,
												pr: 2,
												color: grey[100],
												textAlign: { xs: 'center', md: 'left' },
											}}>
											BENEFICIA ESTUDIANTES
										</Typography>
										<Typography
											variant="h6"
											fontWeight="bold"
											color={grey[300]}
											sx={{
												textAlign: { xs: 'center', md: 'left' },
											}}>
											Se parte de una de las empresas afiliadas, obten una cuenta,
											comienza a compartir tus promociones y productos con los estudiantes
											de la UMSS.
										</Typography>
									</Stack>
									<Stack
										spacing={2}
										sx={{ mt: 3, textAlign: 'center', alignItems: 'center' }}>
										<Box sx={{ textAlign: 'center' }}>
											<Typography variant="body1" color={grey[300]}>
												¿Quieres afiliarte? Accede con Google para mayor información
											</Typography>
										</Box>
										<GoogleLogin
											clientId={clientId}
											onSuccess={onLoginSuccess}
											onFailure={onLoginFailure}
											cookiePolicy={'single_host_origin'}
											// isSignedIn={false}
											render={renderProps => (
												<Button
													onClick={renderProps.onClick}
													disabled={renderProps.disabled}
													// sx={{ minWidth: 400 }}
													// color={theme.palette.error.main}
													color="error"
													startIcon={<Google />}
													size="large"
													variant="contained">
													Ingresar con Google
												</Button>
											)}
										/>
										<Box sx={{ textAlign: 'center' }}>
											<Typography variant="body1" color={grey[300]}>
												¿Eres estudiante?
											</Typography>
										</Box>
										<Button
											color="success"
											startIcon={<Android />}
											size="large"
											variant="contained">
											Descargar app
										</Button>
									</Stack>
								</Box>
							</Grid>

							<Box sx={{ mt: 3 }}>
								<Box sx={{ mb: 4 }}>
									<Typography align="center" color={grey[300]}>
										Pasos para publicar tus ofertas
									</Typography>
								</Box>
								<Stack
									direction={'row'}
									spacing={{ xs: 1, md: 2, lg: 2 }}
									sx={{ justifyContent: 'center' }}>
									{pasos.map(paso => (
										<Paper
											key={paso.paso}
											sx={{
												height: { xs: 140, lg: 110 },
												maxWidth: 160,
												display: 'flex',
												textAlign: 'center',
												alignItems: 'center',
												zIndex: 'modal',
												position: 'relative',
												borderRadius: 2,
												p: 1,
											}}>
											<Box
												sx={{
													zIndex: 'tooltip',
													position: 'absolute',
													top: -35,
													left: '40%',
												}}>
												<Typography
													sx={{
														fontWeight: 'bold',
														color: 'text.secondary',
														fontSize: 46,
														textAlign: 'center',
														// background: 'blue',
													}}>
													{paso.paso}
												</Typography>
											</Box>
											<Typography color="textSecondary">{paso.texto}</Typography>
										</Paper>
									))}
								</Stack>
							</Box>
						</Grid>
						<Grid item xs={12} md={6} lg={6}>
							{/* <ImageList variant="masonry" cols={3} gap={8}>
							{itemData.map(item => (
								<ImageListItem key={item.img}>
									<img
										style={{ borderRadius: 15 }}
										src={`${item.img}?w=248&fit=crop&auto=format`}
										srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
										alt={item.title}
										loading="lazy"
									/>
								</ImageListItem>
							))}
						</ImageList> */}
							<ImageList
								// sx={{ width: 500, height: 450 }}
								variant="quilted"
								cols={3}
								gap={8}
								rowHeight={121}>
								{itemData.map(item => (
									<ImageListItem
										key={item.img}
										cols={item.cols || 1}
										rows={item.rows || 1}>
										<img
											{...srcset(item.img, 121, item.rows, item.cols)}
											alt={item.title}
											loading="lazy"
											style={{ borderRadius: 12, objectFit: 'cover' }}
										/>
										<ImageListItemBar
											sx={{
												// background:
												// 	'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
												// 	'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
												px: 0,
												// borderRadius: 2,
												fontWeight: 'bold',
												borderBottomLeftRadius: 12,
												borderBottomRightRadius: 12,
											}}
											title={item.title}
											position="bottom"
											// actionIcon={<Restaurant sx={{ color: 'white', mr: 1 }} />}
											actionPosition="left"
										/>
									</ImageListItem>
								))}
							</ImageList>
						</Grid>
					</Grid>
				</Container>
			</Box>
			<Container maxWidth="xl" sx={{ mb: 3 }}>
				<Typography
					sx={{
						textAlign: 'center',
						color: 'text.primary',
						fontWeight: 'bold',
						fontSize: 27,
						py: 3,
					}}>
					Empresas afiliadas
				</Typography>
				<Grid container spacing={2} justifyContent="center">
					{empresas.map((e, index) => (
						<Grid key={index} item>
							<Box
								component="img"
								src={e.image}
								sx={{ borderRadius: 4, height: 150 }}></Box>
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
}

export default LandingPage;

const empresas = [
	{ nombre: 'NutreExplosion', image: '/imgs/empresas/nutrexplosion.jpg' },
	{ nombre: 'Cine Center', image: '/imgs/empresas/cineCenter.png' },
	{ nombre: 'NutreExplosion', image: '/imgs/empresas/fotoStudioProlab.jpg' },
	{ nombre: 'NutreExplosion', image: '/imgs/empresas/lyncoln.png' },
	{ nombre: 'NutreExplosion', image: '/imgs/empresas/opticaAmerica.jpg' },
	{ nombre: 'NutreExplosion', image: '/imgs/empresas/pbchVintage.jpg' },
	{ nombre: 'NutreExplosion', image: '/imgs/empresas/spaNatura.jpg' },
	{ nombre: 'NutreExplosion', image: '/imgs/empresas/tinta-latte.jpg' },
	{ nombre: 'NutreExplosion', image: '/imgs/empresas/skyBox.png' },

	{ nombre: 'NutreExplosion', image: '/imgs/empresas/sernap.png' },
	{ nombre: 'NutreExplosion', image: '/imgs/empresas/escuelaGorilas.jpg' },
	{ nombre: 'NutreExplosion', image: '/imgs/empresas/chicago.jpg' },
	{ nombre: 'NutreExplosion', image: '/imgs/empresas/milcar2.png' },
];

const itemData = [
	{
		img: 'https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg',
		title: 'Gimnasios',
		rows: 2,
	},
	{
		img: 'https://images.pexels.com/photos/175711/pexels-photo-175711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		title: 'Cafeterias y Restaurantes',
		cols: 2,
	},

	{
		img: 'https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		title: 'Opticas',
		cols: 2,
	},
	{
		img: 'https://images.pexels.com/photos/331989/pexels-photo-331989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		title: 'Belleza',
		cols: 1,
		rows: 3,
	},
	{
		img: 'https://images.pexels.com/photos/5130974/pexels-photo-5130974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		title: 'Parques',
		cols: 2,
		rows: 2,
	},
	{
		img: 'https://images.pexels.com/photos/5834924/pexels-photo-5834924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		title: 'Transporte',
		cols: 2,
	},
];
