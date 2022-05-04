import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { getUserDataAync } from './userSlice';

const initialState = {
	isAuth: false,
	isLoading: false,
	isAuthFailed: false,
	accessToken: null,
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		sayHello: (state) => {
			console.log('hello');
		},
		setAuth: (state) => {
			state.isAuth = true;
			state.isLoading = false;
			console.log(state.isAuth);
		},
		setLoading: (state) => {
			state.isLoading = true;
		},
		setAuthFailed: (state) => {
			state.isAuth = false;
			state.isLoading = false;
			state.isAuthFailed = true;
		},
		setLogout: (state) => {
			state.isAuth = false;
			state.accessToken = null;
			window.localStorage.removeItem('applicationState');
			window.localStorage.clear();
		},
		setToken: (state, { payload }) => {
			state.accessToken = payload;
			console.log('token->r :', payload);
		},
	},
});

export const loginAsync = (user) => async (dispatch) => {
	const data = {
		username: user.email,
		email: user.email,
		picture: user.imageUrl,
		nombres: user.givenName,
		apellidos: user.familyName,
	};
	try {
		const r = await API.post('/auth/login', data);
		console.log('login->r :', r);
		dispatch(setToken(r.data.idUser));
		await dispatch(getUserDataAync(r.data.idUser));
		dispatch(setAuth());
	} catch (e) {
		throw new Error(e);
	}
};
export const logoutAsync = (accessToken) => async (dispatch) => {
	try {
		const r = await API.post('/auth/logout');
		console.log('logOut->r :', r);
	} catch (e) {
		throw new Error(e);
	}
};
export const { setLoading, setAuth, setAuthFailed, setLogout, setToken } =
	loginSlice.actions;
export default loginSlice.reducer;
