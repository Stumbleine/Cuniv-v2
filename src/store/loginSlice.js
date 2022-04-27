import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';

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
		},
	},
});

export const loginAsync = (user) => async (dispatch) => {
	const data = {
		username: user.email,
		email: user.email,
		picture: user.picture,
		nombres: user.givenName,
		apellidos: user.familyName,
	};
	try {
		const r = await API.post('/auth/login', user);
		console.log('login->r :', r);
		dispatch(setAuth());
		dispatch(setToken(r.data.accessToken));
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
