import { createSlice } from '@reduxjs/toolkit';
import API from '../conection';
import { getNavlinks } from '../Utils/RBAC';
/**
 * Slice para configuracion como navlinks, notificaciones
 * @module settingSlice
 */
/**
 * Valores iniciales del slice empresas
 * @constant initialState
 */
const initialState = {
	navlinks: [],
	notilist: [],
	badge: true,
};
/**
 * Creacion y configuracion del Slice, reducers
 * @constant settingSlice
 */

const settingSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		setNavlinks: (state, { payload }) => {
			console.log(payload);
			let isAdmin = false;
			payload?.roles.forEach(r => {
				isAdmin = r.isadmin && true;
			});
			state.navlinks = getNavlinks(payload.permisos, isAdmin);
		},

		setNewNoti: (state, { payload }) => {
			const noti = { ...payload, recent: true };
			state.notilist = [noti, ...state.notilist];
		},
		setBadge: (state, { payload }) => {
			state.badge = payload;
		},
		setNotifications: (state, { payload }) => {
			state.notilist = payload;
		},
	},
});
/**
 * Endpoint, realiza la peticion para listar notificaciones
 * @function {async} notificationsAsync
 * @param {String} token access_token del usuario
 * @property {Function} dispatch funcion que ejecuta funciones del reducer de companiesSlice
 */
export const notificationsAsync = token => async dispatch => {
	try {
		const r = await API.get(`notification/notis`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setNotifications(r.data));
		console.log('Notis=>', r.data);
	} catch (e) {
		throw new Error(e);
	}
};

export const { setNavlinks, setNotifications, setBadge, setNewNoti } =
	settingSlice.actions;
export default settingSlice.reducer;
