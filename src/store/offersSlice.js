import { createSlice } from '@reduxjs/toolkit';
import dataOffers from '../json/offers.json';
const initialState = {
	offers: dataOffers,
};

const offersSlice = createSlice({
	name: 'offers',
	initialState,
	reducers: {
		sayHello: (state) => {
			console.log('hello');
		},
	},
});

export const { sayHello } = offersSlice.actions;
export default offersSlice.reducer;
