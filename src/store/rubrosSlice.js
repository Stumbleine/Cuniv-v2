import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
/**
 * Slice para la gestion de rubros
 * @module rubrosSlice
 */
/**
 * Valores iniciales del slice
 * @constant initialState
 */
const initialState = {
	rubros: null,
	isLoading: false,
	filterLoading: false,
	fetchFailed: false,
};
/**
 * Creacion y configuracion del Slice, reducers
 * @constant rubrosSlice
 */
const rubrosSlice = createSlice({
	name: 'rubros',
	initialState,
	reducers: {
		setRubros: (state, { payload }) => {
			state.isLoading = false;
			state.filterLoading = false;
			state.rubros = payload;
		},
		setLoading: state => {
			state.isLoading = true;
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

export const { setRubros, setLoading, setFetchFailed, setFilterLoading } =
	rubrosSlice.actions;
export default rubrosSlice.reducer;
/**
 * Endpoint, realiza la peticion para listar rubros
 * @function {async} rubrosAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */

export const rubrosAsync = token => async dispatch => {
	dispatch(setLoading(true));
	try {
		const r = await API.get(`rubro/list`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setRubros(r.data));
		console.log('RubrosData->r:', r.data);
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para busquedas de rubros
 * @function {async} filterRubrosAsync
 * @param {String} token access_token del usuario
 * @param {String} search
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const filterRubrosAsync = (token, search) => async dispatch => {
	dispatch(setFilterLoading());
	try {
		const r = await API.get(`rubro/list?search=${search}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setRubros(r.data));
		console.log('filterData->r:', r.data);
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para eliminar un rubro
 * @function {async} deleteRubroAsync
 * @param {String} token access_token del usuario
 * @param {Number} id identificador del rubro
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const deleteRubroAsync = (token, id) => async dispatch => {
	console.log(id);
	try {
		await API.delete(`rubro/delete?id=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(rubrosAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para actualizar un rubro
 * @function {async} updateRubroAsync
 * @param {String} token access_token del usuario
 * @param {Object} values
 * @param {File} icon
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const updateRubroAsync = (token, values, icon) => async dispatch => {
	const b64 = icon ? await convertToB64(icon) : null;
	if (b64 !== null) {
		values = { ...values, icono: b64 };
	}
	console.log(values);
	try {
		await API.post(`user/update?id=${values.id}`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(rubrosAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para crear un rubro
 * @function {async} createRubroAsync
 * @param {String} token access_token del usuario
 * @param {Object} values
 * @param {File} image icono de rubro
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const createRubroAsync = (token, values, image) => async dispatch => {
	const b64 = image ? await convertToB64(image) : null;
	const data = { ...values, icono: b64 };
	try {
		await API.post(`rubro/create`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(rubrosAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
