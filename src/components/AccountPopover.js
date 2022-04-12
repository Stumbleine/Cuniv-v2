import {
	Avatar,
	Button,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import MenuPopover from './MenuPopover';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { alpha, styled } from '@mui/material/styles';
import { setLogout } from '../store/loginSlice';
import {
	Analytics,
	Group,
	Home,
	LocalOffer,
	Logout,
	Settings,
	ShoppingCart,
} from '@mui/icons-material';

const MENU_OPTIONS = [
	{
		label: 'Home',
		icon: 'eva:home-fill',
		linkTo: '/',
	},
	{
		label: 'Profile',
		icon: 'eva:person-fill',
		linkTo: '#',
	},
	{
		label: 'Settings',
		icon: 'eva:settings-2-fill',
		linkTo: '#',
	},
];
function AccountPopover() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.user);

	const [anchorElUser, setAnchorElUser] = useState(null);

	const [open, setOpen] = useState(false);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{ position: 'relative' }}>
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
						<Avatar alt={user.name} src={user.avatar} />
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
					<Typography variant="subtitle1" noWrap>
						{user.name}
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
				<MenuItem
					sx={{ typography: 'body2', py: 1, px: 2.5 }}
					component={RouterLink}
					onClick={() => {
						handleCloseUserMenu();
						dispatch(setLogout());
					}}
					to="home">
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
			</Menu>
		</Box>
	);
}

export default AccountPopover;
