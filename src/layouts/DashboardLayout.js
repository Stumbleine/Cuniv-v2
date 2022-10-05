import '../styles/scroll.css';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import NavBar from './NavBar';
import SideBar from './SideBar';
import NotificationSnack from '../components/NotificationSnack';
import socket from '../socket';
import { useDispatch, useSelector } from 'react-redux';
import { setBadge, setNewNoti } from '../store/settingSlice';
import Tuturu from '../assets/tuturuuu.mp3';
import Waterdrop from '../assets/water-drop.mp3';

const ContainerStyle = styled('div')(({ theme }) => ({
	overflow: 'auto',
	// minHeight: '92vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
}));
function DashboardLayout() {
	const dispatch = useDispatch();
	const { user, isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const [openSB, setOpenSB] = useState(false);
	const [snack, setSnack] = useState({
		open: false,
		body: {
			title: 'Nueva empresa',
			msg: 'Panchita SRL se ha registrado.',
			id_empresa: 5,
		},
		redirectPath: null,
	});

	const audioPlayer = useRef(null);
	function playAudio() {
		audioPlayer.current.play();
	}

	const closeSnack = () => {
		setSnack({ ...snack, open: false });
	};
	const handleSnack = data => {
		setSnack({ ...snack, open: true, body: data });
		playAudio();
		dispatch(setNewNoti(data));
		dispatch(setBadge(false));
	};

	useEffect(() => {
		if (user !== null && isAdmin) {
			socket.on('web', data => {
				handleSnack(data);
			});
		}
	}, []);

	return (
		<>
			<NavBar onOpenSidebar={() => setOpenSB(true)} />
			<SideBar openSideBar={openSB} onCloseSideBar={() => setOpenSB(false)} />
			<ContainerStyle className="container">
				<NotificationSnack data={snack} closeSnack={closeSnack} />
				<audio ref={audioPlayer} src={Waterdrop} />
				<Outlet />
			</ContainerStyle>
		</>
	);
}

export default DashboardLayout;
