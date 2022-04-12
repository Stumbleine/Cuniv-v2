import { createSlice } from '@reduxjs/toolkit';
import companiesData from '../json/business.json';

const initialState = {
	companies: companiesData,
};

const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		sayHello: (state) => {
			console.log('hello');
		},
	},
});

export const { sayHello } = companiesSlice.actions;
export default companiesSlice.reducer;
