import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { setConfigNav } from './settingSlice';
const initialState = {
	user: {},
	rule: '',
	rulepath: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		sayHello: (state) => {
			console.log('hello');
		},
		setUser: (state, { payload }) => {
			state.user = payload;

			state.rule = payload.rules.find((e) => e === 'PRV' || 'ADM');
			console.log('user=>', state.user, state.rule);
			if (state.rule === 'ADM') state.rulepath = 'admin';
			if (state.rule === 'PRV') state.rulepath = 'provider';
		},
		setCompnieID: (state, { payload }) => {
			state.user = { ...state.user, id_empresa: payload };
		},
	},
});

export const getUserDataAync = (idUser) => async (dispatch) => {
	try {
		const r = await API.get(`/usuario/user-info?id=${idUser}`);
		dispatch(setUser(r.data));
		dispatch(setConfigNav(r.data.rules));
		// console.log('userData->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};
export const { setUser, setCompnieID } = userSlice.actions;
export default userSlice.reducer;
