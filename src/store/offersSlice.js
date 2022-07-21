import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import dataOffers from '../json/offers.json';
const initialState = {
	offers: null,
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
		console.log('ofertas->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const createOfferAsync = (offer, image, products) => async dispatch => {
	let succes = false;
	const b64 = image ? await convertb64(image) : null;
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

export const convertb64 = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onload = () => {
			resolve(reader.result);
		};

		reader.onerror = error => {
			reject(error);
		};
	});
	// reader.onload = () => {
	// 	return reader.result;
	// };
};
export const { setOffers, setLoading } = offersSlice.actions;
export default offersSlice.reducer;
