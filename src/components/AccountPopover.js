import {
	Avatar,
	Button,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
	alpha,
} from '@mui/material';
import { Box } from '@mui/system';
import MenuPopover from './MenuPopover';
import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../store/loginSlice';
import { GoogleLogout } from 'react-google-login';
import {
	Analytics,
	Group,
	Home,
	LocalOffer,
	Logout,
	Settings,
	ShoppingCart,
} from '@mui/icons-material';
// import styled from '@emotion/styled';
function AccountPopover() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.user);
	const { isAuth } = useSelector((state) => state.login);

	const [anchorElUser, setAnchorElUser] = useState(null);
	const [open, setOpen] = useState(false);
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const logOut = () => {
		console.log('logg???');
		// renderProps.onClick();
		dispatch(setLogout());
		handleCloseUserMenu();
		// if (!isAuth) navigate('/', { replace: true });
	};
	// const ArrowStyle = styled('span')(({ theme }) => ({
	// 	[theme.breakpoints.up('sm')]: {
	// 		top: -7,
	// 		zIndex: 1,
	// 		width: 12,
	// 		right: 20,
	// 		height: 12,
	// 		content: "''",

	// 		position: 'absolute',
	// 		borderRadius: '0 0 4px 0',
	// 		transform: 'rotate(-135deg)',
	// 		background: 'black',
	// 		borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
	// 		borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
	// 	},
	// }));
	return (
		<Box sx={{ position: 'relative' }}>
			{/* <ArrowStyle className="arrow" /> */}
			<Box
				sx={{
					// backgroundColor: 'rgba(255, 255, 255, .90)',
					// backdropFilter: 'blur(10px)',
					display: 'flex',
					alignItems: 'center',
					alignContent: 'center',
					position: 'relative',
				}}>
				{/* <Box
					sx={{
						color: 'text.primary',
						mr: user.email ? 1 : 0,
					}}>
					<Typography sx={{ fontSize: 14, lineHeight: 1, fontWeight: 'bold' }}>
						{user.name}
					</Typography>
					<Typography variant="body2">{user.email}</Typography>
				</Box> */}
				<Tooltip title="Open settings" sx={{}}>
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
				sx={{ mt: '45px', minWidth: 250 }}
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
					<Typography
						variant="subtitle1"
						noWrap
						sx={{ textTransform: 'lowercase' }}>
						{user.nombres} {user.apellidos}
					</Typography>
					<Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
						{user.email}
					</Typography>
				</Box>
				<Divider sx={{ my: 1 }} />
				{/* Items */}
				<MenuItem
					sx={{ typography: 'body2', py: 1, px: 2.5 }}
					component={RouterLink}
					onClick={handleCloseUserMenu}
					to="home">
					<Home
						sx={{
							mr: 2,
							width: 24,
							height: 24,
							color: 'text.secondary',
						}}
					/>
					Home
				</MenuItem>
				<MenuItem
					sx={{ typography: 'body2', py: 1, px: 2.5 }}
					component={RouterLink}
					onClick={handleCloseUserMenu}
					to="home">
					<LocalOffer
						sx={{
							mr: 2,
							width: 24,
							height: 24,
							color: 'text.secondary',
						}}
					/>
					Ofertas
				</MenuItem>
				<MenuItem
					sx={{ typography: 'body2', py: 1, px: 2.5 }}
					component={RouterLink}
					onClick={handleCloseUserMenu}
					to="home">
					<ShoppingCart
						sx={{
							mr: 2,
							width: 24,
							height: 24,
							color: 'text.secondary',
						}}
					/>
					Productos
				</MenuItem>
				<MenuItem
					sx={{ typography: 'body2', py: 1, px: 2.5 }}
					component={RouterLink}
					onClick={handleCloseUserMenu}
					to="home">
					<Group
						sx={{
							mr: 2,
							width: 24,
							height: 24,
							color: 'text.secondary',
						}}
					/>{' '}
					Usuarios
				</MenuItem>
				<MenuItem
					sx={{ typography: 'body2', py: 1, px: 2.5 }}
					component={RouterLink}
					onClick={handleCloseUserMenu}
					to="home">
					<Analytics
						sx={{
							mr: 2,
							width: 24,
							height: 24,
							color: 'text.secondary',
						}}
					/>{' '}
					Estadisticas
				</MenuItem>
				<Divider sx={{ my: 1 }} />
				<MenuItem
					sx={{ typography: 'body2', py: 1, px: 2.5 }}
					component={RouterLink}
					onClick={handleCloseUserMenu}
					to="home">
					<Settings
						sx={{
							mr: 2,
							width: 24,
							height: 24,
							color: 'text.secondary',
						}}
					/>{' '}
					Cofiguracion
				</MenuItem>
				<GoogleLogout
					clientId={clientId}
					onLogoutSuccess={() => {
						console.log('logSucces');
					}}
					render={(renderProps) => (
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
