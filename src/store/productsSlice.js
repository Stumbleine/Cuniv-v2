import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
const initialState = {
	products: null,
	isLoading: false,
	// companiesToAsing:null
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, { payload }) => {
			state.products = payload;
			state.isLoading = false;
		},
		setLoading: (state, { payload }) => {
			state.isLoading = payload;
		},
		// setCompanies:(state,{payload}) =>{
		// 	state.companiesToAsing = payload;
		// }
	},
});

export const productsAsync = token => async dispatch => {
	dispatch(setLoading(true));
	try {
		const r = await API.get(`producto/list`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setProducts(r.data));
		console.log('productsData->r:', r.data);
	} catch (e) {
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

export const companiesAsignAsync = token => async () => {
	let r = [];
	try {
		r = await API.get('producto/companies', {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (e) {
		throw new Error(e);
	}
	return r;
};
export const { setProducts, setLoading } = productsSlice.actions;
export default productsSlice.reducer;
