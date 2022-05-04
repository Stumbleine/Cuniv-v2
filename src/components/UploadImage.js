import { Image } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';

function UploadImage({ handleChangeFile, formFather }) {
	const [uploadHover, setUploadHover] = useState(false);

	const [logo, setLogo] = useState(null);
	const handleChangeLogo = (e) => {
		console.log('changeLogo');
		console.log(e.target.files);
		handleChangeFile(e.target.files);
		setLogo(URL.createObjectURL(e.target.files[0]));
	};
	const styles = {
		BoxContainerCompanie: {
			width: '100%',
			minHeight: 210,
			display: 'center',
			justifyContent: 'center',
			alignItems: 'center',
		},
		BoxContaineroffer: {
			width: '100%',
			minHeight: 210,
		},
		BoxContainer2Companie: {
			width: 200,
			height: 200,
			border: 1,
			borderStyle: 'dashed',
			borderRadius: '50%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		BoxMouseoverOffer: {
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
		},
		BoxMouseoverCompanie: {
			width: '90%',
			height: '90%',
			display: 'flex',
			justifyContent: 'center',
			cursor: 'pointer',
			alignItems: 'center',
			borderRadius: '50%',
			position: 'relative',
			background: grey[200],
		},
		BoxImageOffer: {
			width: '100%',
			height: '100%',
			borderRadius: 5,
			objectFit: 'cover',
		},
		BoxImageCompanie: {
			width: '100%',
			height: '100%',
			borderRadius: '100%',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		},
	};
	return (
		<>
			<Box
				sx={
					formFather === 'companie'
						? styles.BoxContainerCompanie
						: styles.BoxContaineroffer
				}>
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
						sx={
							formFather === 'companie' ? styles.BoxContainer2Companie : null
						}>
						<Box
							component="span"
							onMouseOver={() => setUploadHover(true)}
							onMouseLeave={() => setUploadHover(false)}
							sx={
								formFather === 'companie'
									? styles.BoxMouseoverCompanie
									: styles.BoxMouseoverOffer
							}>
							{logo === null ? (
								<Box
									sx={{
										textAlign: 'center',
									}}>
									<Image></Image>
									<Typography>
										Subir {formFather === 'companie' ? 'logo' : 'imagen'}
									</Typography>
								</Box>
							) : (
								<Box
									component="img"
									src={logo}
									style={
										formFather === 'companie'
											? styles.BoxImageCompanie
											: styles.BoxImageOffer
									}
									sx={{ zIndex: 'modal' }}></Box>
							)}
							{uploadHover && logo != null ? (
								<Box
									sx={{
										width: '100%',
										height: '100%',
										background: 'rgba(31, 30, 31, 0.3)',
										zIndex: 'tooltip',
										borderRadius: formFather === 'companie' ? '50%' : 'inherit',
										position: 'absolute',
										textAlign: 'center',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<Box>
										<Image sx={{ color: 'white' }}></Image>
										<Typography sx={{ color: 'white' }}>
											Cambiar {formFather === 'companie' ? 'logo' : 'imagen'}
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
				<Typography variant="body2" color="textSecondary">
					imagenes de 300x200 y formato *.png *.jpg
				</Typography>

				<Typography variant="body2" color="textSecondary">
					tamaño max. 3 MB
				</Typography>
			</Box>
		</>
	);
}

export default UploadImage;
