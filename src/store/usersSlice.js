import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import usersDATA from '../json/users.json';
const initialState = {
	users: [],
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers: (state, { payload }) => {
			state.users = payload;
		},
	},
});

export const getUsersListAync = () => async (dispatch) => {
	try {
		const r = await API.get(`/usuario/lista`);
		dispatch(setUsers(r.data));
		console.log('usersData->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
