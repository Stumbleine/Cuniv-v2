import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
/**
 * Slice para la gestion de productos
 * @module productsSlice
 */
/**
 * Valores iniciales del slice
 * @constant initialState
 */
const initialState = {
	products: null,
	isLoading: false,
	filterLoading: false,
	fetchFailed: false,
};
/**
 * Creacion y configuracion del Slice, reducers
 * @constant productsSlice
 */
const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, { payload }) => {
			state.products = payload;
			state.isLoading = false;
			state.filterLoading = false;
			state.fetchFailed = false;
		},
		setLoading: (state, { payload }) => {
			state.isLoading = payload;
			state.fetchFailed = false;
		},
		setFilterLoading: state => {
			state.filterLoading = true;
			state.fetchFailed = false;
		},
		setFetchFailed: state => {
			state.fetchFailed = true;
			state.filterLoading = false;
			state.isLoading = false;
		},
	},
});

export const { setProducts, setLoading, setFilterLoading, setFetchFailed } =
	productsSlice.actions;
export default productsSlice.reducer;
/**
 * Endpoint, realiza la peticion para listar productos
 * @function {async} productsAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const productsAsync = token => async dispatch => {
	dispatch(setLoading(true));
	try {
		const r = await API.get(`producto/list`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setProducts(r.data));
		// console.log('productsData->r:', r.data);
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para filtrar y realizar busquedas de productos
 * @function {async} filterProductsAsync
 * @param {String} token access_token del usuario
 * @param {String} search
 * @param {Number} idc identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */

export const filterProductsAsync =
	(token, search = 'All', idc) =>
	async dispatch => {
		search = search === '' ? 'All' : search;
		dispatch(setFilterLoading());
		try {
			const r = await API.get(`producto/list?search=${search}&idc=${idc}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch(setProducts(r.data));
			// console.log('filterData->r:', r.data);
		} catch (e) {
			dispatch(setFetchFailed());
			throw new Error(e);
		}
	};
/**
 * Endpoint, realiza la peticion para crear un nuevo producto
 * @function {async} addProductAsync
 * @param {String} token access_token del usuario
 * @param {Object} producto
 * @param {File} image
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const addProductAsync = (token, producto, image) => async dispatch => {
	let succes = null;
	dispatch(setLoading(true));
	const b64 = image ? await convertToB64(image) : null;
	const data = { ...producto, image: b64 };
	try {
		const r = await API.post('producto/create', data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setLoading(true));
		dispatch(productsAsync(token));

		succes = r.data;
	} catch (e) {
		succes = e;
		throw new Error(e);
	}
	return succes;
};
/**
 * Endpoint, realiza la peticion para actualizar la informacion de un producto
 * @function {async} updateProductAsync
 * @param {String} token access_token del usuario
 * @param {Object} values
 * @param {File} imageFile
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const updateProductAsync = (token, values, fileImage) => async dispatch => {
	const b64 = fileImage ? await convertToB64(fileImage) : null;
	if (b64 !== null) {
		values = { ...values, image: b64 };
	}
	try {
		await API.post('producto/update?id=' + values.id_producto, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(productsAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para dar de baja un producto
 * @function {async} deleteProductAsync
 * @param {String} token access_token del usuario
 * @param {Number} id identificador del producto
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const deleteProductAsync = (token, id) => async dispatch => {
	try {
		await API.delete(`producto/delete?id=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(productsAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
