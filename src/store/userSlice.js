import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { convertToB64 } from '../Utils/Helper';
import { setNavlinks } from './settingSlice';
/**
 * Slice para la cuenta de usuario
 * @module userSlice
 */
/**
 * Valores iniciales del slice usuario
 * @constant initialState
 */
const initialState = {
	user: {},
	isAdmin: false,
};
/**
 * Creacion y configuracion del Slice, reducers
 * @constant userSlice
 */
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
			payload?.roles.forEach(r => {
				state.isAdmin = r.isadmin && true;
			});
		},
		setIsAdmin: (state, { payload }) => {
			state.isAdmin = payload;
		},
		setCompanie: (state, { payload }) => {
			state.user = { ...state.user, empresa: payload };
		},
		setPermissions: (state, { payload }) => {
			state.permissions = payload;
		},
	},
});
/**
 * Endpoint, realiza la peticion para cargar la informacion del usuario que inicio sesion
 * @function {async} getUserAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const getUserAsync = token => async dispatch => {
	try {
		const r = await API.get(`user`, { headers: { Authorization: `Bearer ${token}` } });
		dispatch(setNavlinks(r.data));
		dispatch(setUser(r.data));
		// console.log('usersFilter->r:', r.data);
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para actualizar sesion del usuario y cerrar sesion
 * @function {async} logoutAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const logoutAsync = token => async dispatch => {
	try {
		await API.get('user/logout', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setUser(null));
		dispatch(setIsAdmin(false));
		// console.log('logOut->r :', r);
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para cambiar la contraseña de la cuenta de usuario
 * @function {async} changePasswordAsync
 * @param {String} token access_token del usuario
 * @param {Object} values nueva contraseña
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const changePasswordAsync = (token, values) => async dispatch => {
	try {
		await API.post(`user/change-password`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (e) {
		throw new Error(e);
	}
};
/**
 * Endpoint, realiza la peticion para actualizar la informacion de la cuenta
 * @function {async} updateAccountAsync
 * @param {String} token access_token del usuario
 * @param {Object} values datos de usario
 * @param {File} imageFile
 *
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const updateAccountAsync = (token, values, imageFile) => async dispatch => {
	const b64 = imageFile ? await convertToB64(imageFile) : null;
	if (b64 !== null) {
		values = { ...values, picture: b64 };
	}
	try {
		await API.post(`user/update`, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getUserAsync(token));
	} catch (e) {
		throw new Error(e);
	}
};
export const { setUser, setCompanie, setIsAdmin } = userSlice.actions;
export default userSlice.reducer;
