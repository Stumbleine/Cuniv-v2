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
	const { rule } = useSelector((state) => state.user);
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
		const routeRole =
			rule === 'ADM' ? '/admin/' : rule === 'PRV' ? '/provider/' : null;
		const active = props.href
			? router.pathname === routeRole + props.href
			: false;
		return (
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
									sm: 'flex',
								},
							}}>
							<Link to="/" style={{ textDecoration: 'none' }}>
								<img
									src="/svgs/logoCuniv.svg"
									style={{ width: 'auto', height: 50 }}
								/>

								{/* <Typography
									variant="h5"
									sx={{
										fontWeight: 'bold',
										color: 'white',
									}}>
									CUNIV
								</Typography> */}
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
								flexGrow: 1,
								p: 1,
								display: { xs: 'flex', sm: 'none' },
								color: 'primary.main',
							}}>
							<img src="/logoCuniv.svg" style={{ width: 'auto', height: 50 }} />
							{/* <Typography>{logo}</Typography> */}
						</Box>

						{/* Contenendor de pestañas/pagesLinks */}
						<Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
							{rule !== 'Cajero' ? (
								<>
									<ItemNav href={'home'} text={'Inicio'} />
									<Divider orientation="vertical" flexItem variant="middle" />
								</>
							) : null}
							{rule !== 'CJR' ? (
								<>
									<ItemNav href={'offers'} text={'Ofertas'} />
									<Divider orientation="vertical" flexItem variant="middle" />
								</>
							) : null}

							{rule === 'ADM' ? (
								<>
									<ItemNav href={'supplierCompanies'} text={'Empresas'} />
									<Divider orientation="vertical" flexItem variant="middle" />
								</>
							) : null}

							{rule === 'PRV' ? (
								<>
									<ItemNav href={'products'} text={'Productos'} />
									<Divider orientation="vertical" flexItem variant="middle" />
								</>
							) : null}
							{rule === 'PRV' ? (
								<>
									<ItemNav href={'profileCompanie'} text={'myEmpresa'} />
									<Divider orientation="vertical" flexItem variant="middle" />
								</>
							) : null}
							{rule === 'ADM' ? (
								<>
									<ItemNav href={'users'} text={'Usuarios'} />
									<Divider orientation="vertical" flexItem variant="middle" />
								</>
							) : null}

							{rule !== 'CJR' ? (
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
