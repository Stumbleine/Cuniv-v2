import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
/**
 * Slice para graficos estadisticos
 * @module staticsSlice
 */
/**
 * Valores iniciales del slice statics
 * @constant initialState
 */
const initialState = {
	offersView: null,
	offersViewChart: null,
	summary: null,
	codeGenerated: null,
	codeRedeemed: null,
};
/**
 * Creacion y configuracion del Slice, reducers
 * @constant staticsSlice
 */
const staticsSlice = createSlice({
	name: 'statics',
	initialState,
	reducers: {
		setOffersView: (state, { payload }) => {
			state.offersView = payload;
		},
		setOffersChart: (state, { payload }) => {
			state.offersViewChart = payload;
		},
		setSummary: (state, { payload }) => {
			state.summary = payload;
		},
		setCodeGenerated: (state, { payload }) => {
			state.codeGenerated = payload;
		},
		setCodeRedeemed: (state, { payload }) => {
			state.codeRedeemed = payload;
		},
	},
});

export const {
	setOffersView,
	setOffersChart,
	setSummary,
	setCodeGenerated,
	setCodeRedeemed,
} = staticsSlice.actions;
export default staticsSlice.reducer;
/**
 * Endpoint, realiza la peticion para traer el resumen de totales de cada estadistica
 * @function {async} summaryAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const summaryAsync = token => async dispatch => {
	try {
		const r = await API.get(`/analitycs/summary`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setSummary(r.data));
		// console.log('summary->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para listar ofertas con sus visualizadas totales
 * @function {async} offersViewAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const offersViewAsync = token => async dispatch => {
	try {
		const r = await API.get(`/analitycs/offers-views`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setOffersView(r.data));
		// console.log('offersDisplay->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para traer el dataset para el grafico de ofertas visualizas por dia y mes
 * @function {async} offersViewChartAsync
 * @param {String} token access_token del usuario
 * @param {String} startDaily fecha rango inicial para la opcion dias
 * @param {String} startMonthly fecha rango inicial para la opcion meses
 * @param {String} end fecha rango final para ambas opciones (fecha actual)
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const offersViewChartAsync =
	(token, startDaily, startMonthly, end) => async dispatch => {
		try {
			const r = await API.get(
				`/analitycs/offers-views-chart?start_d=${startDaily}&start_m=${startMonthly}&end_date=${end}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			dispatch(setOffersChart(r.data));
			// console.log('offersDisplayChart->r:', r.data);
		} catch (e) {
			throw new Error(e);
		}
	};
/**
 * Endpoint, realiza la peticion para traer el dataset para el grafico de codigos generados por dia y mes
 * @function {async} generatedChartAsync
 * @param {String} token access_token del usuario
 * @param {String} startDaily fecha rango inicial para la opcion dias
 * @param {String} startMonthly fecha rango inicial para la opcion meses
 * @param {String} end fecha rango final para ambas opciones (fecha actual)
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const generatedChartAsync =
	(token, startDaily, startMonthly, end) => async dispatch => {
		try {
			const r = await API.get(
				`/analitycs/generated-chart?start_d=${startDaily}&start_m=${startMonthly}&end_date=${end}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			dispatch(setCodeGenerated(r.data));
			// console.log('genChart->r:', r.data);
		} catch (e) {
			throw new Error(e);
		}
	};
/**
 * Endpoint, realiza la peticion para traer el dataset para el grafico de codigos reclamados por dia y mes
 * @function {async} redeemedChartAsync
 * @param {String} token access_token del usuario
 * @param {String} startDaily fecha rango inicial para la opcion dias
 * @param {String} startMonthly fecha rango inicial para la opcion meses
 * @param {String} end fecha rango final para ambas opciones (fecha actual)
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const redeemedChartAsync =
	(token, startDaily, startMonthly, end) => async dispatch => {
		try {
			const r = await API.get(
				`/analitycs/redeemed-chart?start_d=${startDaily}&start_m=${startMonthly}&end_date=${end}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			dispatch(setCodeRedeemed(r.data));
			// console.log('redeemedChart->r:', r.data);
		} catch (e) {
			throw new Error(e);
		}
	};
