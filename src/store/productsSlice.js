import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
const initialState = {
	products: [],
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, { payload }) => {
			state.products = payload;
		},
	},
});

export const getProductsPRV = (idEmpresa) => async (dispatch) => {
	try {
		const r = await API.get(`/producto/lista-prov?id_e=${idEmpresa}`);
		dispatch(setProducts(r.data));
		console.log('productsData->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};
export const addProductAsync =
	(producto, image, idEmpresa) => async (dispatch) => {
		const b64 = image ? await convertb64(image) : null;

		const data = { ...producto, image: b64, id_empresa: idEmpresa };
		console.log('product', data);
		let success = false;
		try {
			const r = await API.post('/producto/create', data);
			dispatch(getProductsPRV(idEmpresa));
			console.log('createProduct->r', r.data);
			success = true;
		} catch (e) {
			throw new Error(e);
		}
		return success;
	};
export const convertb64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onload = () => {
			resolve(reader.result);
		};

		reader.onerror = (error) => {
			reject(error);
		};
	});
};
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
