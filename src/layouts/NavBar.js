import * as React from 'react';

import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	IconButton,
	Container,
	MenuItem,
	Button,
	Divider,
} from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useSelector, useDispatch } from 'react-redux';
import AccountPopover from '../components/AccountPopover';
import { setThemeMode } from '../store/settingSlice';
import {
	adminNavigation,
	providerNavigation,
} from '../assets/mocks/configNavigation';
export default function NavBar({ onOpenSidebar }) {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const { rule } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const mode = useSelector((state) => state.setting.theme.mode);
	//	functions
	const changeMode = () => {
		dispatch(setThemeMode());
	};
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const configNav = rule === 'ADM' ? adminNavigation : providerNavigation;

	//	itemNav
	const ItemNav = (props) => {
		const router = useLocation();
		const routeRole =
			rule === 'ADM' ? '/admin/' : rule === 'PRV' ? '/provider/' : null;
		const active = props.href
			? router.pathname === routeRole + props.href
			: false;
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
				{props.index !== configNav.length - 1 && (
					<Divider orientation="vertical" flexItem variant="middle" />
				)}
			</>
		);
	};
	const screenSizes = () => {
		return (
			<>
				<Typography
					sx={{ display: { xs: 'flex', sm: 'none' }, color: 'secondary.main' }}>
					xs
				</Typography>
				<Typography
					variant="6"
					sx={{
						display: { xs: 'none', sm: 'flex', md: 'none' },
						color: 'secondary.main',
					}}>
					sm
				</Typography>
				<Typography
					sx={{
						display: { xs: 'none', sm: 'none', md: 'flex', lg: 'none' },
						color: 'secondary.main',
					}}>
					md
				</Typography>
				<Typography
					sx={{
						display: {
							xs: 'none',
							sm: 'none',
							md: 'none',
							lg: 'flex',
							xl: 'none',
						},
						color: 'secondary.main',
					}}>
					lg
				</Typography>
				<Typography
					sx={{
						display: {
							xs: 'none',
							sm: 'none',
							md: 'none',
							lg: 'none',
							xl: 'flex',
						},
						color: 'secondary.main',
					}}>
					xl
				</Typography>
			</>
		);
	};
	return (
		<>
			<AppBar
				position="static"
				sx={{
					background: 'white',
					zIndex: 'tooltip',
				}}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box
							component="div"
							noWrap
							sx={{
								mr: { xs: 0.5, md: 2 },
								display: {
									xs: 'none',
									md: 'flex',
								},
							}}>
							<Link to="/" style={{ textDecoration: 'none' }}>
								<img
									src="/svgs/logoCuniv.svg"
									style={{ width: 'auto', height: 50 }}
								/>
							</Link>
						</Box>

						{/* menu responsivo con items de pestañas */}
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
							noWrap
							sx={{
								flexGrow: 1,
								p: 1,
								display: { xs: 'flex', md: 'none' },
								color: 'primary.main',
							}}>
							<img
								src="/svgs/logoCuniv.svg"
								style={{ width: 'auto', height: 50 }}
							/>
						</Box>

						{/* Contenendor de pestañas/pagesLinks */}
						<Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
							{configNav?.map((item, index) => (
								<ItemNav
									href={item.path}
									text={item.text}
									key={item.text}
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
