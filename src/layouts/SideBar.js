import { useTheme } from '@emotion/react';
import { Avatar, Drawer, Link, MenuItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';

function SideBar({ openSideBar, onCloseSideBar }) {
	const theme = useTheme();
	const { pathname } = useLocation();
	const { user } = useSelector(state => state.user);
	const navlinks = useSelector(state => state.setting.navlinks);
	useEffect(() => {
		if (openSideBar) {
			onCloseSideBar();
		}
	}, [pathname]);
	return (
		<Drawer open={openSideBar} onClose={onCloseSideBar}>
			<Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
				<Link component={RouterLink} to="/" style={{ textDecoration: 'none' }}>
					<img src="/svgs/logoCuniv.svg" style={{ width: 'auto', height: 50 }} />

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
			<Box sx={{ mb: 5, mx: 2 }}>
				<Link underline="none" component={RouterLink} to="#">
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							p: 2,
							background: theme.palette.background.default,
							borderRadius: 3,
						}}>
						<Avatar src={user.picture} alt="photoURL" />
						<Box
							sx={{
								ml: 2,
							}}>
							<Typography
								variant="subtitle2"
								noWrap
								sx={{ color: 'text.primary', textTransform: 'lowercase' }}>
								{user.nombres + ' ' + user.apellidos}
							</Typography>
							<Typography variant="body2" sx={{ color: 'text.secondary' }}>
								Administrador
							</Typography>
						</Box>
					</Box>
				</Link>
			</Box>
			{/* contenido */}
			<Box sx={{ px: 2.5 }}>
				{navlinks.map(item => (
					<MenuItem
						key={item.name}
						sx={{ typography: 'body2', py: 2, px: 2, borderRadius: 2 }}
						component={RouterLink}
						to={item.path}>
						<img
							src={`/svgs/icons/nav/${item.icon}.svg`}
							alr="icon"
							style={{
								marginRight: '20px',
								width: 24,
								height: 24,
								color: 'text.primary',
							}}
						/>
						<img src=""></img>
						{item.name}
					</MenuItem>
				))}
			</Box>
		</Drawer>
	);
}

export default SideBar;
