import {
	Add,
	AddBox,
	AddRounded,
	Edit,
	Email,
	Facebook,
	Instagram,
	Language,
	Phone,
	StackedBarChart,
	Warning,
} from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { blue, grey, pink } from '@mui/material/colors';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { updateInfoAsync } from '../store/companiesSlice';
import EditCompanie from './dialogs/EditCompanie';
import EditCompanieField from './dialogs/EditCompanieField';
import SocialForm from './dialogs/SocialForm';
import SnackCustom from './SnackCustom';
import WarningVerified from './WarningVerified';

export default function ProfileInfo({ companie, handleSnack }) {
	const noSocial =
		companie?.facebook || companie?.instagram || companie?.sitio_web || companie?.email;

	const SocialList = () => {
		return (
			<>
				<Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
					<Facebook
						sx={{
							color: blue[500],
						}}
					/>
					<Typography
						sx={{ ml: 2 }}
						component="a"
						target="_blank"
						variant="body2"
						href={companie?.facebook}
						color="textSecondary">
						{companie?.facebook}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
					<Instagram
						sx={{
							color: pink[500],
						}}
					/>
					<Typography
						sx={{ ml: 2 }}
						component="a"
						target="_blank"
						variant="body2"
						href={companie?.instagram}
						color="textSecondary">
						{companie?.instagram}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
					<Language
						sx={{
							color: grey[700],
						}}
					/>
					<Typography
						sx={{ ml: 2 }}
						component="a"
						target="_blank"
						variant="body2"
						href={companie?.sitio_web}
						color="textSecondary">
						{companie?.sitio_web}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
					<Email
						sx={{
							color: blue[500],
						}}
					/>
					<Typography
						sx={{ ml: 2, cursor: 'pointer' }}
						component="u"
						onClick={() => {
							window.open(`mailto:${companie?.email}?subject=somosSANSI&body=Hola!`);
						}}
						variant="body2"
						color="textSecondary">
						{companie?.email}
					</Typography>
				</Box>
			</>
		);
	};

	return (
		<Stack spacing={1}>
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
						target.src = '/imgs/defaultImg.svg';
					}}
					style={{
						width: 150,
						height: 150,
						textAlign: 'center',
						borderRadius: '50%',
						objectFit: 'cover',
					}}
				/>
				<Box sx={{ textAlign: 'center', mt: 1 }}>
					<Box sx={{ display: 'flex', ml: 4, alignItems: 'center' }}>
						<Typography variant="h5">{companie?.razon_social} </Typography>
						<EditCompanie companie={companie} handleSnack={handleSnack} />
					</Box>
					{/* <Typography variant="body1">{companie?.rubro} </Typography> */}
					<Typography variant="body1"> {companie?.telefono} </Typography>
				</Box>
			</Box>

			<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
				Descripción
			</Typography>
			<Typography variant="body2" sx={{ whiteSpace: 'pre-line', pl: 2 }}>
				{companie?.descripcion}
			</Typography>
			<Typography
				component="div"
				variant="body1"
				sx={{ display: 'flex', fontWeight: 'bold', alignItems: 'center' }}>
				NIT:
				<Typography
					sx={{ ml: 1, fontStyle: !companie?.nit ? 'italic' : 'normal' }}
					color={!companie?.nit && 'textSecondary'}
					variant="body1">
					{companie?.nit} {!companie?.nit && 'sin nit'}
				</Typography>
			</Typography>
			<Typography
				component="div"
				variant="body1"
				sx={{ display: 'flex', fontWeight: 'bold', alignItems: 'center' }}>
				Rubro:
				<Typography sx={{ ml: 1 }} variant="body1">
					{companie?.rubro}
				</Typography>
			</Typography>

			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography sx={{ fontWeight: 'bold' }}>Redes sociales</Typography>
				{!noSocial ? (
					<SocialForm mode="add" companie={companie} handleSnack={handleSnack} />
				) : (
					<SocialForm mode="edit" companie={companie} handleSnack={handleSnack} />
				)}
			</Box>
			{!noSocial ? (
				<Typography
					sx={{ fontStyle: 'italic', pl: 2 }}
					color="textSecondary"
					variant="body1">
					No tiene redes sociales
				</Typography>
			) : (
				<SocialList />
			)}
		</Stack>
	);
}
