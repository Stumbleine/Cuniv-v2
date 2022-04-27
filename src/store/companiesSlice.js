import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import companiesData from '../json/business.json';

const initialState = {
	companies: companiesData,
};

const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		setCompanies: (state, { payload }) => {
			state.companies = payload;
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
// export const convertBase64 = (file) => {
// 	return new Promise((resolve, reject) => {
// 		const fileReader = new FileReader();
// 		fileReader.readAsDataURL(file);

// 		fileReader.onload = () => {
// 			resolve(fileReader.result);
// 		};

// 		fileReader.onerror = (error) => {
// 			reject(error);
// 		};
// 	});
// };
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
	(empresa, sucursales, logo) => async (dispatch) => {
		// console.log(empresa, sucursales, logo);
		// var logo64 = null;
		const b64 = await convertb64(logo);

		const data = {
			...empresa,
			logo: b64,
		};
		console.log('DATa=>', data);
		// try {
		// 	const r = await API.post('/empresa/create', empresa);
		// 	dispatch(getCompaniesAsync());
		// 	console.log('createEmpresa->r:', r.data);
		// } catch (e) {
		// 	throw new Error(e);
		// }
	};

export const { setCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;
