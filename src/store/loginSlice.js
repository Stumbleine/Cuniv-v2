import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import API from '../conection';
import { setNavlinks } from './settingSlice';
import { getUserAsync, setUser } from './userSlice';

const initialState = {
	isAuth: false,
	isLoading: false,
	isAuthFailed: false,
	accessToken: null,
	registerSuccess: false,
	registerFailed: false,
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setAuth: state => {
			state.isAuth = true;
			state.isLoading = false;
			state.isAuthFailed = false;
		},
		setLoading: state => {
			state.isLoading = true;
		},
		setAuthFailed: state => {
			state.isAuth = false;
			state.isLoading = false;
			state.isAuthFailed = true;
		},
		setToken: (state, { payload }) => {
			state.accessToken = payload;
			console.log('token->r :', payload);
		},
		setLogout: state => {
			state.accessToken = null;
			state.isAuth = false;
		},
		setRegister: state => {
			state.registerSuccess = true;
			state.registerFailed = false;
			state.isLoading = false;
		},
		setRegisterFailed: state => {
			state.registerSuccess = false;
			state.registerFailed = true;
			state.isLoading = false;
		},
	},
});
export const loginAsync = user => async dispatch => {
	console.log(user);
	dispatch(setLoading());
	try {
		const r = await API.post('auth/login', user);
		console.log('loginManual->r :', r);
		dispatch(setToken(r.data.token));
		// dispatch(setAuth());
		await dispatch(getUserAsync(r.data.token));
		dispatch(setAuth());
	} catch (e) {
		dispatch(setAuthFailed(true));
		throw new Error(e);
	}
};

export const loginGoogleAsync = user => async dispatch => {
	const data = {
		username: user.email,
		email: user.email,
		picture: user.imageUrl,
		nombres: user.givenName,
		apellidos: user.familyName,
	};
	try {
		const r = await API.post('auth/auth-google', data);
		console.log('login->r :', r);
		dispatch(setToken(r.data.token));
		await dispatch(getUserAsync(r.data.token));
		dispatch(setAuth());
	} catch (e) {
		throw new Error(e);
	}
};

export const registerAsync = user => async dispatch => {
	let succes = false;
	dispatch(setLoading());
	try {
		const r = await API.post('auth/register', user);
		dispatch(setRegister());
		succes = true;
	} catch (e) {
		dispatch(setRegisterFailed());
		throw new Error(e);
	}
	return succes;
};

export const forgotPassword = values => async dispatch => {
	dispatch(setLoading());
	try {
		const r = await API.post('auth/forgot-password', values);
		dispatch(setRegister());
	} catch (e) {
		throw new Error(e);
	}
};

export const {
	setLoading,
	setAuth,
	setAuthFailed,
	setLogout,
	setToken,
	setRegister,
	setRegisterFailed,
} = loginSlice.actions;
export default loginSlice.reducer;
