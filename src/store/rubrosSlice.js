import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	rubros: [],
};

const rubrosSlice = createSlice({
	name: 'rubros',
	initialState,
	reducers: {
		setRubros: (state, { payload }) => {
			state.rubros = payload;
		},
	},
});

export const { sayHello } = rubrosSlice.actions;
export default rubrosSlice.reducer;
