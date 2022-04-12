import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuth: false,
	isLoading: false,
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
			window.localStorage.removeItem('applicationState');
			window.localStorage.clear();
		},
	},
});

export const { setLoading, setAuth, setAuthFailed, setLogout } =
	loginSlice.actions;
export default loginSlice.reducer;
