import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import companiesData from '../json/business.json';
import { setCompanie } from './userSlice';
const initialState = {
	companies: null,
	companiesNotVerified: null,
	sucursales: [],
	profile: null,
	isLoading: false,
};

const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		setCompanies: (state, { payload }) => {
			state.companies = payload;
		},
		setCompaniesNV: (state, { payload }) => {
			state.companiesNotVerified = payload;
		},
		setSucursales: (state, { payload }) => {
			state.sucursales = payload;
		},
		setCompanieProfile: (state, { payload }) => {
			state.isLoading = false;
			state.profile = payload;
		},
		setLoading: state => {
			state.isLoading = true;
		},
	},
});

export const getCompaniesAsync = token => async dispatch => {
	try {
		const r = await API.get('empresa/list', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setCompanies(r.data));
		// console.log('empresas->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const compNotVerifiedAsync = token => async dispatch => {
	try {
		const r = await API.get('empresa/list-not-verified', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setCompaniesNV(r.data));
		// console.log('empresasNV->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const profileCompanieAsync = (idCompanie, token) => async dispatch => {
	console.log('si entra', idCompanie);
	dispatch(setLoading());
	try {
		const r = await API.get(`empresa/profile?id=${idCompanie}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log('perfilEmpresa->r:', r.data);
		dispatch(setCompanieProfile(r.data));
		return r.data;
	} catch (e) {
		throw new Error(e);
	}
};

export const convertb64 = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onload = () => {
			resolve(reader.result);
		};

		reader.onerror = error => {
			reject(error);
		};
	});
	// reader.onload = () => {
	// 	return reader.result;
	// };
};

export const createCompanieAsync =
	(dataform, sucursales, logo, idProveedor) => async dispatch => {
		// console.log(empresa, sucursales, logo);
		// var logo64 = null;
		let succes = false;
		const b64 = logo ? await convertb64(logo) : null;

		const data = {
			empresa: { ...dataform, logo: b64, id_proveedor: idProveedor },
			sucursales: sucursales,
		};
		console.log('data armado', data);
		try {
			const r = await API.post('empresa/create', data);
			dispatch(getCompaniesAsync());
			dispatch(setCompanie(r.data.id));

			console.log('createEmpresa->r:', r.data);
			succes = true;
		} catch (e) {
			throw new Error(e);
		}
		return succes;
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
		const r = await API.post('empresa/reject', values, {
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
	};
	try {
		const r = await API.post('empresa/approve', data, {
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

export const {
	setCompanies,
	setSucursales,
	setLoading,
	setCompanieProfile,
	setCompaniesNV,
} = companiesSlice.actions;
export default companiesSlice.reducer;
