import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import dataOffers from '../json/offers.json';
const initialState = {
	offers: dataOffers,
};

const offersSlice = createSlice({
	name: 'offers',
	initialState,
	reducers: {
		setOffers: (state, { payload }) => {
			state.offers = payload;
		},
	},
});
export const getOffersAsync = () => async (dispatch) => {
	try {
		const r = await API.get('/beneficio/lista');
		dispatch(setOffers(r.data));
		console.log('ofertas->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};
export const getOfferDetailAsync = (idOffer) => async (dispatch) => {
	try {
		const r = await API.get(`/beneficio/detalle-oferta?id=${idOffer}`);
		// dispatch(setOffers(r.data));
		// console.log('oferta->r:', r.data);
		return r.data;
	} catch (e) {
		throw new Error(e);
	}
};
export const createOfferAsync = (offer) => async (dispatch) => {
	try {
		const r = await API.post(`/beneficio/create`, offer);
		console.log('offerCreate->', r.data);
		dispatch(getOfferDetailAsync());
	} catch (e) {
		throw new Error(e);
	}
};

export const { setOffers } = offersSlice.actions;
export default offersSlice.reducer;
