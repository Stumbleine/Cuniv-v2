import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';

const initialState = {
	locations: null,
	webSites: null,
	isLoading: false,
	successFetch: false,
	errorFetch: false,
};

const umssSlice = createSlice({
	name: 'umss',
	initialState,
	reducers: {
		setLocations: (state, { payload }) => {
			state.locations = payload;
			state.isLoading = false;
			// state.errorFetch = false;
		},
		setWebSites: (state, { payload }) => {
			state.webSites = payload;
			state.isLoading = false;
		},
		setLoading: (state, { payload }) => {
			state.isLoading = payload;
		},
		// setErrorFetch: state => {
		// 	state.errorFetch = true;
		// 	state.successFetch = false;
		// 	console.log('true');
		// },
		// setSuccessFetch: state => {
		// 	state.errorFetch = false;
		// 	state.successFetch = true;
		// },
	},
});

export const { setLocations, setWebSites, setLoading } = umssSlice.actions;
export default umssSlice.reducer;

export const getLocationsAsync = token => async dispatch => {
	dispatch(setLoading(true));
	try {
		const r = await API.get(`location/list`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setLocations(r.data));
	} catch (e) {
		dispatch(setLoading(false));
		throw new Error(e);
	}
};

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

export const editLocationAsync = (token, values, position, id) => async dispatch => {
	const data = {
		name: values.name,
		type: values.type,
		lat: position.lat.toString(),
		lng: position.lng.toString(),
	};
	try {
		const r = await API.post(`location/update?id=${id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		setTimeout(() => {
			dispatch(getLocationsAsync(token));
		}, 2000);
	} catch (e) {
		throw new Error(e);
	}
};

export const deleteLocationAsync = (token, id) => async dispatch => {
	try {
		const r = await API.delete(`location/delete?id=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		setTimeout(() => {
			dispatch(getLocationsAsync(token));
		}, 2000);
	} catch (e) {
		throw new Error(e);
	}
};

export const getSitesAsync = token => async dispatch => {
	dispatch(setLoading(true));
	try {
		const r = await API.get(`link/list`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setWebSites(r.data));
	} catch (e) {
		dispatch(setLoading(false));
		throw new Error(e);
	}
};

export const addSiteASync = (token, values, image) => async dispatch => {
	const b64 = image ? await convertToB64(image) : null;
	const data = { ...values, image: b64 };
	try {
		const r = await API.post(`link/create`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		setTimeout(() => {
			dispatch(getSitesAsync(token));
		}, 2000);
	} catch (e) {
		throw new Error(e);
	}
};

export const deleteSiteAsync = (token, id) => async dispatch => {
	try {
		const r = await API.delete(`link/delete?id=${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		setTimeout(() => {
			dispatch(getSitesAsync(token));
		}, 2000);
	} catch (e) {
		throw new Error(e);
	}
};

export const editLinkAsync = (token, values, id, image, editedFile) => async dispatch => {
	let data = null;
	if (editedFile) {
		const b64 = image ? await convertToB64(image) : null;
		data = { ...values, image: b64 };
	} else {
		data = values;
	}
	console.log(data, editedFile);

	try {
		const r = await API.post(`link/update?id=${id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getSitesAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
