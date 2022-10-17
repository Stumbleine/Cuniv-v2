import {
	Badge,
	Divider,
	IconButton,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { notificationsAsync, setBadge } from '../../store/settingSlice';
/**
 * Menu para mostrar notificaciones del sistema
 * @component Notifications
 * @exports Notifications
 */
export default function Notifications() {
	const dispatch = useDispatch();
	const { notilist, badge } = useSelector(state => state.setting);
	const { accessToken } = useSelector(state => state.login);
	const [anchorNoti, setAnchorNoti] = useState(null);
	const { isAdmin } = useSelector(state => state.user);
	/**
	 * Abre el menu y cambia el estado de badge en el store
	 * @function handleOpenNotiMenu
	 */
	const handleOpenNotiMenu = event => {
		setAnchorNoti(event.currentTarget);
		dispatch(setBadge(true));
	};
	/**
	 * cierra el menu
	 * @function handleCloseNotiMenu
	 */
	const handleCloseNotiMenu = () => {
		setAnchorNoti(null);
	};
	useEffect(() => {
		/**
		 * Peticion asincrona al store para la funcion notificationsAsync que devuelve lista de notificaciones
		 * @function {async} getNotis
		 */
		const getNotis = async () => {
			return await dispatch(notificationsAsync(accessToken));
		};
		isAdmin && getNotis();
	}, []);
	return (
		<Box sx={{ position: 'relative' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					alignContent: 'center',
					position: 'relative',
				}}>
				<Tooltip title="Notificaciones" sx={{}}>
					<IconButton onClick={handleOpenNotiMenu}>
						<Badge color="error" variant="dot" invisible={badge}>
							<NotificationsIcon sx={{ color: 'text.secondary' }} />
						</Badge>
					</IconButton>
				</Tooltip>
			</Box>

			<Menu
				sx={{
					mt: '40px',
					// borderRadius: 10,
				}}
				PaperProps={{ style: { borderRadius: 10, minWidth: 250 } }}
				id="menu-appbar"
				anchorEl={anchorNoti}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorNoti)}
				onClose={handleCloseNotiMenu}>
				<Box sx={{ my: 1, px: 2.5 }}>
					<Typography
						variant="subtitle1"
						component="span"
						display="flex"
						sx={{ fontWeight: 'bold', alignItems: 'center' }}>
						Notificaciones
						<Typography sx={{ ml: 1 }} variant="body2" color="textSecondary">
							(Recientes)
						</Typography>
					</Typography>
				</Box>
				<Divider sx={{ my: 1 }} />
				{notilist.length !== 0 &&
					notilist?.map((noti, index) => (
						<MenuItem
							sx={{ px: 2.5 }}
							component={RouterLink}
							onClick={handleCloseNotiMenu}
							selected={noti?.recent || false}
							key={index}
							to={
								noti?.id_empresa
									? `supplierCompanies/${noti.id_empresa}`
									: noti?.id_beneficio
									? `offers`
									: '/'
							}>
							<ListItemText
								primary={noti.title}
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: 'inline' }}
											component="span"
											variant="body2"
											color="text.secondary">
											{noti.msg}
										</Typography>
										{/* {" — Wish I could come, but I'm out of town this…"} */}
									</React.Fragment>
								}
							/>
						</MenuItem>
					))}
			</Menu>
		</Box>
	);
}
