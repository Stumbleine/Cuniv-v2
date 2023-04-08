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
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import Popup from '../../components/dialogs/Popup';
import API from '../../conection';
import { loginGoogleAsync } from '../../store/loginSlice';
import { isEstudentEmail } from '../../Utils/Validations.js';
/**
 * Orgniza las imagenes de la lista
 * @function srcset
 * @param {String} image
 * @param {Number} size
 * @param {Number} [rows]
 * @param {Number} [cols]
 */
function srcset(image, size, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
	};
}
/**
 * Pagina principal y de presentacion del sistema.
 * @component LandingPage
 * @exports LandingPage
 */
export default function LandingPage() {
	const dispatch = useDispatch();
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	const [loginError, setLoginError] = useState(false);
	const [open, setOpen] = useState(false);
	const handleCloseFromFather = () => {
		setOpen(false);
	};
	/**
	 * realiza una peticion al servidor para iniciar sesion.
	 * @function onLoginSuccess
	 */
	const onLoginSuccess = res => {
		if (isEstudentEmail(res.profileObj.email)) {
			setOpen(true);
		} else {
			const login = async () => {
				await dispatch(loginGoogleAsync(res.profileObj));
			};
			login()
				.then(r => {
					setLoginError(false);
				})
				.catch(e => {
					setLoginError(true);
					// console.log(e);
				});
		}
	};
	/**
	 * Evento que inprime el error al iniciar sesion con google
	 * @function onLoginFailure
	 */
	const onLoginFailure = res => {
		// console.log('Login Failed:', res);
	};
	/**
	 * Pasos para registrarse y publicar ofertas.
	 * @constant pasos
	 */
	const pasos = [
		{ paso: 1, texto: 'Ingresar con google' },
		{ paso: 2, texto: 'Registrar su empresa o institución' },
		{ paso: 3, texto: 'Publique ofertas de productos y servicios' },
	];

	const [companies, setCompanies] = useState(null);
	useEffect(() => {
		const fetchLogos = async () => {
			return await API.get('public/logo-companies');
		};
		fetchLogos()
			.then(r => {
				console.log(r.data);
				setCompanies(r.data);
			})
			.catch(e => {
				console.log('error');
			});
	}, []);

	return (
		<>
			<Popup openFromFather={open} handleCloseFromFather={handleCloseFromFather} />
			<Box
				sx={{
					background: '#0a1928',
				}}>
				<Container maxWidth="xl">
					<Grid sx={{ py: 4 }} container spacing={2}>
						<Grid item xs={12} md={6} lg={6}>
							<Grid item>
								<Box>
									<Stack spacing={2} sx={{ mr: 1 }}>
										<Stack spacing={1}>
											<Typography
												color="white"
												sx={{
													fontWeight: 'bold',
													lineHeight: 1,
													textAlign: { xs: 'center', md: 'left' },
													fontSize: 40,
													fontFamily: 'Roboto condensed',
												}}>
												AMIGOS DE
											</Typography>
											<Typography
												color="secondary"
												sx={{
													fontWeight: 'bold',
													lineHeight: 1,
													textAlign: { xs: 'center', md: 'left' },
													fontSize: 40,
													fontFamily: 'Roboto condensed',
												}}>
												SAN SIMÓN
											</Typography>
										</Stack>
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
											// variant="h3"
											sx={{
												fontWeight: 'bold',
												lineHeight: 1.2,
												fontSize: 50,
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
											Se parte de una de las empresas afiliadas, obtén una cuenta y
											comienza a compartir promociones, productos con estudiantes de la
											Universidad Mayor de San Simón.
										</Typography>
									</Stack>
									<Stack
										spacing={2}
										sx={{ mt: 3, textAlign: 'center', alignItems: 'center' }}>
										<Box sx={{ textAlign: 'center' }}>
											<Typography variant="body1" color={grey[300]}>
												¿Quieres afiliarte? Accede con Google
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
										{loginError && (
											<Typography color="error" variant="body2" textAlign="center">
												Algo salió mal mal, vuelva a intentarlo, si el problema persiste
												comuníquese con un administrador.
											</Typography>
										)}
										<Box sx={{ textAlign: 'center' }}>
											<Typography variant="body1" color={grey[300]}>
												¿Eres estudiante?
											</Typography>
										</Box>
										<Button
											color="success"
											startIcon={<Android />}
											onClick={() =>
												window.open('https://play.google.com/store/games', '_blank')
											}
											size="large"
											variant="contained">
											Descarga nuestra app
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
			{companies && (
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
						{companies?.map((e, index) => (
							<Grid key={index} item>
								<Box component="img" src={e.logo} sx={{ borderRadius: 4, height: 130 }} />
							</Grid>
						))}
					</Grid>
				</Container>
			)}
		</>
	);
}

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
