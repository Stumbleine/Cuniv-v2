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
} from '@mui/material';
import Menu from '@mui/material/Menu';
import { Link, NavLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useSelector, useDispatch } from 'react-redux';
import AccountPopover from './AccountPopover';
import { orange } from '@mui/material/colors';
import { setLogout } from '../store/loginSlice';
export default function NavBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const user = useSelector((state) => state.user.user);
	/*   const [anchorElUser, setAnchorElUser] = React.useState(null); */

	const dispatch = useDispatch();
	//	functiosns
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const logo = 'CUNIV';

	//	itemNav
	const ItemNav = (props) => {
		const router = useLocation();
		console.log(props.href, router.pathname);
		const active = props.href
			? router.pathname === '/admin/' + props.href
			: false;
		return (
			<NavLink to={props.href} style={{ textDecoration: 'none' }}>
				<Button
					sx={{
						my: 2,
						color: active ? orange[300] : 'white',
						fontWeight: 'bold',
					}}>
					{props.text}
				</Button>
			</NavLink>
		);
	};
	const screenSizes = () => {
		return (
			<>
				<Typography variant="h6" sx={{ display: { xs: 'flex', sm: 'none' } }}>
					[ xs ]
				</Typography>
				<Typography
					variant="6"
					sx={{ display: { xs: 'none', sm: 'flex', md: 'none' } }}>
					[ sm ]
				</Typography>
				<Typography
					variant="h6"
					sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'none' } }}>
					[ md ]
				</Typography>
				<Typography
					variant="h6"
					sx={{
						display: {
							xs: 'none',
							sm: 'none',
							md: 'none',
							lg: 'flex',
							xl: 'none',
						},
					}}>
					[ lg ]
				</Typography>
				<Typography
					variant="h6"
					sx={{
						display: {
							xs: 'none',
							sm: 'none',
							md: 'none',
							lg: 'none',
							xl: 'flex',
						},
					}}>
					[ xl ]
				</Typography>
			</>
		);
	};
	return (
		<>
			<AppBar
				position="static"
				elevation={0}
				sx={{
					// background: 'grey',
					zIndex: 'tooltip',
				}}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box
							component="div"
							noWrap
							sx={{
								mr: 2,
								display: {
									xs: 'none',
									sm: 'flex',
								},
							}}>
							<Link to="/" style={{ textDecoration: 'none' }}>
								<Typography
									variant="h5"
									sx={{
										fontWeight: 'bold',
										color: 'white',
									}}>
									CUNIV
								</Typography>
							</Link>
						</Box>

						{/* menu responsivo con items de pestañas */}
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
							<IconButton
								aria-controls="menu-appbar"
								size="large"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit">
								<MenuIcon></MenuIcon>
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
								keepMounted
								transformOrigin={{ vertical: 'top', horizontal: 'left' }}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
									zIndex: 'tooltip',
								}}>
								<Link to="/" style={{ textDecoration: 'none' }}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography
											textAlign="center"
											sx={{ color: 'text.primary' }}>
											Home
										</Typography>
									</MenuItem>
								</Link>
								<Link to="/about" style={{ textDecoration: 'none' }}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography
											textAlign="center"
											sx={{ color: 'text.primary' }}>
											Ofertas
										</Typography>
									</MenuItem>
								</Link>
								<Link to="/portfolio" style={{ textDecoration: 'none' }}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography
											textAlign="center"
											sx={{ color: 'text.primary' }}>
											Empresas
										</Typography>
									</MenuItem>
								</Link>
								<Link to="/contact" style={{ textDecoration: 'none' }}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography
											textAlign="center"
											sx={{ color: 'text.primary' }}>
											Estudiantes
										</Typography>
									</MenuItem>
								</Link>
								<Link to="/contact" style={{ textDecoration: 'none' }}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography
											textAlign="center"
											sx={{ color: 'text.primary' }}>
											Cajeros
										</Typography>
									</MenuItem>
								</Link>
							</Menu>
						</Box>
						{/* Logo para pantallas pequeñas */}
						{/*           <Typography
            variant="h6"
            noWrap
            component="div"
            id="logo"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            {logo}
            {screenSizes()}
          </Typography> */}
						<Box
							component="div"
							noWrap
							sx={{
								mr: 2,
								flexGrow: 1,
								display: { xs: 'flex', sm: 'none' },
								color: 'primary.main',
							}}>
							<Typography>{logo}</Typography>
						</Box>

						{/* Contenendor de pestañas/pagesLinks */}
						<Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
							<ItemNav href={'home'} text={'Home'} />

							{user.role !== 'Cajero' ? (
								<ItemNav href={'offers'} text={'Ofertas'} />
							) : null}

							{user.role === 'Administrador' ? (
								<ItemNav href={'supplierCompanies'} text={'Empresas'} />
							) : null}
							{user.role === 'Aministrador' ? (
								<ItemNav href={'users'} text={'Usuarios'} />
							) : null}
							{user.role !== 'Cajero' ? (
								<ItemNav href={'statics'} text={'Estadisticas'} />
							) : null}
						</Box>
						{screenSizes()}
						<AccountPopover />
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
}
