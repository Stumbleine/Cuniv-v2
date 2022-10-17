import { configureStore } from '@reduxjs/toolkit';
import offersReducer from './offersSlice';
import usersReducer from './usersSlice';
import userReducer from './userSlice';
import loginReducer from './loginSlice';
import productsReducer from './productsSlice';
import companiesReducer from './companiesSlice';
import statisticsReducer from './statisticsSlice';
import settingReducer from './settingSlice';
import rubrosReducer from './rubrosSlice';
import umssSlice from './umssSlice';
import complaintSlice from './complaintSlice';
import cashierSlice from './cashierSlice';

/**
 * Store de redux toolkit
 * @module store
 */
/**
 * Middleware que guarda todo los estados de redux, de cada slice en el localStorage bajo el nombre "appState"
 * @function localStorageMiddleware
 * @property {Function} getState obtiene los estados de los slice's
 */
const localStorageMiddleware = ({ getState }) => {
	return next => action => {
		const result = next(action);
		const st = getState();
		const appState = {
			login: st.login,
			user: st.user,
			setting: st.setting,
		};
		// console.log('appState=>', appState);
		localStorage.setItem('appState', JSON.stringify(appState));
		return result;
	};
};
/**
 * Realiza un refresh a los estados de redux con los valores guardados en localStorage y busca en el item "appState"
 * @function reHydrateStore
 */
const reHydrateStore = () => {
	// console.log('Rehydrate=>', localStorage.getItem('appState'));
	if (localStorage.getItem('appState') !== null) {
		return JSON.parse(localStorage.getItem('appState')); // re-hydrate the store
	}
};
/**
 * Configuracion del store, donde se incluye todos los slices y sus reducers existentes
 * middleware: ejecutar el middleware para guardar en localStorage
 * preloadState: trae las funciones para precargar la store con los datos del localstorage
 * @function configureStore
 */
export default configureStore({
	reducer: {
		setting: settingReducer,
		user: userReducer,
		login: loginReducer,
		users: usersReducer,
		companies: companiesReducer,
		offers: offersReducer,
		products: productsReducer,
		rubros: rubrosReducer,
		complaint: complaintSlice,
		umss: umssSlice,
		cashier: cashierSlice,
		statics: statisticsReducer,
	},
	middleware: curryGetDefaultMiddleware =>
		curryGetDefaultMiddleware().concat(localStorageMiddleware),
	preloadedState: reHydrateStore(),
});
