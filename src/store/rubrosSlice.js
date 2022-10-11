import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
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
