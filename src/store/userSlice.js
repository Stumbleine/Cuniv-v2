import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
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

export const logoutAsync = token => async dispatch => {
	try {
		const r = await API.get('user/logout', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setUser(null));
		dispatch(setIsAdmin(false));
		console.log('logOut->r :', r);
	} catch (e) {
		throw new Error(e);
	}
};
export const changePasswordAsync = (token, values) => async dispatch => {
	try {
		await API.post(`user/change-password`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (e) {
		throw new Error(e);
	}
};

export const updateAccountAsync = (token, values, imageFile) => async dispatch => {
	const b64 = imageFile ? await convertToB64(imageFile) : null;
	if (b64 !== null) {
		values = { ...values, picture: b64 };
	}
	console.log(values);
	try {
		await API.post(`user/update`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getUserAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
export const { setUser, setCompanie, setIsAdmin } = userSlice.actions;
export default userSlice.reducer;
