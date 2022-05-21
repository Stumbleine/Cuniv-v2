import {
	Delete,
	Edit,
	Email,
	Facebook,
	Instagram,
	Language,
} from '@mui/icons-material';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';
import { blue, grey, orange, pink, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SupplierCompany(props) {
	const companie = props.companie;
	return (
		<Card
			sx={{
				bgcolor: 'background.paper',
				borderRadius: 2,
			}}>
			<CardActionArea
				component={Link}
				to={`/admin/supplierCompanies/${companie.id_empresa}`}>
				<CardMedia
					component="img"
					alt={companie.razon_social}
					height="140"
					width="140"
					sx={{ backgroundRepeat: 'no-repeat' }}
					image={companie.logo}
				/>
			</CardActionArea>
			<CardContent sx={{ textAlign: 'center' }}>
				<Typography
					gutterBottom
					component="div"
					variant="subtitle1"
					noWrap
					sx={{ fontWeight: 'bold' }}>
					{companie.razon_social}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						justifyContent: 'center',
					}}>
					{companie.facebook ? (
						<IconButton onClick={() => window.open(companie.facebook)}>
							<Facebook
								sx={{
									color: blue[500],
								}}></Facebook>
						</IconButton>
					) : null}
					{companie.instagram ? (
						<IconButton onClick={() => window.open(companie.instagram)}>
							<Instagram
								sx={{
									color: pink[500],
								}}></Instagram>
						</IconButton>
					) : null}
					{companie.sitio_web ? (
						<IconButton onClick={() => window.open(companie.sitio_web)}>
							<Language
								sx={{
									color: grey[700],
								}}></Language>
						</IconButton>
					) : null}
					{companie.email ? (
						<IconButton
							onClick={(e) => {
								window.location = 'mailto:' + companie.email;
								e.preventDefault();
								// Linking.openURL(
								// 	'mailto:support@example.com?subject=SendMail&body=Description'
								// );
							}}
							title="support@example.com">
							<Email
								sx={{
									color: blue[500],
								}}></Email>
						</IconButton>
					) : null}
				</Box>
				{/* <Typography gutterBottom component="div" variant="body2">
					{companie.descripcion}
				</Typography> */}
			</CardContent>

			<Divider />
			<CardActions sx={{ justifyContent: 'end' }}>
				<IconButton size="small">
					<Edit
						sx={{
							color: 'text.icon',
							'&:hover': {
								color: orange[400],
							},
						}}></Edit>
				</IconButton>
				<IconButton size="small">
					<Delete
						sx={{
							color: 'text.icon',
							'&:hover': {
								color: red[400],
							},
						}}
					/>
				</IconButton>
			</CardActions>
		</Card>
	);
}

export default SupplierCompany;
