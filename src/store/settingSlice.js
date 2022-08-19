import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getNavlinks } from '../Utils/RBAC';

const initialState = {
	navlinks: [],
	theme: {
		mode: 'light',
	},
};

const settingSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		setNavlinks: (state, { payload }) => {
			console.log('payload', payload);
			state.navlinks = getNavlinks(payload);
		},
		// para futuros temas
		setThemeMode: state => {
			let m = state.theme.mode === 'light' ? 'dark' : 'light';
			state.theme.mode = m;
		},
	},
});

export const { setNavlinks, setThemeMode } = settingSlice.actions;
export default settingSlice.reducer;
