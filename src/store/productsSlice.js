import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
const initialState = {
	products: null,
	isLoading: false,
	filterLoading: false,
	fetchFailed: false,
	// companiesToAsing:null
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, { payload }) => {
			state.products = payload;
			state.isLoading = false;
			state.filterLoading = false;
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
		// setCompanies:(state,{payload}) =>{
		// 	state.companiesToAsing = payload;
		// }
	},
});

export const { setProducts, setLoading, setFilterLoading, setFetchFailed } =
	productsSlice.actions;
export default productsSlice.reducer;

export const productsAsync = token => async dispatch => {
	dispatch(setLoading(true));
	try {
		const r = await API.get(`producto/list`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setProducts(r.data));
		console.log('productsData->r:', r.data);
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};

export const filterProductsAsync = (token, search, idc) => async dispatch => {
	dispatch(setFilterLoading());
	try {
		const r = await API.get(`producto/list?search=${search}&idc=${idc}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setProducts(r.data));
		console.log('filterData->r:', r.data);
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};

export const addProductAsync = (token, producto, image) => async dispatch => {
	let succes = null;
	dispatch(setLoading(true));
	const b64 = image ? await convertToB64(image) : null;
	const data = { ...producto, image: b64 };
	console.log('productFORM', data);
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
	console.log(succes);
	return succes;
};

export const updateProductAsync = (token, values, fileImage) => async dispatch => {
	const b64 = fileImage ? await convertToB64(fileImage) : null;
	if (b64 !== null) {
		values = { ...values, image: b64 };
	}
	try {
		await API.post('producto/update', values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(productsAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};

export const deleteProductAsync = (token, id) => async dispatch => {
	console.log(id);
	// try {
	// 	await API.delete(`producto/delete?id=${id}`, {
	// 		headers: { Authorization: `Bearer ${token}` },
	// 	});
	// 	dispatch(productsAsync(token));
	// } catch (e) {
	// 	throw new Error(e);
	// }
};
