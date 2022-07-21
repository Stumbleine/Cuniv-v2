import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	statics: null,
};

const staticsSlice = createSlice({
	name: 'statics',
	initialState,
	reducers: {
		sayHello: state => {
			console.log('hello');
		},
	},
});

export const { sayHello } = staticsSlice.actions;
export default staticsSlice.reducer;
