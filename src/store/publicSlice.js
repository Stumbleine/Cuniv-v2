import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';

const initialState = {
	topOffers: null,
	topCompanies: null,
	topStatics: null,
};

const publicStore = createSlice({
	name: 'public',
	initialState,
	reducers: {
		setTopOffers: (state, { payload }) => {
			state.topOffers = payload;
		},
		setTopCompanies: (state, { payload }) => {
			state.topCompanies = payload;
		},
		setStatics: (state, payload) => {
			state.topStatics = payload;
		},
	},
});

export const topOffersAsync = async dispatch => {
	try {
		const r = await API.get('/public/topOffers');
	} catch (e) {
		throw new Error(e);
	}
};
export const topCompaniesAsync = async dispatch => {
	try {
		const r = await API.get('public/topCompanies');
	} catch (e) {
		throw new Error(e);
	}
};
export const { setTopCompanies, setTopOffers, setStatics } = publicStore.actions;
export default publicStore.reducer;
