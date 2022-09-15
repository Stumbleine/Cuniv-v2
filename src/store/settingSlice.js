import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import API from '../conection';
import { getNavlinks } from '../Utils/RBAC';

const initialState = {
	navlinks: [],
	notilist: [],
	badge: true,
	theme: {
		mode: 'light',
	},
};

const settingSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		setNavlinks: (state, { payload }) => {
			console.log('payload', payload);
			state.navlinks = getNavlinks(payload);
		},
		// para futuros temas
		setThemeMode: state => {
			let m = state.theme.mode === 'light' ? 'dark' : 'light';
			state.theme.mode = m;
		},
		setNewNoti: (state, { payload }) => {
			state.notilist = [...state.notilist, payload];
		},
		setBadge: (state, { payload }) => {
			state.badge = payload;
		},
		setNotifications: (state, { payload }) => {
			state.notilist = payload;
		},
	},
});

export const notificationsAsync = token => async dispatch => {
	try {
		const r = await API.get(`notification/notis`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setNotifications(r.data));
		console.log('Notis=>', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const { setNavlinks, setThemeMode, setNotifications, setBadge, setNewNoti } =
	settingSlice.actions;
export default settingSlice.reducer;
