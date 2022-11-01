import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
import { getUserAsync } from './userSlice';
/**
 * Slice para empresas
 * @module companiesSlice
 */
/**
 * Valores iniciales del slice empresas
 * @constant initialState
 */
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
/**
 * Creacion y configuracion del Slice, reducers
 * @constant companiesSlice
 */
const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		setCompanies: (state, { payload }) => {
			state.companies = payload;
			state.isLoading = false;
			state.filterLoading = false;
			state.fetchFailed = false;
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
/**
 * Endpoint, realiza la peticion para listar las empresas registradas y verificadas (aprobadas)
 * @function {async} getCompaniesAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para filtrar y buscar empresas, segun rubro, razon_social, descripcon..
 * @function {async} filterCompaniesAsync
 * @param {String} token access_token del usuario
 * @param {String} search caracteres
 * @param {String} rubro nombre del rubro
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const filterCompaniesAsync =
	(token, search = 'All', rubro) =>
	async dispatch => {
		search = search === '' ? 'All' : search;
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
/**
 * Endpoint, realiza la peticion para listar las empresa no verificadas y rechazadas
 * @function {async} compNotVerifiedAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para traer toda la informacion detallada de la empresa
 * @function {async} profileCompanieAsync
 * @param {String} token access_token del usuario
 * @param {number} idCompanie identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para crear una empresa
 * @function {async} createCompanieAsync
 * @param {String} token access_token del usuario
 * @param {Object} values
 * @param {File} logo
 * @param {Array} branchs lista de sucursales
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para rechazar a una empresa
 * @function {async} rejectCompanieAsync
 * @param {String} token access_token del usuario
 * @param {Number} id identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para reconsiderar el rechazo de una empresa (aprobar empresa)
 * @function {async} reconsiderCompanieAsync
 * @param {String} token access_token del usuario
 * @param {Number} id identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para aprobar una empresa
 * @function {async} approveCompanieAsync
 * @param {String} token access_token del usuario
 * @param {Number} id identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para dar de baja una empresa
 * @function {async} deleteCompanieAsync
 * @param {String} token access_token del usuario
 * @param {Number} id identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para actualizar la informacion de una empresa
 * @function {async} updateInfoAsync
 * @param {String} token access_token del usuario
 * @param {Object} values
 * @param {File} image logo de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const updateInfoAsync = (token, values, image) => async dispatch => {
	const b64 = image ? await convertToB64(image) : null;
	if (b64) {
		values = { ...values, logo: b64 };
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
/**
 * Endpoint, realiza la peticion para actualizar las redes sociales de una empresa
 * @function {async} updateSocialAsync
 * @param {String} token access_token del usuario
 * @param {Object} values
 * @param {Number} idEmpresa identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para cambiar de responsable a una empresa (actualizar empresa)
 * @function {async} changeResponsableAsync
 * @param {String} token access_token del usuario
 * @param {Object} values datos con el id del nuevo responsable
 * @param {Number} idEmpresa identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para crear una sucursal
 * @function {async} addBranchAsync
 * @param {String} token access_token del usuario
 * @param {Object} values datos de la sucursal
 * @param {Number} idEmpresa identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para eliminar una sucursal
 * @function {async} deleteBranchAsync
 * @param {String} token access_token del usuario
 * @param {Number} id identificador de la sucursal
 * @param {Number} idEmpresa identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para actualiza runa sucursal
 * @function {async} updateBranchAsync
 * @param {String} token access_token del usuario
 * @param {Object} values
 * @param {Number} id identificador de la sucursal
 * @param {Number} idEmpresa identificador de empresa
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 *
 * Endpoint, realiza la peticion para listar proveedores
 * @function {async} getProveedores
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
/**
 * Endpoint, realiza la peticion para traer los rubros
 * @function {async} getRubros
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
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
