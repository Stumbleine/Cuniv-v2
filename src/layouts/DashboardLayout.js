import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import NavBar from './NavBar';
import SideBar from './SideBar';
import NotificationSnack from '../components/NotificationSnack';
import socket from '../socket';
import { useDispatch, useSelector } from 'react-redux';
import { setBadge, setNewNoti } from '../store/settingSlice';
import Waterdrop from '../assets/water-drop.mp3';
import Footer from '../components/Footer';

const Page = styled('div')(({ theme }) => ({
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	position: 'relative',
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(10),
}));

/**
 * Component panel para la navegacion de dos formas, Sidebar y Navbar.
 * recibe las notificaciones a travez del socket, emite snackbar por cada notificacion sobre la pantalla.
 * @component
 */
function DashboardLayout() {
	const dispatch = useDispatch();
	const { user, isAdmin } = useSelector(state => state.user);
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

	const closeSnack = () => {
		setSnack({ ...snack, open: false });
	};
	const handleNotiSnack = data => {
		setSnack({ ...snack, open: true, body: data });
		playAudio();
		dispatch(setNewNoti(data));
		dispatch(setBadge(false));
	};

	const audioPlayer = useRef(null);

	function playAudio() {
		audioPlayer.current.play();
	}

	useEffect(() => {
		if (user !== null && isAdmin) {
			socket.on('web', data => {
				handleNotiSnack(data);
			});
		}
	}, []);

	return (
		<>
			<NavBar onOpenSidebar={() => setOpenSB(true)} />
			<SideBar openSideBar={openSB} onCloseSideBar={() => setOpenSB(false)} />
			<Page>
				<NotificationSnack data={snack} closeSnack={closeSnack} />
				<audio ref={audioPlayer} src={Waterdrop} />
				<Outlet />
				<Footer />
			</Page>
		</>
	);
}

export default DashboardLayout;
