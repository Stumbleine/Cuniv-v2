import { Google, Restaurant } from '@mui/icons-material';
import {
	AppBar,
	Box,
	Button,
	Container,
	Grid,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Paper,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import { blue, grey, pink } from '@mui/material/colors';
import { replace } from 'formik';
import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAsync } from '../../store/loginSlice';
function srcset(image, width, height, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${width * cols}&h=${
			height * rows
		}&fit=crop&auto=format&dpr=2 2x`,
	};
}
function LandingPage() {
	const [muestra, setMuestra] = useState(Data.slice(0, 5));
	const { isLoading } = useSelector((state) => state.login);
	const dispatch = useDispatch();
	const clientId =
		'147363332194-u205vroo6c09j366f56qc6d7pbkob6q2.apps.googleusercontent.com';
	const onLoginSuccess = (res) => {
		console.log('Login Success:', res.profileObj);
		dispatch(loginAsync(res.profileObj));
	};

	const onLoginFailure = (res) => {
		console.log('Login Failed:', res);
	};

	const pasos = [
		{ paso: 1, texto: 'Ingresar con google' },
		{ paso: 2, texto: 'Registrar su empresa o institucion' },
		{ paso: 3, texto: 'Publique ofertas de productos y servicios' },
	];
	return (
		<Container maxWidth="xl">
			<Grid container spacing={2}>
				<Grid item xs={12} md={6} lg={6}>
					<Grid item>
						<Box sx={{ p: 2 }}>
							<Stack spacing={2}>
								<Typography
									variant="h4"
									sx={{ fontWeight: 'bold', lineHeight: 1, color: grey[800] }}>
									Comparte ofertas, promociona productos y{' '}
								</Typography>
								<Typography
									variant="h2"
									sx={{ fontWeight: 'bold', lineHeight: 1, color: grey[900] }}>
									BENEFICIA ESTUDIANTES
								</Typography>
								<Typography variant="h6" sx={{ color: grey[800] }}>
									Se parte de una de las empresas afiliadas, obten una cuenta,
									comienza a compartir tus promociones y productos con los
									estudiantes de la UMSS.
								</Typography>
							</Stack>
							<Stack
								spacing={2}
								sx={{ mt: 3, textAlign: 'center', alignItems: 'center' }}>
								<Box sx={{ textAlign: 'center' }}>
									<Typography variant="body1">
										¿Quieres afiliarte? Accede con Google para mayor información
									</Typography>
								</Box>
								<GoogleLogin
									clientId={clientId}
									buttonText="Sign In"
									onSuccess={onLoginSuccess}
									onFailure={onLoginFailure}
									cookiePolicy={'single_host_origin'}
									isSignedIn={true}
									render={(renderProps) => (
										<Button
											onClick={renderProps.onClick}
											disabled={renderProps.disabled}
											// sx={{ minWidth: 400 }}
											color="error"
											startIcon={<Google />}
											size="large"
											variant="contained">
											Ingresar con Google
										</Button>
									)}
								/>
								<Box sx={{ textAlign: 'center' }}>
									<Typography variant="body1">¿Eres estudiante?</Typography>
								</Box>
								<Button
									onClick={() => {
										console.log('first');
									}}
									// sx={{ minWidth: 400 }}
									color="success"
									startIcon={<Google />}
									size="large"
									variant="contained">
									Descargar app
								</Button>
							</Stack>
						</Box>
					</Grid>

					<Box sx={{ p: 2, mt: 2 }}>
						<Box sx={{ mb: 5 }}>
							<Typography>Pasos para publicar sus ofertas</Typography>
						</Box>
						<Stack
							direction={'row'}
							spacing={{ xs: 1, md: 2, lg: 2 }}
							sx={{ justifyContent: 'center' }}>
							{pasos.map((paso) => (
								<Paper
									key={paso.paso}
									sx={{
										height: 130,
										maxWidth: 130,
										display: 'flex',
										textAlign: 'center',
										alignItems: 'center',
										background: grey[100],
										zIndex: 'modal',
										position: 'relative',
										p: 2,
									}}>
									<Box
										sx={{
											zIndex: 'tooltip',
											position: 'absolute',
											top: -35,
											left: 50,
										}}>
										<Typography
											sx={{
												fontWeight: 'bold',
												color: blue[600],
												fontSize: 40,
												// background: 'blue',
											}}>
											{paso.paso}
										</Typography>
									</Box>
									<Typography>{paso.texto}</Typography>
								</Paper>
							))}
						</Stack>
					</Box>
				</Grid>
				<Grid item xs={12} md={6} lg={6} sx={{ p: 2 }}>
					<ImageList
						sx={{
							// width: 500,
							height: 800,
							// Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
							// transform: 'translateZ(0)',
							overflowY: 'hidden',
						}}>
						{Data.map((item) => {
							const cols = item.featured ? 2 : 1;
							const rows = item.featured ? 2 : 1;
							return (
								<ImageListItem
									key={item.img}
									cols={1}
									rows={1}
									style={{ borderRadius: 10 }}>
									<img
										{...srcset(item.img, 250, 200, rows, cols)}
										alt={item.title}
										loading="lazy"
										style={{ borderRadius: 10 }}
									/>
									<ImageListItemBar
										sx={{
											background:
												'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
												'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
											px: 1,
											borderRadius: 2,
										}}
										title={item.title}
										position="top"
										actionIcon={<Restaurant sx={{ color: 'white', mr: 1 }} />}
										actionPosition="left"
									/>
								</ImageListItem>
							);
						})}
					</ImageList>
				</Grid>
			</Grid>
		</Container>
	);
}
const Data = [
	{
		img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		title: 'Breakfast',
		author: '@bkristastucchio',
		featured: true,
	},
	{
		img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
		title: 'Burger',
		author: '@rollelflex_graphy726',
	},
	{
		img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
		title: 'Camera',
		author: '@helloimnik',
	},
	{
		img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
		title: 'Coffee',
		author: '@nolanissac',
	},
	{
		img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
		title: 'Hats',
		author: '@hjrc33',
	},
	{
		img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
		title: 'Honey',
		author: '@arwinneil',
		featured: true,
	},
	// {
	// 	img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
	// 	title: 'Basketball',
	// 	author: '@tjdragotta',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
	// 	title: 'Fern',
	// 	author: '@katie_wasserman',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
	// 	title: 'Mushrooms',
	// 	author: '@silverdalex',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
	// 	title: 'Tomato basil',
	// 	author: '@shelleypauls',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
	// 	title: 'Sea star',
	// 	author: '@peterlaster',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
	// 	title: 'Bike',
	// 	author: '@southside_customs',
	// },
];
export default LandingPage;
