import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import companiesData from '../json/business.json';
import { setCompnieID } from './userSlice';
const initialState = {
	companies: null,
	sucursales: [],
};

const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		setCompanies: (state, { payload }) => {
			state.companies = payload;
		},
		setSucursales: (state, { payload }) => {
			state.sucursales = payload;
		},
	},
});
export const getCompaniesAsync = () => async (dispatch) => {
	try {
		const r = await API.get('/empresa/lista');
		dispatch(setCompanies(r.data));
		console.log('empresas->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};
export const getCompanieAsync = (idCompanie) => async () => {
	try {
		const r = await API.get(`/empresa/perfil?id=${idCompanie}`);
		console.log('perfilEmpresa->r:', r.data);
		return r.data;
	} catch (e) {
		throw new Error(e);
	}
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
	// reader.onload = () => {
	// 	return reader.result;
	// };
};
export const createCompanieAsync =
	(dataform, sucursales, logo, idProveedor) => async (dispatch) => {
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
			const r = await API.post('/empresa/create', data);
			dispatch(getCompaniesAsync());
			dispatch(setCompnieID(r.data.id));

			console.log('createEmpresa->r:', r.data);
			succes = true;
		} catch (e) {
			throw new Error(e);
		}
		return succes;
	};
export const getSucursales = (idEmpresa) => async (dispatch) => {
	try {
		const r = await API.get('/empresa/sucursales?id_e=' + idEmpresa);
		dispatch(setSucursales(r.data));
		console.log('sucursales->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};
export const { setCompanies, setSucursales } = companiesSlice.actions;
export default companiesSlice.reducer;
