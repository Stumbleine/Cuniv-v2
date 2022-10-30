import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
/**
 * Slice para sitios y locaciones
 * @module umssSlice
 */
/**
 * Valores iniciales del slice empresas
 * @constant initialState
 */
const initialState = {
	locations: null,
	webSites: null,
	isLoading: false,
	fetchFailed: false,
	filterLoading: false,
	isLoadingL: false,
	fetchFailedL: false,
	filterLoadingL: false,
};
/**
 * Creacion y configuracion del Slice, reducers
 * @constant umssSlice
 */
const umssSlice = createSlice({
	name: 'umss',
	initialState,
	reducers: {
		setLocations: (state, { payload }) => {
			state.locations = payload;
			state.isLoading = false;
			state.filterLoading = false;
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

		setWebSites: (state, { payload }) => {
			state.webSites = payload;
			state.isLoadingL = false;
			state.filterLoadingL = false;
		},
		setLoadingLink: (state, { payload }) => {
			state.isLoadingL = payload;
			state.fetchFailedL = false;
		},
		setFilterLoadingLink: state => {
			state.filterLoadingL = true;
			state.fetchFailedL = false;
		},
		setFetchFailedLink: state => {
			state.fetchFailedL = true;
			state.filterLoadingL = false;
			state.isLoadingL = false;
		},
	},
});

export const {
	setLocations,
	setWebSites,
	setLoading,
	setLoadingLink,
	setFetchFailed,
	setFetchFailedLink,
	setFilterLoading,
	setFilterLoadingLink,
} = umssSlice.actions;
export default umssSlice.reducer;
/**
 * Endpoint, realiza la peticion para listar locaciones
 * @function {async} getLocationsAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 * la propiedad search tiene como valor defecto 'All' en caso de no aplicar una busqueda
 */
export const getLocationsAsync =
	(token, search = 'All') =>
	async dispatch => {
		search = search === '' ? 'All' : search;
		if (search === 'All') {
			dispatch(setLoading());
		} else {
			dispatch(setFilterLoading());
		}
		try {
			const r = await API.get(`location/list?search=${search}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch(setLocations(r.data));
		} catch (e) {
			dispatch(setFetchFailed());
			throw new Error(e);
		}
	};
/**
 * Endpoint, realiza la peticion para añadir una nueva locacion
 * @function {async} addLocationAsync
 * @param {String} token access_token del usuario
 * @param {String} values datos de la locacion
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const addLocationAsync = (token, values, position) => async dispatch => {
	const data = {
		name: values.name,
		type: values.type,
		lat: position.lat.toString(),
		lng: position.lng.toString(),
	};
	try {
		await API.post(`location/create`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getLocationsAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para editar una locacion
 * @function {async} editLocationAsync
 * @param {String} token access_token del usuario
 * @param {String} values datos de la locacion
 * @param {Object} position coordenadas
 * @param {Number} id identificador de la locacion
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const editLocationAsync = (token, values, position, id) => async dispatch => {
	const data = {
		name: values.name,
		type: values.type,
		lat: position.lat.toString(),
		lng: position.lng.toString(),
	};
	try {
		await API.post(`location/update?id=${id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getLocationsAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para eliminar una locacion
 * @function {async} deleteLocationAsync
 * @param {String} token access_token del usuario
 * @param {Number} id identificador de la locacion
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const deleteLocationAsync = (token, id) => async dispatch => {
	try {
		await API.delete(`location/delete?id=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getLocationsAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para listar links
 * @function {async} getSitesAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 * la propiedad search tiene como valor defecto 'All' en caso de no aplicar una busqueda
 */
export const getSitesAsync =
	(token, search = 'All') =>
	async dispatch => {
		search = search === '' ? 'All' : search;
		if (search === 'All') {
			dispatch(setLoadingLink());
		} else {
			dispatch(setFilterLoadingLink());
		}
		try {
			const r = await API.get(`link/list?search=${search}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch(setWebSites(r.data));
		} catch (e) {
			dispatch(setFetchFailedLink());
			throw new Error(e);
		}
	};
/**
 * Endpoint, realiza la peticion para añadir un nuevo link
 * @function {async} addSiteASync
 * @param {String} token access_token del usuario
 * @param {String} values datos del link
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const addSiteASync = (token, values, image) => async dispatch => {
	const b64 = image ? await convertToB64(image) : null;
	const data = { ...values, image: b64 };
	try {
		await API.post(`link/create`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getSitesAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};

/**
 * Endpoint, realiza la peticion para eliminar un link
 * @function {async} deleteSiteAsync
 * @param {String} token access_token del usuario
 * @param {Number} id identificador del link
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const deleteSiteAsync = (token, id) => async dispatch => {
	try {
		await API.delete(`link/delete?id=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getSitesAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para editar un link
 * @function {async} editLinkAsync
 * @param {String} token access_token del usuario
 * @param {Object} values datos nuevos del link
 * @param {Number} id identificador del link
 * @param {File} imageFile datos nuevos del link
 * @param {Boolean} editedFile datos nuevos del link
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const editLinkAsync = (token, values, id, image, editedFile) => async dispatch => {
	let data = null;
	if (editedFile) {
		const b64 = image ? await convertToB64(image) : null;
		data = { ...values, image: b64 };
	} else {
		data = values;
	}
	try {
		await API.post(`link/update?id=${id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getSitesAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
