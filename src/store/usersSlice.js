import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
const initialState = {
	users: null,
	isLoading: false,
	fetchFailed: false,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers: (state, { payload }) => {
			state.users = payload;
			state.isLoading = false;
		},
		setLoading: state => {
			state.isLoading = true;
			state.fetchFailed = false;
		},
		setFetchFailed: state => {
			state.fetchFailed = true;
			state.isLoading = true;
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

export const { setUsers, setLoading, setFetchFailed } = usersSlice.actions;
export default usersSlice.reducer;
