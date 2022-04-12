import { Delete, Edit, Facebook, Instagram } from '@mui/icons-material';
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
import { blue, orange, pink, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SupplierCompany(props) {
	const companie = props.companie;
	return (
		<Card
			sx={{
				/* width: 240, height: 270, */ bgcolor: 'background.paper',
				borderRadius: 2,
			}}>
			<CardActionArea
				component={Link}
				to={`/admin/supplierCompanies/${companie.razonSocial}`}>
				<CardMedia
					component="img"
					alt="green iguana"
					height="140"
					width="140"
					sx={{ backgroundRepeat: 'no-repeat' }}
					image={companie.logo}
				/>
			</CardActionArea>

			{/* <BgAvatar
					color="paper"
					src="/mock-images/avatars/shape-avatar.svg"
					sx={{
						width: 80,
						height: 36,
						zIndex: 9,
						bottom: 64,
						position: 'absolute',
					}}
				/> */}
			{/* <AvatarCustom alt="hello" src="/mock-images/avatars/avatar_3.jpg" /> */}
			<CardContent sx={{ p: 1, textAlign: 'center' }}>
				<Typography
					gutterBottom
					component="div"
					variant="subtitle1"
					noWrap
					sx={{ fontWeight: 'bold' }}>
					{companie.razonSocial}
				</Typography>
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
				{/* <Typography gutterBottom component="div" variant="body2">
					{companie.descripcion}
				</Typography> */}
			</CardContent>

			<Divider />
			<CardActions sx={{ p: 0, pb: 0.5, justifyContent: 'end' }}>
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
