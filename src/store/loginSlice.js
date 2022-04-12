import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuth: false,
	isLodaing: false,
	isAuthFailed: false,
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
			state.isLodaing = false;
			console.log(state.isAuth);
		},
		setLoading: (state) => {
			state.isLodaing = true;
		},
		setAuthFailed: (state) => {
			state.isAuth = false;
			state.isLodaing = false;
			state.isAuthFailed = true;
		},
		setLogout: (state) => {
			// state.isAuth = false;
			window.localStorage.removeItem('applicationState');
		},
	},
});

export const { setLoading, setAuth, setAuthFailed, setLogout } =
	loginSlice.actions;
export default loginSlice.reducer;
