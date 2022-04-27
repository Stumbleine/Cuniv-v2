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
import { blue, grey, pink } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Business,
	CheckCircle,
	Email,
	Facebook,
	Instagram,
	Language,
	LocalOffer,
} from '@mui/icons-material';
import { getCompanieAsync } from '../store/companiesSlice';

function CompanieProfile() {
	const { idEmpresa } = useParams();
	const dispatch = useDispatch();
	const [companie, setCompanie] = useState({});
	const [sucursales, setSucursales] = useState(null);
	const [offers, setOffers] = useState(null);
	const [productos, setProductos] = useState(null);
	const [proveedor, setProveedor] = useState({});
	const [users, setUsers] = useState({});

	useEffect(() => {
		const fetchEmpresa = async () => {
			const empresa = await dispatch(getCompanieAsync(idEmpresa));
			setCompanie(empresa.empresa);
			setSucursales(empresa.sucursales);
			setProductos(empresa.productos);
			setOffers(empresa.ofertas);
			setProveedor(empresa.proveedor);
			// setUsers(empresa.usuarios)
		};
		console.log('idparams', idEmpresa);
		fetchEmpresa();
	}, []);

	// const companie = companies[0];
	// const sucursales = companie.sucursales;
	// console.log(sucursales);
	return (
		<Container maxWidth="lg">
			<Box>
				<Box>
					<Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
						{companie?.razon_social} Perfil
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
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={5} lg={5}>
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
									alt={companie?.razon_social}
									src={companie?.logo}
									style={{
										width: 150,
										borderRadius: '50%',
										objectFit: 'cover',
									}}
								/>
								<Box sx={{ textAlign: 'center', mt: 2 }}>
									<Typography variant="h5">
										{companie?.razon_social}{' '}
									</Typography>
									<Typography variant="body1">
										{companie?.categoria}{' '}
									</Typography>
									<Typography variant="body1">
										+591 {companie?.telefono}{' '}
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										width: '100%',
										justifyContent: 'center',
										mt: 1,
									}}>
									{companie?.facebook ? (
										<IconButton onClick={() => window.open(companie?.facebook)}>
											<Facebook
												sx={{
													color: blue[500],
												}}></Facebook>
										</IconButton>
									) : null}
									{companie?.instagram ? (
										<IconButton
											onClick={() => window.open(companie?.instagram)}>
											<Instagram
												sx={{
													color: pink[500],
												}}></Instagram>
										</IconButton>
									) : null}
									{companie?.sitio_web ? (
										<IconButton
											onClick={() => window.open(companie?.sitio_web)}>
											<Language
												sx={{
													color: grey[700],
												}}></Language>
										</IconButton>
									) : null}
									{companie?.email ? (
										<IconButton>
											<Email
												sx={{
													color: blue[500],
												}}></Email>
										</IconButton>
									) : null}
								</Box>
							</Box>
						</Paper>

						<Paper sx={{ p: 2, mt: 1, borderRadius: 2 }}>
							<Box>
								<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
									Descripción
								</Typography>
								<Typography variant="body2" sx={{ mt: 1 }}>
									{companie?.descripcion}
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
													alt={proveedor.nombres}
													src="/mock-images/avatars/avatar_9.jpg"
													// src={proveedor.nombres}
												/>
											</ListItemAvatar>
											<ListItemText
												primary={
													<Typography variant="body1">
														{proveedor.nombres + proveedor.apellidos}
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

					<Grid item xs={12} sm={12} md={7} lg={7}>
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
									{sucursales?.map((sucursal, index) => (
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
															{sucursal.nombre}
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
							<Box sx={{ mt: 2 }}>
								<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
									Productos
								</Typography>
								<List
									sx={{
										width: '100%',
										maxHeight: 300,
										overflowY: 'scroll',
										borderRadius: 2,
									}}
									disablePadding>
									{productos?.map((p, index) => (
										<Box key={index}>
											<ListItem alignItems="flex-start" sx={{ py: 0, px: 3 }}>
												<ListItemIcon
													sx={{
														mt: 2,
													}}>
													<CheckCircle />
												</ListItemIcon>
												<ListItemText
													primary={
														<Typography variant="body1">{p.nombre}</Typography>
													}
													secondary={
														<>
															<Typography
																variant="body2"
																sx={{ fontStyle: 'italic' }}>
																{p.descripcion}
															</Typography>
															<Typography
																variant="body2"
																sx={{ fontStyle: 'italic' }}>
																{p.precio} Bs.
															</Typography>
														</>
													}
												/>
											</ListItem>
											<Divider sx={{ ml: 2, mr: 2 }} component="li" />
										</Box>
									))}
								</List>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
									Ofertas
								</Typography>
								<List
									sx={{
										width: '100%',
										maxHeight: 300,
										overflowY: 'scroll',
										borderRadius: 2,
									}}
									disablePadding>
									{offers?.map((o, index) => (
										<Box key={index}>
											<ListItem alignItems="flex-start" sx={{ py: 0, px: 3 }}>
												<ListItemIcon
													sx={{
														mt: 2,
													}}>
													<LocalOffer />
												</ListItemIcon>
												<ListItemText
													primary={
														<Typography variant="body1">{o.titulo}</Typography>
													}
													secondary={
														<>
															<Typography
																variant="body2"
																sx={{ fontStyle: 'italic' }}>
																{o.descuento}{' '}
																{o.tipo_descuento === 'Porcentual'
																	? '%'
																	: 'Bs.'}{' '}
																de descuento
															</Typography>
														</>
													}
												/>
											</ListItem>
											<Divider sx={{ ml: 2, mr: 2 }} component="li" />
										</Box>
									))}
								</List>
								<Box></Box>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
export const P = [
	{
		nombre: '1 Presa Broaster',
		precio: 22,
		descripcion: '1 presa + porción de papa + porción de arroz + platanitos',
	},
	{
		nombre: 'BIG 10 - Broaster',
		precio: 109,
		descripcion: '10 presas + 5 papas + 5 arroces',
	},
	{
		nombre: '2 Presas Broaster',
		precio: 26,
		descripcion: '2 Presas + porción de arroz + porción de papa + platanitos',
	},
	{
		nombre: 'Pipocas de pollo',
		precio: 24,
		descripcion: '10 pipocas + porción de papa + refresco ( pepsi o limonada )',
	},
	{
		nombre: 'Pepsi 1 litro',
		precio: 10,
		descripcion: 'Pepsi 1 Ltrs.)',
	},
	{
		nombre: 'Coca Cola',
		precio: 10,
		descripcion: 'Coca Cola 500 ml.)',
	},
];
export default CompanieProfile;
