import * as React from 'react';

import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Container,
	Button,
	Divider,
} from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useSelector, useDispatch } from 'react-redux';
import AccountPopover from '../components/AccountPopover';
import { screenSizes } from '../Utils/Breakpoints';
import Logo from '../components/Logo';
export default function NavBar({ onOpenSidebar }) {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const { rule } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navlinks = useSelector(state => state.setting.navlinks);
	//	functions

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	//	itemNav
	const ItemNav = props => {
		const router = useLocation();
		// const routeRole = rule === 'ADM' ? '/admin/' : rule === 'PRV' ? '/provider/' : null;
		const active = props.href ? router.pathname === '/main/' + props.href : false;
		return (
			<>
				<NavLink to={props.href} style={{ textDecoration: 'none' }}>
					<Button
						// size="small"
						sx={{
							color: active ? 'primary.main' : 'text.disabled',
							fontWeight: 'bold',
							fontStyle: 'italic',
							px: 1,
						}}>
						{props.text}
					</Button>
				</NavLink>
				{props.index !== navlinks.length - 1 && (
					<Divider orientation="vertical" flexItem variant="middle" />
				)}
			</>
		);
	};

	return (
		<>
			<AppBar
				position="static"
				elevation={1}
				sx={{
					background: 'white',
					zIndex: 'tooltip',
				}}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box
							component="div"
							sx={{
								mr: { xs: 0.5, md: 2 },
								display: {
									xs: 'none',
									md: navlinks.length > 8 ? 'none' : 'flex',
									lg: navlinks.length > 8 && 'flex',
								},
							}}>
							<Logo />
						</Box>

						{/* menu responsivo con items de pestañas */}
						<Box
							sx={{
								flexGrow: 1,
								display: {
									xs: 'flex',
									// md: 'none',
									md: navlinks.length > 8 ? 'flex' : 'none',
									lg: navlinks.length > 8 && 'none',
								},
							}}>
							<IconButton
								aria-controls="menu-appbar"
								size="large"
								aria-haspopup="true"
								onClick={onOpenSidebar}>
								<MenuIcon></MenuIcon>
							</IconButton>
						</Box>
						<Box
							component="div"
							sx={{
								flexGrow: 1,
								p: 1,
								display: {
									xs: 'flex',
									// md: 'none',
									md: navlinks.length > 8 ? 'flex' : 'none',
									lg: navlinks.length > 8 && 'none',
								},
							}}>
							<Logo />
						</Box>

						{/* Contenendor de pestañas/pagesLinks */}
						<Box
							sx={{
								display: {
									xs: 'none',
									// md: 'flex',
									md: navlinks.length > 8 ? 'none' : 'flex',
									lg: navlinks.length > 8 && 'flex',
								},
								flexGrow: 1,
							}}>
							{navlinks?.map((item, index) => (
								<ItemNav
									href={item.path}
									text={item.name}
									key={item.name}
									index={index}
								/>
							))}
						</Box>
						{screenSizes()}
						{/* <Box>
							<IconButton sx={{ ml: 1 }} onClick={changeMode}>
								{mode === 'dark' ? (
									<LightModeIcon sx={{ color: 'text.icon' }}></LightModeIcon>
								) : (
									<NightlightIcon sx={{ color: 'text.icon' }}></NightlightIcon>
								)}
							</IconButton>
						</Box> */}
						<AccountPopover />
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
}
