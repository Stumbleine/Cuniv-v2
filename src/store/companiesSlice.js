import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
import { getUserAsync } from './userSlice';
const initialState = {
	profile: null,
	companies: null,
	companiesNV: null,
	providers: null,
	selectRubros: null,
	isLoading: false,
	isLoadingProfile: false,
	fetchFailed: false,
	filterLoading: false,
	profileFailed: false,
};

const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		setCompanies: (state, { payload }) => {
			state.companies = payload;
			state.isLoading = false;
			state.filterLoading = false;
		},
		setCompaniesNV: (state, { payload }) => {
			state.companiesNV = payload;
			state.isLoading = false;
		},

		setProviders: (state, { payload }) => {
			state.providers = payload;
		},
		setCompanieProfile: (state, { payload }) => {
			state.profile = payload;
			state.isLoadingProfile = false;
		},
		setLoading: state => {
			state.isLoading = true;
			state.fetchFailed = false;
		},
		setFetchFailed: state => {
			state.fetchFailed = true;
			state.filterLoading = false;
			state.isLoading = false;
		},
		setRubros: (state, { payload }) => {
			state.selectRubros = payload;
		},
		setFilterLoading: state => {
			state.filterLoading = true;
			state.fetchFailed = false;
		},
		setLoadingProfile: state => {
			state.isLoadingProfile = true;
			state.fetchFailed = false;
		},
		setProfileFailed: state => {
			state.profileFailed = true;
			state.isLoadingProfile = false;
		},
	},
});

export const {
	setCompanies,
	setLoading,
	setCompanieProfile,
	setCompaniesNV,
	setFetchFailed,
	setProviders,
	setRubros,
	setFilterLoading,
	setProfileFailed,
	setLoadingProfile,
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
export const filterCompaniesAsync = (token, search, rubro) => async dispatch => {
	dispatch(setFilterLoading());
	try {
		const r = await API.get(`empresa/list?search=${search}&rubro=${rubro}`, {
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

export const profileCompanieAsync = (token, idCompanie) => async dispatch => {
	dispatch(setLoadingProfile());
	try {
		const r = await API.get(`empresa/profile?id=${idCompanie}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		// console.log('perfilEmpresa->r:', r.data);
		dispatch(setCompanieProfile(r.data));
	} catch (e) {
		dispatch(setProfileFailed());
		throw new Error(e);
	}
};

export const createCompanieAsync = (token, values, logo, branchs) => async dispatch => {
	const b64 = logo ? await convertToB64(logo) : null;
	const data = {
		empresa: { ...values, logo: b64 },
		sucursales: branchs,
	};
	try {
		await API.post('empresa/create', data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		dispatch(getUserAsync(token));
		// console.log('createEmpresa->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const rejectCompanieAsync = (token, values) => async dispatch => {
	try {
		await API.post('empresa/reject', values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(compNotVerifiedAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};

export const reconsiderCompanieAsync = (token, id) => async dispatch => {
	const data = {
		id_empresa: id,
	};
	try {
		await API.post('empresa/re', data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(compNotVerifiedAsync(token));
		dispatch(getCompaniesAsync(token));
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
		dispatch(compNotVerifiedAsync(token));
		dispatch(getCompaniesAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
export const deleteCompanieAsync = (token, id) => async dispatch => {
	try {
		await API.delete(`empresa/delete?id=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getCompaniesAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
export const updateInfoAsync = (token, values, image) => async dispatch => {
	const b64 = image ? await convertToB64(image) : null;
	if (b64) {
		values = { ...values, image: b64 };
	}
	try {
		await API.post(`empresa/update?id=${values.id_empresa}`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(profileCompanieAsync(token, values.id_empresa));
	} catch (e) {
		throw new Error(e);
	}
};

export const updateSocialAsync = (token, values, idEmpresa) => async dispatch => {
	try {
		await API.post(`empresa/update?id=${idEmpresa}`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(profileCompanieAsync(token, idEmpresa));
	} catch (e) {
		throw new Error(e);
	}
};
export const changeResponsableAsync = (token, values, idEmpresa) => async dispatch => {
	try {
		await API.post(`empresa/update?id=${idEmpresa}`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(profileCompanieAsync(token, idEmpresa));
	} catch (e) {
		throw new Error(e);
	}
};

// gestion de sucursales
export const addBranchAsync = (token, values, idEmpresa) => async dispatch => {
	values = { ...values, id_empresa: idEmpresa };
	try {
		await API.post(`sucursal/create`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(profileCompanieAsync(token, idEmpresa));
	} catch (e) {
		throw new Error(e);
	}
};
export const deleteBranchAsync = (token, id, idEmpresa) => async dispatch => {
	try {
		await API.delete(`sucursal/delete?id=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(profileCompanieAsync(token, idEmpresa));
	} catch (e) {
		throw new Error(e);
	}
};

export const updateBranchAsync = (token, values, id, idEmpresa) => async dispatch => {
	try {
		await API.post(`sucursal/update?id=${id}`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(profileCompanieAsync(token, idEmpresa));
	} catch (e) {
		throw new Error(e);
	}
};

// extra fetch
export const getProveedores = token => async dispatch => {
	try {
		const r = await API.get('select/providers', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setProviders(r.data));
	} catch (e) {
		throw new Error(e);
	}
};

export const getRubros = token => async dispatch => {
	try {
		const r = await API.get('select/rubros', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setRubros(r.data));
	} catch (e) {
		throw new Error(e);
	}
};
