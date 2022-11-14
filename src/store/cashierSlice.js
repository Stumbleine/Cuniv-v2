import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';

/**
 * Slice de cajeros
 * @module cashierSlice
 */
/**
 * initialState: valores iniciales del slice
 * @constant initialState
 */
const initialState = {
	cashiers: null,
	isLoading: false,
	fetchFailed: false,
	redeemResponse: null,
};
/**
 * Creacion y configuracion del Slice, reducers
 * @constant cashierSlice
 */
const cashierSlice = createSlice({
	name: 'cashier',
	initialState,
	reducers: {
		setCashiers: (state, { payload }) => {
			state.isLoading = false;
			state.fetchFailed = false;
			state.cashiers = payload;
		},
		setLoading: state => {
			state.isLoading = true;
			state.fetchFailed = false;
		},
		setFetchFailed: state => {
			state.fetchFailed = true;
			state.isLoading = false;
		},
		setRedeem: (state, { payload }) => {
			state.redeemResponse = payload;
		},
	},
});
export const { setCashiers, setRedeem, setFetchFailed, setLoading } =
	cashierSlice.actions;
export default cashierSlice.reducer;
/**
 * Endpoint, realiza la peticion para traer la lista de cajeros
 * @function {async} cashiersAsync
 * @param {String} token
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de cashierSlice
 */
export const cashiersAsync = token => async dispatch => {
	try {
		const r = await API.get(`user/list-cashiers`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setCashiers(r.data));
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para registrar un cajero
 * @function {async} createCashierAsync
 * @param {String} token
 * @param {Object} values datos del cajero a registrar
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de cashierSlice
 */
export const createCashierAsync = (token, values) => async dispatch => {
	try {
		await API.post(`user/add-cashier`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(cashiersAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para verificar y realizar el canje de un codigo
 * @function {async} redeemAsync
 * @param {String} token
 * @param {String} values
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de cashierSlice
 */
export const redeemAsync = (token, values) => async dispatch => {
	try {
		const r = await API.post(`codigo/redeem`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setRedeem(r.data));
	} catch (e) {
		throw new Error(e);
	}
};
// export const updateCashierAsync = (token, values) => async dispatch => {
// 	try {
// 		await API.post(`user/add-cashier`, values, {
// 			headers: { Authorization: `Bearer ${token}` },
// 		});
// 		dispatch(cashiersAsync(token));
// 	} catch (e) {
// 		throw new Error(e);
// 	}
// };
// export const deleteCashierAsync = (token, values) => async dispatch => {
// 	try {
// 		await API.delete(`user/add-cashier`, values, {
// 			headers: { Authorization: `Bearer ${token}` },
// 		});
// 		dispatch(cashiersAsync(token));
// 	} catch (e) {
// 		throw new Error(e);
// 	}
// };
