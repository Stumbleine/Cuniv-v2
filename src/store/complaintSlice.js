import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
/**
 * Slice para reclamos
 * @module complaintSlice
 */
/**
 * Valores iniciales del slice
 * @constant initialState
 */
const initialState = {
	complaints: null,
	fetchFailed: false,
	isLoading: false,
	filterLoading: false,
};
/**
 * Creacion y configuracion del Slice, reducers
 * @constant complaintSlice
 */
const complaintSlice = createSlice({
	name: 'complaint',
	initialState,
	reducers: {
		setComplaints: (state, { payload }) => {
			state.complaints = payload;
			state.isLoading = false;
			state.filterLoading = false;
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
export const { setComplaints, setLoading, setFetchFailed, setFilterLoading } =
	complaintSlice.actions;
export default complaintSlice.reducer;
/**
 * Endpoint, realiza la peticion para listar reclamos
 * @function {async} complaintsAsync
 * @param {String} token
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const complaintsAsync = token => async dispatch => {
	dispatch(setLoading());
	try {
		const r = await API.get(`reclamo/list`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setComplaints(r.data));
		// console.log('ComplaintsData->r:', r.data);
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para filtrar y buscar reclamos
 * @function {async} complaintsFilterAsync
 * @param {String} token
 * @param {String} search
 * @param {String} type tipo de reclamo
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de complaintSlice
 */
export const complaintsFilterAsync =
	(token, search = 'All', type) =>
	async dispatch => {
		search = search === '' ? 'All' : search;
		dispatch(setFilterLoading());
		try {
			const r = await API.get(`reclamo/list?search=${search}&type=${type}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch(setComplaints(r.data));
			// console.log('ComplaintsFilterData->r:', r.data);
		} catch (e) {
			dispatch(setFetchFailed());
			throw new Error(e);
		}
	};
