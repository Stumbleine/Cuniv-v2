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
	Grid,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState, forwardRef } from 'react';

import { grey, orange, pink, cyan, blue } from '@mui/material/colors';
import { CheckBox, Image } from '@mui/icons-material';

function CreateOfferPage() {
	const [discountType, setdiscountType] = useState(10);
	const handlediscountType = (event) => {
		setdiscountType(event.target.value);
	};
	const [uploadHover, setUploadHover] = useState(false);
	const handleChangeimage = (e) => {
		console.log(e.target.files);
		setimage(URL.createObjectURL(e.target.files[0]));
	};
	const [image, setimage] = useState(null);
	return (
		<Container maxWidth="lg">
			<Box>
				<Box>
					<Typography
						variant="h5"
						sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
						Crear nueva oferta
					</Typography>
				</Box>

				{/* <Box sx={{ display: 'flex', width: 1, background: pink[600] }}> */}
				<Grid
					container
					spacing={2}
					sx={{
						background: pink[600],
					}}>
					{/* primer panel(image y titulos) */}
					<Grid item xs={12} md={6} lg={6} sx={{ background: blue[200] }}>
						<Card sx={{ p: 2 }}>
							<Box
								sx={{
									width: '100%',
									minHeight: 250,
								}}>
								<label htmlFor="contained-button-file">
									<TextField
										type="file"
										required
										multiple
										accept="image/*"
										id="contained-button-file"
										onChange={handleChangeimage}
										sx={{ display: 'none' }}
									/>

									<Box
										component="span"
										onMouseOver={() => setUploadHover(true)}
										onMouseLeave={() => setUploadHover(false)}
										sx={{
											width: 'inherit',
											height: 250,
											display: 'flex',
											justifyContent: 'center',
											cursor: 'pointer',
											alignItems: 'center',
											borderRadius: 5,
											position: 'relative',
											background: grey[200],
											overflowY: 'hidden',
										}}>
										{image === null ? (
											<Box
												sx={{
													textAlign: 'center',
												}}>
												<Image></Image>
												<Typography>Subir imagen</Typography>
											</Box>
										) : (
											<Box
												component="img"
												src={image}
												style={{
													width: '100%',
													height: '100%',
													borderRadius: 5,
													objectFit: 'cover',
												}}
												sx={{ zIndex: 'modal' }}></Box>
										)}
										{uploadHover && image != null ? (
											<Box
												component="div"
												sx={{
													width: '100%',
													height: '100%',
													background: 'rgba(31, 30, 31, 0.3)',

													zIndex: 'tooltip',
													borderRadius: 'inherit',
													position: 'absolute',
													textAlign: 'center',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
												}}>
												<Box>
													<Image sx={{ color: 'white' }}></Image>
													<Typography sx={{ color: 'white' }}>
														Subir imagen
													</Typography>
												</Box>
											</Box>
										) : (
											<></>
										)}
									</Box>
								</label>
							</Box>
							<Box sx={{ width: '100%', textAlign: 'center', mt: 1 }}>
								<Typography variant="body2" sx={{ color: grey[700] }}>
									imagenes de 500x300 y formato *.png *.jpg
								</Typography>

								<Typography variant="body2" sx={{ color: grey[700] }}>
									tamaño max. 3 MB
								</Typography>
							</Box>
							{/* datos de la oferta */}
							<Box sx={{}}>
								<TextField
									required
									variant="outlined"
									label="titulo"
									placeholder="Titulo de oferta"
									autoFocus
									InputProps={{
										style: {
											color: grey[800],
										},
									}}
									sx={{ width: '100%', mt: 2 }}
								/>

								<Box
									sx={{
										mt: 2,
										width: '100%',
										display: 'flex',
									}}>
									<Box sx={{ width: '50%', mr: 1 }}>
										<InputLabel>Fecha inicio *</InputLabel>
										<TextField
											required
											variant="outlined"
											type="date"
											placeholder="Titulo de oferta"
											autoFocus
											InputProps={{
												style: {
													color: grey[800],
												},
											}}
											sx={{ width: '100%' }}
										/>
									</Box>

									<Box sx={{ width: '50%', ml: 1 }}>
										<InputLabel>Fecha fin *</InputLabel>
										<TextField
											required
											variant="outlined"
											type="date"
											placeholder="Titulo de oferta"
											autoFocus
											InputProps={{
												style: {
													color: grey[800],
												},
											}}
											sx={{ width: '100%' }}
										/>
									</Box>
								</Box>
								<Box sx={{ mt: 2, width: '100%' }}>
									<InputLabel>Tipo de descuento *</InputLabel>

									<Box
										sx={{
											display: 'flex',

											justifyContent: 'space-between',
											alignItems: 'center',
										}}>
										<FormControl sx={{ width: '35%' }}>
											<Select
												sx={{ width: '100%' }}
												value={discountType}
												onChange={handlediscountType}
												inputProps={{ 'aria-label': 'Without label' }}>
												<MenuItem value={10}>porcentaje</MenuItem>
												<MenuItem value={20}>monto</MenuItem>
												<MenuItem value={30}>descriptivo</MenuItem>
											</Select>
										</FormControl>
										<TextField
											required
											variant="outlined"
											placeholder={
												discountType === 30 ? 'ejem: lleva 2x1 ..' : ''
											}
											autoFocus
											InputProps={{
												style: {
													color: grey[800],
												},
												startAdornment:
													discountType === 10 ? (
														<InputAdornment position="start">%</InputAdornment>
													) : discountType === 20 ? (
														<InputAdornment position="start">
															Bs.
														</InputAdornment>
													) : (
														<></>
													),
											}}
											sx={{ width: '65%' }}
										/>
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>
					{/* segundo panel */}
					<Grid item xs={12} md={6} lg={6} sx={{ background: blue[50] }}>
						<Card
							sx={{
								p: 2,
								background: 'white',
								display: 'flex',
								justifyContent: 'space-between',
								flexDirection: 'column',
								direction: 'row',
							}}>
							<Box sx={{ display: 'flex' }}>
								<Box sx={{ width: '100%', p: 1 }}>
									<Box sx={{ mt: 3, width: '100%' }}>
										<TextField
											required
											label="Descripcion de productos y ofertas"
											variant="outlined"
											autoFocus
											multiline
											InputProps={{
												style: {
													color: grey[800],
												},
											}}
											sx={{ width: '100%' }}
										/>
									</Box>
									<Box sx={{ mt: 3, width: '100%' }}>
										<TextField
											variant="outlined"
											label="Condiciones de canje"
											autoFocus
											multiline
											InputProps={{
												style: {
													color: grey[800],
												},
											}}
											sx={{ width: '100%' }}
										/>
									</Box>
									<Box sx={{ mt: 3 }}>
										<Typography
											variant="subtitle1"
											color="text.secondary"
											sx={{ mb: 1 }}>
											Sucursales{' '}
										</Typography>
										<Stack
											direction="column"
											spacing={1}
											sx={{
												alignItems: 'center',
												bgcolor: 'grey.100',
												py: 2,
												borderRadius: 2,
												overflowY: 'scroll',
												height: 246,
											}}>
											{[1, 2, 3, 4, 5, 6].map((n, index) => (
												<Paper
													key={index}
													sx={{
														display: 'flex',
														alignItems: 'center',
														width: '90%',
														minWidth: 200,
														minHeight: 60,
														bgcolor: 'background.paper',
													}}>
													<CheckBox sx={{ ml: 1 }} />
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
									mt: 2,
								}}>
								<Button size="small">Cancelar</Button>
								<Button size="small" sx={{ ml: 2 }} variant="contained">
									Crear Oferta
								</Button>
							</Box>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default CreateOfferPage;
