import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	rubros: null,
	isLoading: false,
};

const rubrosSlice = createSlice({
	name: 'rubros',
	initialState,
	reducers: {
		setRubros: (state, { payload }) => {
			state.isLoading = false;

			state.rubros = payload;
		},
		setLoading: state => {
			state.isLoading = true;
		},
	},
});

export const { setRubros, setLoading } = rubrosSlice.actions;
export default rubrosSlice.reducer;
