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
				r.isadmin === true && (state.isAdmin = true);
			});
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
		console.log('userData->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};
export const { setUser, setCompanie } = userSlice.actions;
export default userSlice.reducer;
