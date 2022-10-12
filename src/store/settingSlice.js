import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { getNavlinks } from '../Utils/RBAC';

const initialState = {
	navlinks: [],
	notilist: [],
	badge: true,
};

const settingSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		setNavlinks: (state, { payload }) => {
			state.navlinks = getNavlinks(payload);
		},

		setNewNoti: (state, { payload }) => {
			const noti = { ...payload, recent: true };
			state.notilist = [noti, ...state.notilist];
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

export const { setNavlinks, setNotifications, setBadge, setNewNoti } =
	settingSlice.actions;
export default settingSlice.reducer;
