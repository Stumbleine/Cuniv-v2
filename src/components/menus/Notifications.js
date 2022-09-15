import {
	Avatar,
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
import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Lock, Logout, Person } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { notificationsAsync, setBadge } from '../../store/settingSlice';
export default function Notifications() {
	const dispatch = useDispatch();
	const { notilist, badge } = useSelector(state => state.setting);

	const { accessToken } = useSelector(state => state.login);
	const [anchorNoti, setAnchorNoti] = useState(null);
	const { user, isAdmin } = useSelector(state => state.user);

	const handleOpenUserMenu = event => {
		setAnchorNoti(event.currentTarget);
		dispatch(setBadge(true));
	};

	const handleCloseUserMenu = () => {
		setAnchorNoti(null);
	};
	useEffect(() => {
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
					<IconButton onClick={handleOpenUserMenu}>
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
				PaperProps={{ style: { borderRadius: 7, minWidth: 250 } }}
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
				onClose={handleCloseUserMenu}>
				<Box sx={{ my: 1, px: 2.5 }}>
					<Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold' }}>
						Notificaciones
					</Typography>
				</Box>
				<Divider sx={{ my: 1 }} />
				{notilist.length !== 0 &&
					notilist?.map((noti, index) => (
						<MenuItem
							sx={{ px: 2.5 }}
							// component={RouterLink}
							onClick={handleCloseUserMenu}
							key={index}
							// to={
							// 	noti.id_empresa
							// 		? `supplierCompanies/${noti.id_empresa}`
							// 		: noti.id_beneficio && `offers`
							// }
						>
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
