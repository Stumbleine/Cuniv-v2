import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
import { getUserAsync, setCompanie } from './userSlice';
const initialState = {
	companies: null,
	companiesNV: null,
	sucursales: [],
	providers: null,
	profile: null,
	isLoading: false,
	fetchFailed: false,
};

const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		setCompanies: (state, { payload }) => {
			state.companies = payload;
			state.isLoading = false;
		},
		setCompaniesNV: (state, { payload }) => {
			state.companiesNV = payload;
			state.isLoading = false;
		},
		setSucursales: (state, { payload }) => {
			state.sucursales = payload;
		},
		setProviders: (state, { payload }) => {
			state.providers = payload;
		},
		setCompanieProfile: (state, { payload }) => {
			state.profile = payload;
			state.isLoading = false;
		},
		setLoading: state => {
			state.isLoading = true;
			state.fetchFailed = false;
		},
		setFetchFailed: state => {
			state.fetchFailed = true;
			state.isLoading = false;
		},
	},
});

export const {
	setCompanies,
	setSucursales,
	setLoading,
	setCompanieProfile,
	setCompaniesNV,
	setFetchFailed,
	setProviders,
} = companiesSlice.actions;
export default companiesSlice.reducer;

export const getCompaniesAsync = token => async dispatch => {
	dispatch(setLoading());
	try {
		const r = await API.get('empresa/list', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setCompanies(r.data));
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};

export const compNotVerifiedAsync = token => async dispatch => {
	dispatch(setLoading());
	try {
		const r = await API.get('empresa/list-not-verified', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setCompaniesNV(r.data));
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};

export const profileCompanieAsync = (idCompanie, token) => async dispatch => {
	dispatch(setLoading());
	try {
		const r = await API.get(`empresa/profile?id=${idCompanie}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log('perfilEmpresa->r:', r.data);
		dispatch(setCompanieProfile(r.data));
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};
export const getProveedores = token => async dispatch => {
	try {
		const r = await API.get('empresa/proveedores', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setProviders(r.data));
	} catch (e) {
		throw new Error(e);
	}
};

export const createCompanieAsync = (token, values, logo, branchs) => async dispatch => {
	const b64 = logo ? await convertToB64(logo) : null;
	const data = {
		empresa: { ...values, logo: b64 },
		sucursales: branchs,
	};
	console.log('data armado', data);
	try {
		const r = await API.post('empresa/create', data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		// dispatch(getCompaniesAsync(token));
		dispatch(getUserAsync(token));
		console.log('createEmpresa->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const getSucursales = idEmpresa => async dispatch => {
	try {
		const r = await API.get('empresa/sucursales?id_e=' + idEmpresa);
		dispatch(setSucursales(r.data));
		console.log('sucursales->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const rejectCompanieAsync = (token, values) => async dispatch => {
	try {
		await API.post('empresa/reject', values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		setTimeout(() => {
			dispatch(compNotVerifiedAsync(token));
			dispatch(getCompaniesAsync(token));
		}, 2000);
	} catch (e) {
		throw new Error(e);
	}
};

export const approveCompanieAsync = (token, id) => async dispatch => {
	const data = {
		id_empresa: id,
		verified: true,
		rejected: false,
	};
	try {
		await API.post('empresa/approve', data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		setTimeout(() => {
			dispatch(compNotVerifiedAsync(token));
			dispatch(getCompaniesAsync(token));
		}, 2000);
	} catch (e) {
		throw new Error(e);
	}
};

export const updateInfoAsync =
	(token, values, image, editedFile, idEmpresa) => async dispatch => {
		let data = null;
		if (editedFile) {
			const b64 = image ? await convertToB64(image) : null;
			data = { ...values, image: b64 };
		} else {
			data = values;
		}
		console.log(data, editedFile);

		try {
			await API.post(`empresa/update?id=${idEmpresa}`, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch(profileCompanieAsync(token));
		} catch (e) {
			throw new Error(e);
		}
	};

export const updateSocialAsync = (token, values, idEmpresa) => async dispatch => {
	try {
		await API.post(`empresa/update?id=${idEmpresa}`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(profileCompanieAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
export const changeResponsableAsync = (token, values, idEmpresa) => async dispatch => {
	try {
		await API.post(`empresa/update?id=${idEmpresa}`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(profileCompanieAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
