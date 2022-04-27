import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
const initialState = {
	user: {},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		sayHello: (state) => {
			console.log('hello');
		},
		setUser: (state, action) => {
			state.user = action.payload;
			// console.log('USERDEMO=>', state.user);
		},
	},
});

export const getUserDataAync = (idUser) => async (dispatch) => {
	// try {
	// 	const r = await API.get(`/usuario/user-info?id=${idUser}`);
	// 	dispatch(setUser(r.data));
	// 	console.log('userData->r:', r.data);
	// } catch (e) {
	// 	throw new Error(e);
	// }
};
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
