import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	products: {},
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		sayHello: (state) => {
			console.log('hello');
		},
	},
});

export const { sayHello } = productsSlice.actions;
export default productsSlice.reducer;
