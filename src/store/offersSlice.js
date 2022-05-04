import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import dataOffers from '../json/offers.json';
const initialState = {
	offers: null,
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
export const getOffersAsync = (idEmpresa, rule) => async (dispatch) => {
	try {
		const r = await API.get(
			'/beneficio/lista?id_e=' + idEmpresa + '&rule=' + rule
		);
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
export const createOfferAsync =
	(offer, image, products, idEmpresa, rule) => async (dispatch) => {
		let succes = false;
		const b64 = image ? await convertb64(image) : null;
		const p = products.map((s) => {
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
			id_empresa: idEmpresa,
		};
		console.log('data armado=>', data);
		try {
			const r = await API.post(`/beneficio/create`, data);
			console.log('offerCreate->', r.data);
			dispatch(getOffersAsync(idEmpresa, rule));
			succes = true;
		} catch (e) {
			throw new Error(e);
		}
		return succes;
	};
export const convertb64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onload = () => {
			resolve(reader.result);
		};

		reader.onerror = (error) => {
			reject(error);
		};
	});
	// reader.onload = () => {
	// 	return reader.result;
	// };
};
export const { setOffers } = offersSlice.actions;
export default offersSlice.reducer;
