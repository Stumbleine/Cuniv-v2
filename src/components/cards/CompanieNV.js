import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import { useState } from 'react';
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
			}}>
			<SnackCustom data={snack} closeSnack={closeSnack} />

			<CardActionArea
				component={Link}
				to={`/main/supplierCompanies/${companie.id_empresa}`}>
				<CardMedia
					component="img"
					height={140}
					sx={{ backgroundRepeat: 'no-repeat', objectFit: !companie.logo && 'fill' }}
					onError={({ target }) => {
						target.onError = null;
						target.src = '/imgs/defaultImg.svg';
					}}
					image={companie?.logo || '/imgs/defaultImg.svg'}
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
			</CardContent>
			<CardActions sx={{ justifyContent: 'end' }}>
				<Button onClick={submitApprove}>Aprobar</Button>
				<RejectCompanie companie={companie} />
			</CardActions>
		</Card>
	);
}
