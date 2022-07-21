import { Delete, Edit, Email, Facebook, Instagram, Language } from '@mui/icons-material';
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Divider,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { blue, grey, orange, pink, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { approveCompanieAsync } from '../../store/companiesSlice';
import RejectCompanie from '../dialogs/RejectCompanie';
import SnackCustom from '../SnackCustom';

export default function CompanieNV(props) {
	const companie = props.companie;
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const [snack, setSnack] = useState({
		open: false,
		msg: '',
		severity: 'success',
		redirectPath: null,
	});
	const closeSnack = () => {
		setSnack({ ...snack, open: false });
	};
	const handleSnack = (msg, sv, path) => {
		setSnack({ ...snack, open: true, msg: msg, severity: sv, redirectPath: path });
	};
	const submitApprove = () => {
		const approve = async () => {
			await dispatch(approveCompanieAsync(accessToken, companie.id_empresa));
		};
		approve()
			.then(() => {
				handleSnack('Item eliminado exitosamente', 'success');
			})
			.catch(() => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};

	return (
		<Card
			sx={{
				bgcolor: 'background.paper',
				borderRadius: 2,
				// height: 200,
			}}>
			<SnackCustom data={snack} closeSnack={closeSnack} />

			<CardActionArea
				component={Link}
				to={`/main/supplierCompanies/${companie.id_empresa}`}>
				<CardMedia
					component="img"
					height={140}
					alt={companie.razon_social}
					sx={{ backgroundRepeat: 'no-repeat' }}
					image={companie.logo}
				/>
			</CardActionArea>
			<CardContent sx={{ textAlign: 'start' }}>
				<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
					{companie.razon_social}
				</Typography>
				<Typography variant="body1">{companie.rubro}</Typography>
				<Typography variant="body1" color="textSecondary">
					{companie.email}
				</Typography>
				{/* <Box
						sx={{
							height: 100,
							overflow: 'hidden',
							// textOverflow: 'ellipsis',
							// whiteSpace: 'auto',
						}}>
						<Typography
							gutterBottom
							variant="body2"
							sx={{
								textOverflow: 'ellipsis',
								whiteSpace: 'normal',
							}}>
							{companie.descripcion}
						</Typography>
					</Box> */}
			</CardContent>
			<CardActions sx={{ justifyContent: 'end' }}>
				<Button onClick={submitApprove}>Aprobar</Button>
				<RejectCompanie companie={companie} />
			</CardActions>
		</Card>
	);
}
