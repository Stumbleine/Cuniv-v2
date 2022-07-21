import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShowRoles from '../components/ShowRoles';
import ProfileOffers from '../components/lists/ProfileOffers';
import ProfileSucursals from '../components/lists/ProfileSucursals';
import ProfileProducts from '../components/lists/ProfileProducts';
import ProfileUsers from '../components/lists/ProfileUsers';
import { profileCompanieAsync, setCompanieProfile } from '../store/companiesSlice';
import SkeletonProfile from '../components/skeletons/SkeletonProfile';
import ProfileInfo from '../components/ProfileInfo';

function CompanieProfile() {
	const dispatch = useDispatch();
	const { idCompanie } = useParams();
	const { user } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const { profile, isLoading } = useSelector(state => state.companies);
	useEffect(() => {
		document.title = 'cuniv | perfilEmpresa';
		if (idCompanie) {
			dispatch(profileCompanieAsync(idCompanie, accessToken));
		} else if (user.companie) {
			dispatch(profileCompanieAsync(user.companie, accessToken));
		} else {
			dispatch(setCompanieProfile(null));
		}
	}, []);

	useEffect(() => {
		if (profile) {
			document.title = 'cuniv | ' + profile?.companie?.razon_social;
		}
	}, [profile]);

	const msgCompanieNull = () => {
		return (
			<Box>
				<Stack maxWidth="lg" spacing={2} alignItems="center" sx={{ mt: 2 }}>
					<Typography>No ha registrado su empresa aun</Typography>
					<Typography color="textSecondary">
						registrar su empresa ayudara a que sus ofertas sean facilmente relacionadas
						con su empresa{' '}
					</Typography>

					<Button component={Link} to={`/main/registerCompanie`} variant="contained">
						Registrar Empresa
					</Button>
				</Stack>
			</Box>
		);
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
				{isLoading ? (
					<SkeletonProfile />
				) : profile ? (
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={5} lg={5}>
							<Paper sx={{ p: 2 }}>
								<Stack spacing={2}>
									<ProfileInfo companie={profile?.companie} />
									<ProfileSucursals sucursales={profile?.branch_offices} />
									<ProfileUsers users={profile?.users} />
								</Stack>
							</Paper>
						</Grid>

						<Grid item xs={12} sm={12} md={7} lg={7}>
							<Paper sx={{ p: 2 }}>
								<Stack spacing={2}>
									{/* lista de productos */}
									<ProfileProducts products={profile?.products} />
									{/* lista de ofertas */}
									<ProfileOffers offers={profile?.offers} />
								</Stack>
							</Paper>
						</Grid>
					</Grid>
				) : (
					msgCompanieNull()
				)}
			</Box>
		</Container>
	);
}

export default CompanieProfile;
