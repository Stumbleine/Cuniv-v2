import { Email, Facebook, Instagram, Language, Warning } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { blue, grey, pink } from '@mui/material/colors';
import React from 'react';
import WarningVerified from './WarningVerified';

export default function ProfileInfo(props) {
	const { companie } = props;
	return (
		<>
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
					onError={({ target }) => {
						target.onError = null;
						target.src = '/imgs/default_image.png';
					}}
					style={{
						width: 150,
						height: 150,
						textAlign: 'center',
						borderRadius: '50%',
						objectFit: 'cover',
					}}
				/>
				<Box sx={{ textAlign: 'center', mt: 2 }}>
					<Typography variant="h5">{companie?.razon_social} </Typography>
					<Typography variant="body1">{companie?.categoria} </Typography>
					<Typography variant="body1">+591 {companie?.telefono} </Typography>
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
						<IconButton onClick={() => window.open(companie?.instagram)}>
							<Instagram
								sx={{
									color: pink[500],
								}}></Instagram>
						</IconButton>
					) : null}
					{companie?.sitio_web ? (
						<IconButton onClick={() => window.open(companie?.sitio_web)}>
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
			<WarningVerified>Empresa no verificada</WarningVerified>
			<Box>
				<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
					Descripción
				</Typography>
				<Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
					{companie?.descripcion}
				</Typography>
			</Box>
		</>
	);
}
