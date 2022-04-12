import {
	Avatar,
	Box,
	Button,
	Card,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemIcon,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material';
import { blue, pink } from '@mui/material/colors';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Business, Facebook, Instagram } from '@mui/icons-material';

function CompanieProfile() {
	const companies = useSelector((state) => state.companies.companies);
	const companie = companies[0];
	const sucursales = companie.sucursales;
	console.log(sucursales);
	return (
		<Container maxWidth="lg" sx={{ background: 'pink' }}>
			<Box>
				<Box>
					<Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
						{companie.razonSocial} Perfil
					</Typography>
					{/* <Stack
						direction="row"
						flexWrap="wrap-reverse"
						alignItems="center"
						justifyContent="flex-end"
						sx={{ mb: 2 }}>
						<Link to="/provider/createOffer" style={{ textDecoration: 'none' }}>
							<Button startIcon={<Add />} variant="contained">
								Proveedor
							</Button>
						</Link>
					</Stack> */}
				</Box>
				<Grid container spacing={2} sx={{ background: pink[200] }}>
					<Grid
						item
						xs={12}
						sm={12}
						md={5}
						lg={5}
						sx={{ background: blue[200] }}>
						<Paper sx={{ p: 2, borderRadius: 2 }}>
							<Box
								width="100%"
								sx={{
									justifyItems: 'center',
									alignItems: 'center',
									display: 'flex',
									flexDirection: 'column',
								}}>
								<Box
									component="img"
									src={companie.logo}
									style={{
										width: 150,
										borderRadius: '50%',
										objectFit: 'cover',
									}}
								/>
								<Box sx={{ textAlign: 'center', mt: 2 }}>
									<Typography variant="h5">{companie.razonSocial} </Typography>
									<Typography variant="body1">categoria </Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										width: '100%',
										justifyContent: 'center',
									}}>
									<IconButton onClick={() => window.open(companie.social.fb)}>
										<Facebook
											sx={{
												color: blue[500],
											}}></Facebook>
									</IconButton>
									<IconButton onClick={() => window.open(companie.social.ig)}>
										<Instagram
											sx={{
												color: pink[500],
											}}></Instagram>
									</IconButton>
								</Box>
							</Box>
						</Paper>

						<Paper sx={{ p: 2, mt: 1, borderRadius: 2 }}>
							<Box>
								<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
									Descripción
								</Typography>
								<Typography variant="body2" sx={{ mt: 1 }}>
									{companie.descripcion}
								</Typography>
							</Box>
							<Box sx={{ mt: 1 }}>
								<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
									Usuarios
								</Typography>
								<List
									sx={{
										width: '100%',
										borderRadius: 2,
										mt: 1,
									}}
									disablePadding>
									<Box>
										<ListItem alignItems="flex-start" sx={{ py: 0, px: 3 }}>
											<ListItemAvatar>
												<Avatar
													alt="Remy Sharp"
													src="/mock-images/avatars/avatar_9.jpg"
												/>
											</ListItemAvatar>
											<ListItemText
												primary={
													<Typography variant="body1">
														Adrian Barrientos Choque
													</Typography>
												}
												secondary={
													<Typography variant="body2">Responsable</Typography>
												}
											/>
										</ListItem>
										<Divider sx={{ ml: 2, mr: 2 }} component="li" />
										<ListItem alignItems="flex-start" sx={{ py: 0, px: 3 }}>
											<ListItemAvatar>
												<Avatar
													alt="Remy Sharp"
													src="/mock-images/avatars/avatar_10.jpg"
												/>
											</ListItemAvatar>
											<ListItemText
												primary={
													<Typography variant="body1">
														Cesar Villanueva Alvarado
													</Typography>
												}
												secondary={
													<Typography variant="body2">Cajero</Typography>
												}
											/>
										</ListItem>
									</Box>
								</List>
							</Box>
						</Paper>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={7}
						lg={7}
						sx={{ background: blue[50] }}>
						<Paper sx={{ p: 2, borderRadius: 2 }}>
							<Box>
								<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
									Sucursales
								</Typography>
								<List
									sx={{
										width: '100%',

										borderRadius: 2,
									}}
									disablePadding>
									{companie.sucursales.map((sucursal, index) => (
										<Box key={index}>
											<ListItem alignItems="flex-start" sx={{ py: 0, px: 3 }}>
												<ListItemIcon
													sx={{
														mt: 2,
													}}>
													<Business />
												</ListItemIcon>
												<ListItemText
													primary={
														<Typography variant="body1">
															{sucursal.name}
														</Typography>
													}
													secondary={
														<Typography
															variant="body2"
															sx={{ fontStyle: 'italic' }}>
															{sucursal.direccion}
														</Typography>
													}
												/>
											</ListItem>
											<Divider sx={{ ml: 2, mr: 2 }} component="li" />
										</Box>
									))}
								</List>
							</Box>
							<Box>
								<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
									Productos
								</Typography>
							</Box>
							<Box>
								<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
									Ofertas
								</Typography>
								<Box></Box>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default CompanieProfile;
