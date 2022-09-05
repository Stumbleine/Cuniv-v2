import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShowRoles from '../components/ShowRoles';
import ProfileOffers from '../components/lists/ProfileOffers';
import ProfileSucursals from '../components/lists/ProfileSucursals';
import ProfileProducts from '../components/lists/ProfileProducts';
import ProfileUsers from '../components/lists/ProfileUsers';
import {
	approveCompanieAsync,
	profileCompanieAsync,
	setCompanieProfile,
} from '../store/companiesSlice';
import SkeletonProfile from '../components/skeletons/SkeletonProfile';
import ProfileInfo from '../components/ProfileInfo';
import WarningVerified from '../components/WarningVerified';
import RejectCompanie from '../components/dialogs/RejectCompanie';

function CompanieProfile() {
	const dispatch = useDispatch();
	const { idCompanie } = useParams();
	const { user, isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const { profile, isLoading, fetchFailed } = useSelector(state => state.companies);
	useEffect(() => {
		document.title = 'ssansi | empresa';
		console.log(idCompanie, user?.companie, isAdmin);

		if (idCompanie) {
			dispatch(profileCompanieAsync(idCompanie, accessToken));
		} else if (user.companie && !isAdmin) {
			dispatch(profileCompanieAsync(user.companie, accessToken));
		} else {
			dispatch(setCompanieProfile(null));
		}
	}, []);

	useEffect(() => {
		if (profile) {
			document.title = 'ssansi | ' + profile?.companie?.razon_social;
		}
	}, [profile]);

	const msgCompanieNull = () => {
		return (
			<Stack maxWidth="lg" spacing={2} alignItems="center" sx={{ mt: 2 }}>
				<Typography>No ha registrado su empresa aun</Typography>
				<Typography color="textSecondary">
					registrar su empresa ayudara a que sus ofertas sean facilmente relacionadas con
					su empresa{' '}
				</Typography>

				<Button component={Link} to={`/main/registerCompanie`} variant="contained">
					Registrar Empresa
				</Button>
			</Stack>
		);
	};
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
			await dispatch(approveCompanieAsync(accessToken, profile?.companie.id_empresa));
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
		<Container maxWidth="lg">
			<ShowRoles />
			<Box>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						fontWeight: 'bold',
						color: 'text.title',
						fontStyle: 'italic',
					}}>
					Perfil
				</Typography>
				{user?.companieVerified === false && !isAdmin && (
					<WarningVerified>En proceso de verificacion.</WarningVerified>
				)}
				{isLoading && isAdmin ? (
					<SkeletonProfile />
				) : profile ? (
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<Paper sx={{ p: 2 }}>
								<Stack spacing={1}>
									<ProfileInfo companie={profile?.companie} />
									<ProfileSucursals sucursales={profile?.branch_offices} />
								</Stack>
							</Paper>
						</Grid>

						<Grid item xs={12} sm={12} md={6} lg={6}>
							<Paper sx={{ p: 2 }}>
								<Stack spacing={1}>
									<ProfileUsers users={profile?.users} />
									{/* lista de productos */}
									<ProfileProducts products={profile?.products} />
									{/* lista de ofertas */}
									<ProfileOffers offers={profile?.offers} />
									{isAdmin && !profile?.companie.verified && (
										<>
											<Typography sx={{ fontWeight: 'bold' }}>
												Responder a solicitud
											</Typography>
											<Box sx={{ display: 'flex', justifyContent: 'end' }}>
												<Button onClick={submitApprove}>Aprobar</Button>
												<RejectCompanie companie={profile?.companie} />
											</Box>
										</>
									)}
								</Stack>
							</Paper>
						</Grid>
					</Grid>
				) : isLoading ? (
					<SkeletonProfile />
				) : fetchFailed ? (
					<Typography align="center">Error al cargar informacion</Typography>
				) : (
					msgCompanieNull()
				)}
			</Box>
		</Container>
	);
}

export default CompanieProfile;
