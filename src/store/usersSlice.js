import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
const initialState = {
	users: null,
	isLoading: false,
	filterLoading: false,
	fetchFailed: false,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers: (state, { payload }) => {
			state.users = payload;
			state.isLoading = false;
			state.filterLoading = false;
		},
		setLoading: state => {
			state.isLoading = true;
			state.fetchFailed = false;
		},
		setFilterLoading: state => {
			state.filterLoading = true;
			state.fetchFailed = false;
		},
		setFetchFailed: state => {
			state.fetchFailed = true;
			state.filterLoading = false;
			state.isLoading = false;
		},
	},
});

export const usersAsync = token => async dispatch => {
	dispatch(setLoading());
	try {
		const r = await API.get(`/user/list`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setUsers(r.data));
		console.log('usersData->r:', r.data);
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};
export const filterUsersAsync = (token, search, rol, sesion) => async dispatch => {
	dispatch(setFilterLoading());
	console.log(localStorage.getItem('accessToken'));
	try {
		const r = await API.get(`/user/list?search=${search}&rol=${rol}&sesion=${sesion}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setUsers(r.data));
		console.log('usersData->r:', r.data);
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};

export const { setUsers, setLoading, setFetchFailed, setFilterLoading } =
	usersSlice.actions;
export default usersSlice.reducer;
