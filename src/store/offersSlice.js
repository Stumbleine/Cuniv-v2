import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
/**
 * Slice para la gestion de ofertas
 * @module offersSlice
 */
/**
 * Valores iniciales del slice
 * @constant initialState
 */
const initialState = {
	offers: null,
	fetchFailed: false,
	isLoading: false,
	filterLoading: false,
};
/**
 * Creacion y configuracion del Slice, reducers
 * @constant offersSlice
 */
const offersSlice = createSlice({
	name: 'offers',
	initialState,
	reducers: {
		setOffers: (state, { payload }) => {
			state.offers = [];

			state.offers = payload;
			state.isLoading = false;
			state.filterLoading = false;
		},
		setLoading: state => {
			state.isLoading = true;
			state.fetchFailed = false;
		},
		setFetchFailed: state => {
			state.fetchFailed = true;
			state.isLoading = false;
			state.filterLoading = false;
		},
		setFilterLoading: state => {
			state.filterLoading = true;

			state.fetchFailed = false;
		},
	},
});
/**
 * Endpoint, realiza la peticion para listar ofertas
 * @function {async} getOffersAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const getOffersAsync = token => async dispatch => {
	dispatch(setLoading());
	try {
		const r = await API.get('beneficio/list', {
			headers: { Authorization: `Bearer ${token}` },
		});
		// console.log(r.data);
		dispatch(setOffers(r.data));
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para filtrar y realizar busquedas de ofertas
 * @function {async} filterOffersAsync
 * @param {String} token access_token del usuario
 * @param {String} search
 * @param {String} status estado de la oferta 'VIGENTE' o 'EXPIRADO'
 * @param {Number} idc identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const filterOffersAsync = (token, search, idc, status) => async dispatch => {
	dispatch(setFilterLoading());
	try {
		const r = await API.get(
			`beneficio/list?search=${search}&idc=${idc}&status=${status}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		dispatch(setOffers(r.data));
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para crear ofertas
 * @function {async} createOfferAsync
 * @param {String} token access_token del usuario
 * @param {Object} offer
 * @param {File} image
 * @param {Array} products lista de productos incluidos puede ser null
 * @param {Array} branchs lista de productos incluidos puede ser null,
 * @param {String} fredeem frecuencia de canje seleccionado
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const createOfferAsync =
	(token, offer, image, products, branchs, fredeem) => async dispatch => {
		const b64 = image ? await convertToB64(image) : null;
		const branchsArray = [];
		const productsArray = [];

		branchs?.forEach(e => {
			branchsArray.push(e.id_branch);
		});
		products?.forEach(e => {
			productsArray.push(e.id_product);
		});

		const data = {
			...offer,
			image: b64,
			productos:
				products.length !== 0 ? { productos: productsArray } : { productos: null },
			sucursales_disp: branchs.length !== 0 ? { ids: branchsArray } : { ids: null },
			frequency_redeem: fredeem,
		};
		try {
			await API.post(`/beneficio/create`, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
			// console.log('offerCreate->', r.data);
			dispatch(getOffersAsync(token));
		} catch (e) {
			throw new Error(e);
		}
	};
/**
 * Endpoint, realiza la peticion para actualizar la informacion de una oferta
 * @function {async} updateOfferAsync
 * @param {String} token access_token del usuario
 * @param {Object} values
 * @param {File} imageFile
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const updateOfferAsync = (token, values, imageFile) => async dispatch => {
	const b64 = imageFile ? await convertToB64(imageFile) : null;
	if (b64 !== null) {
		values = { ...values, picture: b64 };
	}
	// console.log(values);
	try {
		await API.post(`beneficio/update?id=${values.id_beneficio}`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getOffersAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para dar de baja una oferta
 * @function {async} deleteOfferAsync
 * @param {String} token access_token del usuario
 * @param {Number} id identificador de la oferta
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const deleteOfferAsync = (token, id) => async dispatch => {
	try {
		await API.delete(`beneficio/delete?id=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getOffersAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};

export const { setOffers, setLoading, setFetchFailed, setFilterLoading } =
	offersSlice.actions;
export default offersSlice.reducer;
