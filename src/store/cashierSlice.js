import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';

const initialState = {
	cashiers: null,
	isLoading: false,
	fetchFailed: false,
	// redeemSuccess: false,
	// redeemError: false,
	redeemResponse: null,
};

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
			// state.redeemError = false;
			// state.redeemSuccess = true;
			state.redeemResponse = payload;
		},
		// setRedeemError: (state, { payload }) => {
		// 	state.redeemError = true;
		// 	state.redeemSuccess = false;
		// },
		// setLoadingReedem: state => {
		// 	state.redeemError = false;
		// 	state.redeemSuccess = false;
		// },
	},
});
export const { setCashiers, setRedeem, setFetchFailed, setLoading } =
	cashierSlice.actions;
export default cashierSlice.reducer;
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
