import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
const initialState = {
	offersView: null,
	offersViewChart: null,
	summary: null,
	codeGenerated: null,
	codeRedeemed: null,
};

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

export const summaryAsync = token => async dispatch => {
	try {
		const r = await API.get(`/analitycs/summary`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setSummary(r.data));
		console.log('summary->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const offersViewAsync = token => async dispatch => {
	try {
		const r = await API.get(`/analitycs/offers-views`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setOffersView(r.data));
		console.log('offersDisplay->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

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
			console.log('offersDisplayChart->r:', r.data);
		} catch (e) {
			throw new Error(e);
		}
	};

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
			console.log('genChart->r:', r.data);
		} catch (e) {
			throw new Error(e);
		}
	};
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
			console.log('redeemedChart->r:', r.data);
		} catch (e) {
			throw new Error(e);
		}
	};
