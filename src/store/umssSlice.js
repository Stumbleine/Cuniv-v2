import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';

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

export const getLocationsAsync =
	(token, search = 'All') =>
	async dispatch => {
		dispatch(setLoading());
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
		await API.post(`location/update?id=${id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getLocationsAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};

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

export const getSitesAsync =
	(token, search = 'All') =>
	async dispatch => {
		dispatch(setLoadingLink());
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
