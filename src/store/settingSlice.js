import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
	adminNavigation,
	providerNavigation,
} from '../assets/mocks/configNavigation';
const initialState = {
	configNav: {},
	theme: {
		mode: 'light',
	},
};

const settingSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		setConfigNav: (state, { payload }) => {
			let rule = payload.find((e) => e === 'PRV' || 'ADM');
			if (rule === 'ADM') {
				state.configNav = 'adminNavigation';
			} else if (rule === 'PRV') {
				state.configNav = 'providerNavigation';
			}
		},

		setThemeMode: (state) => {
			let m = state.theme.mode === 'light' ? 'dark' : 'light';
			state.theme.mode = m;
		},
	},
});

export const { setConfigNav, setThemeMode } = settingSlice.actions;
export default settingSlice.reducer;
