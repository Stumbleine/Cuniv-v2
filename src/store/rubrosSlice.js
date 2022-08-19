import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
const initialState = {
	rubros: null,
	isLoading: false,
	filterLoading: false,
	fetchFailed: false,
};

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

export const filterRubrosAsync = (token, search, idc) => async dispatch => {
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
