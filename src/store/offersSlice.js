import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
const initialState = {
	offers: null,
	fetchFailed: false,
	isLoading: false,
};

const offersSlice = createSlice({
	name: 'offers',
	initialState,
	reducers: {
		setOffers: (state, { payload }) => {
			state.offers = payload;
			state.isLoading = false;
		},
		setLoading: state => {
			state.isLoading = true;
			state.fetchFailed = false;
		},
		setFetchFailed: state => {
			state.fetchFailed = true;
			state.isLoading = false;
		},
	},
});

export const getOffersAsync = token => async dispatch => {
	dispatch(setLoading());
	try {
		const r = await API.get('beneficio/list', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setOffers(r.data));
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};

export const createOfferAsync = (offer, image, products) => async dispatch => {
	let succes = false;
	const b64 = image ? await convertToB64(image) : null;
	const p = products.map(s => {
		console.log('pids', s.id_producto);
		let array = [];
		array.push(s.id_producto.toString());
		return array;
	});
	// const p = async () => {
	// 	let array = [];
	// 	for (let i = 0; i < products.lenght; i++) {
	// 		await array.push(products[i].id_producto.toString());
	// 	}
	// 	return array;
	// };
	console.log(p);
	const data = {
		...offer,
		image: b64,
		descrip_productos: { productos: p },
	};
	console.log('data armado=>', data);
	// try {
	// 	const r = await API.post(`/beneficio/create`, data);
	// 	console.log('offerCreate->', r.data);
	// 	dispatch(getOffersAsync()));
	// 	succes = true;
	// } catch (e) {
	// 	throw new Error(e);
	// }
	return succes;
};

export const { setOffers, setLoading, setFetchFailed } = offersSlice.actions;
export default offersSlice.reducer;
