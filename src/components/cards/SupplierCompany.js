import { Edit, Email, Facebook, Instagram, Language } from '@mui/icons-material';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Divider,
	IconButton,
	Tooltip,
	Typography,
} from '@mui/material';
import { blue, grey, pink } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCompanieAsync } from '../../store/companiesSlice';
import DeleteItem from '../dialogs/DeleteItem';

function SupplierCompany({ companie, handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);

	const deleteAsync = id => {
		const delet = async () => {
			await dispatch(deleteCompanieAsync(accessToken, id));
		};
		delet()
			.then(r => {
				handleSnack('Usuario eliminado exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};

	return (
		<Card
			sx={{
				bgcolor: 'background.paper',
				borderRadius: 2,
			}}>
			<CardActionArea
				component={Link}
				to={`/main/supplierCompanies/${companie.id_empresa}`}>
				<CardMedia
					component="img"
					alt={companie.razon_social}
					height="140"
					width="140"
					sx={{ backgroundRepeat: 'no-repeat', objectFit: !companie.logo && 'fill' }}
					onError={({ target }) => {
						target.onError = null;
						target.src = '/imgs/defaultImg.svg';
					}}
					image={companie?.logo || '/imgs/defaultImg.svg'}
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
								}}
							/>
						</IconButton>
					) : null}
					{companie.instagram ? (
						<IconButton onClick={() => window.open(companie.instagram)}>
							<Instagram
								sx={{
									color: pink[500],
								}}
							/>
						</IconButton>
					) : null}
					{companie.sitio_web ? (
						<IconButton onClick={() => window.open(companie.sitio_web)}>
							<Language
								sx={{
									color: grey[700],
								}}
							/>
						</IconButton>
					) : null}
					{companie.email ? (
						<IconButton
							onClick={e => {
								window.location = 'mailto:' + companie.email;
								e.preventDefault();
							}}
							title="support@example.com">
							<Email
								sx={{
									color: blue[500],
								}}
							/>
						</IconButton>
					) : null}
				</Box>
			</CardContent>

			<Divider />
			<CardActions sx={{ justifyContent: 'end' }}>
				<Tooltip title="Editar informacion">
					<IconButton
						component={Link}
						size="small"
						to={`/main/supplierCompanies/${companie.id_empresa}`}>
						<Edit
							sx={{
								// fontSize: 22,
								color: 'text.icon',
								'&:hover': {
									color: 'warning.light',
								},
							}}
						/>
					</IconButton>
				</Tooltip>
				<DeleteItem
					deleteAsync={deleteAsync}
					id={companie.id_empresa}
					itemName={companie.razon_social}
				/>
			</CardActions>
		</Card>
	);
}

export default SupplierCompany;
