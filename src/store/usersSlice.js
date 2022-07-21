import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
const initialState = {
	users: null,
	isLoading: false,
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
		},
	},
});

export const usersAsync = () => async dispatch => {
	dispatch(setLoading());
	try {
		const r = await API.get(`/usuario/lista`);
		dispatch(setUsers(r.data));
		console.log('usersData->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const { setUsers, setLoading } = usersSlice.actions;
export default usersSlice.reducer;
