import { combineReducers, configureStore, isImmutableDefault } from '@reduxjs/toolkit';
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
// MIDDLEWARE
const localStorageMiddleware = ({ getState }) => {
	return next => action => {
		const result = next(action);
		const st = getState();
		// console.log('getState=>', st);
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

const reHydrateStore = () => {
	// console.log('Rehydrate=>', localStorage.getItem('appState'));
	if (localStorage.getItem('appState') !== null) {
		return JSON.parse(localStorage.getItem('appState')); // re-hydrate the store
	}
};

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

// const rootReducer = combineReducers({ loginReducer });
// const rootReducer = (state, action) => {
//   if (action.type === 'example/clearResults') {

//     // this applies to all keys defined in persistConfig(s)
//     storage.removeItem('persist:root')

//     state = {}
//   }
//   return appReducer(state, action)
// }
