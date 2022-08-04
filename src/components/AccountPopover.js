import {
	Avatar,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../store/loginSlice';
import { GoogleLogout } from 'react-google-login';
import { Logout, Person } from '@mui/icons-material';
import { setUser } from '../store/userSlice';
import { setNavlinks } from '../store/settingSlice';
function AccountPopover() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(state => state.user.user);

	const [anchorElUser, setAnchorElUser] = useState(null);
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const logOut = () => {
		dispatch(setLogout());
		dispatch(setUser(null));
		dispatch(setNavlinks([]));
		handleCloseUserMenu();
		// renderProps.onClick();
	};
	return (
		<Box sx={{ position: 'relative' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					alignContent: 'center',
					position: 'relative',
				}}>
				<Tooltip title="Abrir perfil" sx={{}}>
					<IconButton
						onClick={handleOpenUserMenu}
						sx={{
							p: 0,
						}}>
						<Avatar alt={user.nombres} src={user?.picture} />
					</IconButton>
				</Tooltip>
			</Box>

			<Menu
				sx={{
					mt: '45px',
					minWidth: 250,
				}}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}>
				<Box sx={{ my: 1, px: 2.5 }}>
					<Typography variant="subtitle1" noWrap sx={{ textTransform: 'lowercase' }}>
						{user.nombres} {user.apellidos}
					</Typography>
					<Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
						{user.email}
					</Typography>
				</Box>
				<Divider sx={{ my: 1 }} />
				{/* Items */}
				{/* <Divider sx={{ my: 1 }} /> */}
				<MenuItem
					sx={{ typography: 'body2', py: 1, px: 2.5 }}
					component={RouterLink}
					onClick={handleCloseUserMenu}
					to="home">
					<Person
						sx={{
							mr: 2,
							width: 24,
							height: 24,
							color: 'text.secondary',
						}}
					/>{' '}
					Perfil
				</MenuItem>
				<GoogleLogout
					clientId={clientId}
					onLogoutSuccess={() => {
						console.log('logSucces');
					}}
					render={renderProps => (
						<MenuItem
							sx={{ typography: 'body2', py: 1, px: 2.5 }}
							// component={RouterLink}
							onClick={() => logOut()}>
							<Logout
								sx={{
									mr: 2,
									width: 24,
									height: 24,
									color: 'text.secondary',
								}}
							/>{' '}
							Cerrar Sesion
						</MenuItem>
					)}
				/>
			</Menu>
		</Box>
	);
}

export default AccountPopover;
