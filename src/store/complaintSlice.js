import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';

const initialState = {
	complaints: null,
	fetchFailed: false,
	isLoading: false,
	filterLoading: false,
};

const complaintSlice = createSlice({
	name: 'complaint',
	initialState,
	reducers: {
		setComplaints: (state, { payload }) => {
			state.isLoading = false;
			state.filterLoading = false;
			state.complaints = payload;
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
	},
});
export const { setComplaints, setLoading, setFetchFailed, setFilterLoading } =
	complaintSlice.actions;
export default complaintSlice.reducer;

export const complaintsAsync = token => async dispatch => {
	dispatch(setLoading());
	try {
		const r = await API.get(`reclamo/list`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setComplaints(r.data));
		console.log('ComplaintsData->r:', r.data);
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};

export const complaintsFilterAsync = (token, search, type) => async dispatch => {
	dispatch(setFilterLoading());
	try {
		const r = await API.get(`reclamo/list?search=${search}&type=${type}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setComplaints(r.data));
		console.log('ComplaintsFilterData->r:', r.data);
	} catch (e) {
		dispatch(setFetchFailed());
		throw new Error(e);
	}
};
