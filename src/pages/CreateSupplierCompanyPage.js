import {
	Container,
	Typography,
	TextField,
	InputLabel,
	FormControl,
	Select,
	MenuItem,
	InputAdornment,
	Paper,
	Stack,
	TableRow,
	TableCell,
	Button,
	Card,
	IconButton,
	Grid,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { grey, orange, pink, cyan } from '@mui/material/colors';
import { Add, Camera, Delete, Edit, Image } from '@mui/icons-material';
import AddCompanyBranch from '../components/AddCompanyBranch';
import CompanyBranch from '../components/CompanyBranch';
function CreateSupplierCompanyPage() {
	const defaultSucursal = {
		name: 'Sucursal central',
		address: 's/n',
		position: {},
	};
	const [listSucursal, setListSucursal] = useState([defaultSucursal]);
	const [uploadHover, setUploadHover] = useState(false);
	const [logo, setLogo] = useState(null);
	const handleChangeLogo = (e) => {
		console.log(e.target.files);
		setLogo(URL.createObjectURL(e.target.files[0]));
	};
	const handleAddSucursal = (sucursal) => {
		setListSucursal([...listSucursal, sucursal]);
	};
	const sayHello = (data) => {
		console.log('HELLOOOOO', data);
	};
	useEffect(() => {
		console.log('SUCURSALES-REG=>', listSucursal);
	}, [listSucursal]);
	return (
		<Container maxWidth="lg">
			<Box>
				<Box>
					<Typography
						variant="h5"
						sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
						Añadir empresa proveedora
					</Typography>
				</Box>
				<Grid
					container
					spacing={2}
					sx={{
						background: pink[600],
					}}>
					<Grid item xs={12} md={6}>
						<Card sx={{ p: 2, borderRadius: 2 }}>
							<Box
								sx={{
									width: '100%',
									minHeight: 210,
									display: 'center',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<label htmlFor="contained-button-file">
									<TextField
										type="file"
										required
										multiple
										accept="image/*"
										id="contained-button-file"
										onChange={handleChangeLogo}
										sx={{ display: 'none' }}
									/>
									<Box
										sx={{
											width: 200,
											height: 200,
											border: 1,
											borderStyle: 'dashed',
											borderRadius: '50%',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}>
										<Box
											component="span"
											onMouseOver={() => setUploadHover(true)}
											onMouseLeave={() => setUploadHover(false)}
											sx={{
												width: '90%',
												height: '90%',
												display: 'flex',
												justifyContent: 'center',
												cursor: 'pointer',
												alignItems: 'center',
												borderRadius: '50%',
												position: 'relative',
												background: grey[200],
											}}>
											{logo === null ? (
												<Box
													sx={{
														textAlign: 'center',
													}}>
													<Image></Image>
													<Typography>Subir logo</Typography>
												</Box>
											) : (
												<Box
													component="img"
													src={logo}
													style={{
														width: '100%',
														height: '100%',
														borderRadius: '100%',
														backgroundRepeat: 'no-repeat',
														backgroundSize: 'cover',
														backgroundPosition: 'center',
													}}
													sx={{ zIndex: 'modal' }}></Box>
											)}
											{uploadHover && logo != null ? (
												<Box
													sx={{
														width: '100%',
														height: '100%',
														background: 'rgba(31, 30, 31, 0.3)',

														zIndex: 'tooltip',
														borderRadius: '50%',
														position: 'absolute',
														textAlign: 'center',
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
													}}>
													<Box>
														<Image sx={{ color: 'white' }}></Image>
														<Typography sx={{ color: 'white' }}>
															Subir logo
														</Typography>
													</Box>
												</Box>
											) : (
												<></>
											)}
										</Box>
									</Box>
								</label>
							</Box>
							<Box sx={{ width: '100%', textAlign: 'center', mt: 1 }}>
								<Typography variant="body2" sx={{ color: grey[700] }}>
									imagenes de 300x200 y formato *.png *.jpg
								</Typography>

								<Typography variant="body2" sx={{ color: grey[700] }}>
									tamaño max. 3 MB
								</Typography>
							</Box>
							<Box sx={{}}>
								<TextField
									required
									variant="outlined"
									label="Razon social"
									placeholder="razon social de la empresa"
									autoFocus
									InputProps={{
										style: {
											color: grey[900],
										},
									}}
									sx={{ width: '100%', mt: 2 }}
								/>
								<TextField
									required
									variant="outlined"
									label="Descripcion"
									placeholder="Descripcion"
									autoFocus
									InputProps={{
										style: {
											color: grey[900],
										},
									}}
									sx={{ width: '100%', mt: 2 }}
								/>
								<TextField
									required
									variant="outlined"
									label="NIT"
									placeholder="nit del negocio"
									autoFocus
									InputProps={{
										style: {
											color: grey[900],
										},
									}}
									sx={{ width: '100%', mt: 2 }}
								/>
								<TextField
									required
									variant="outlined"
									label="telefono"
									placeholder="telefono"
									autoFocus
									InputProps={{
										style: {
											color: grey[900],
										},
									}}
									sx={{ width: '100%', mt: 2 }}
								/>
								<Typography sx={{ fontWeight: 'bold', mt: 2 }}>
									Social
								</Typography>
								<TextField
									required
									size="small"
									variant="outlined"
									label="facebook"
									autoFocus
									InputProps={{
										style: {
											color: grey[900],
										},
									}}
									sx={{ width: '100%', mt: 1 }}
								/>
								<TextField
									required
									size="small"
									variant="outlined"
									label="instagram"
									autoFocus
									InputProps={{
										style: {
											color: grey[900],
										},
									}}
									sx={{ width: '100%', mt: 2 }}
								/>
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						{/* segundo panel */}
						<Card
							sx={{
								p: 2,
								borderRadius: 2,
								background: 'white',
								display: 'flex',
								justifyContent: 'space-between',
								flexDirection: 'column',
								direction: 'row',
							}}>
							<Box sx={{}}>
								{/* Agregar sucurusales */}

								<Box>
									<Box>
										<Typography sx={{ fontWeight: 'bold' }}>
											Sucursales
										</Typography>
										<Typography variant="body2">
											Se creo una sucursal por defecto, modifique sus datos
											(direccion, geolocalizacion)
										</Typography>
									</Box>
									<Stack
										direction="column"
										spacing={1}
										sx={{
											alignItems: 'center',
											mt: 1,
											p: 1,
											py: 2,
											borderRadius: 2,
											maxHeight: 250,
											background: grey[100],
											overflowY: 'scroll',
										}}>
										{listSucursal.length != 0 ? (
											listSucursal.map((sucursal, index) => (
												<CompanyBranch
													sucursal={sucursal}
													key={index}
													sayHello={sayHello}
												/>
											))
										) : (
											<Typography variant="body2" color="warning.main">
												Es necesario agregar al menos 1 sucursal
											</Typography>
										)}
									</Stack>
									<Box
										sx={{
											width: '100%',
											textAlign: 'end',
											mt: 1,
										}}>
										<AddCompanyBranch
											handleAddSucursal={handleAddSucursal}></AddCompanyBranch>
									</Box>
								</Box>

								<Box sx={{ width: '100%', mt: 1 }}>
									<Box sx={{}}>
										<Box>
											<Typography sx={{ fontWeight: 'bold' }}>
												Productos
											</Typography>
											<Typography variant="body2">
												Agregue los productos/servicios que ofrece,
											</Typography>
										</Box>

										<Stack
											direction="column"
											spacing={1}
											sx={{
												alignItems: 'center',
												mt: 1,
												p: 2,
												background: grey[100],
												borderRadius: 2,
											}}>
											{[1, 2, 3, 4].map((n, index) => (
												<Paper
													key={index}
													sx={{
														display: 'flex',
														alignItems: 'center',
														width: '90%',
														minWidth: 200,
														minHeight: 60,
														background: grey[50],
													}}>
													<Box sx={{ ml: 2 }}>
														<Typography variant="body1">
															NombreSucursal
														</Typography>
														<Typography variant="body2">
															direccion: av.asdasdadasd
														</Typography>
													</Box>
												</Paper>
											))}
										</Stack>
									</Box>
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									width: '100%',
									justifyContent: 'end',
									background: grey[50],
								}}>
								<Button size="small">Cancelar</Button>
								<Button size="small" sx={{ ml: 2 }} variant="contained">
									Crear Empresa??
								</Button>
							</Box>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default CreateSupplierCompanyPage;
