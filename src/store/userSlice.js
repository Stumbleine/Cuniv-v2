import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { setNavlinks } from './settingSlice';
const initialState = {
	user: {},
	isAdmin: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
			payload?.roles.forEach(r => {
				state.isAdmin = r.isadmin && true;
			});
		},
		setIsAdmin: (state, { payload }) => {
			state.isAdmin = payload;
		},
		setCompanie: (state, { payload }) => {
			state.user = { ...state.user, empresa: payload };
		},
		setPermissions: (state, { payload }) => {
			state.permissions = payload;
		},
	},
});

export const getUserAsync = token => async dispatch => {
	try {
		const r = await API.get(`user`, { headers: { Authorization: `Bearer ${token}` } });
		dispatch(setNavlinks(r.data.permisos));
		dispatch(setUser(r.data));
		console.log('usersFilter->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const { setUser, setCompanie, setIsAdmin } = userSlice.actions;
export default userSlice.reducer;
