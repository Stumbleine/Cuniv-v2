import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
	isImmutableDefault,
} from '@reduxjs/toolkit';
import offersReducer from './offersSlice';
import usersReducer from './usersSlice';
import userReducer from './userSlice';
import loginReducer from './loginSlice';
import productsReducer from './productsSlice';
import companiesReducer from './companiesSlice';
import statisticsReducer from './statisticsSlice';
import publicReducer from './publicSlice';
import settingReducer from './settingSlice';
import rubrosReducer from './rubrosSlice';
import umssSlice from './umssSlice';
// MIDDLEWARE
const localStorageMiddleware = ({ getState }) => {
	return next => action => {
		const result = next(action);
		localStorage.setItem('applicationState', JSON.stringify(getState()));
		return result;
	};
};

const reHydrateStore = () => {
	// const statss = getState();
	// console.log(statss);
	if (localStorage.getItem('applicationState') !== null) {
		return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
	}
};
// const rootReducer = combineReducers({ loginReducer });
// const rootReducer = (state, action) => {
//   if (action.type === 'example/clearResults') {

//     // this applies to all keys defined in persistConfig(s)
//     storage.removeItem('persist:root')

//     state = {}
//   }
//   return appReducer(state, action)
// }
export default configureStore({
	reducer: {
		setting: settingReducer,
		// public: publicReducer,
		user: userReducer,
		login: loginReducer,
		users: usersReducer,
		companies: companiesReducer,
		offers: offersReducer,
		products: productsReducer,
		rubros: rubrosReducer,
		// statics: statisticsReducer,
		umss: umssSlice,
	},

	middleware: curryGetDefaultMiddleware =>
		curryGetDefaultMiddleware().concat(localStorageMiddleware),
	preloadedState: reHydrateStore(),
});
