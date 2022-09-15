import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
const initialState = {
	offers: null,
	fetchFailed: false,
	isLoading: false,
	filterLoading: false,
};

const offersSlice = createSlice({
	name: 'offers',
	initialState,
	reducers: {
		setOffers: (state, { payload }) => {
			state.offers = [];

			state.offers = payload;
			state.isLoading = false;
			state.filterLoading = false;
		},
		setLoading: state => {
			state.isLoading = true;
			state.fetchFailed = false;
		},
		setFetchFailed: state => {
			state.fetchFailed = true;
			state.isLoading = false;
			state.filterLoading = false;
		},
		setFilterLoading: state => {
			state.filterLoading = true;

			state.fetchFailed = false;
		},
	},
});

export const getOffersAsync = token => async dispatch => {
	dispatch(setLoading());
	try {
		const r = await API.get('beneficio/list', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setOffers(r.data));
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};
export const filterOffersAsync = (token, search, idc, status) => async dispatch => {
	dispatch(setFilterLoading());
	try {
		const r = await API.get(
			`beneficio/list?search${search}&idc=${idc}&status=${status}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		dispatch(setOffers(r.data));
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};

export const createOfferAsync =
	(token, offer, image, products, branchs, fredeem) => async dispatch => {
		const b64 = image ? await convertToB64(image) : null;
		const branchsArray = [];
		const productsArray = [];

		branchs?.forEach(e => {
			branchsArray.push(e.id_sucursal);
		});
		products?.forEach(e => {
			productsArray.push(e.id_producto);
		});

		const data = {
			...offer,
			image: b64,
			productos: products.length !== 0 ? { productos: productsArray } : null,
			sucursales_disp: branchs.length !== 0 ? { ids: branchsArray } : null,
			frequency_redeem: fredeem,
		};
		console.log('data armado=>', data);
		try {
			const r = await API.post(`/beneficio/create`, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log('offerCreate->', r.data);
			dispatch(getOffersAsync(token));
		} catch (e) {
			throw new Error(e);
		}
	};

export const updateOfferAsync = (token, values, imageFile) => async dispatch => {
	// console.log(imageFile);

	const b64 = imageFile ? await convertToB64(imageFile) : null;
	if (b64 !== null) {
		values = { ...values, picture: b64 };
	}
	console.log(values);
	try {
		await API.post(`beneficio/update?id=${values.id_beneficio}`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getOffersAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
export const deleteOfferAsync = (token, id) => async dispatch => {
	console.log(id);
	try {
		await API.delete(`beneficio/delete?id=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getOffersAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};

export const { setOffers, setLoading, setFetchFailed, setFilterLoading } =
	offersSlice.actions;
export default offersSlice.reducer;
