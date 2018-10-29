import { combineReducers } from 'redux';
import { reducer as lobby } from '@modules/Lobby';

export const makeRootReducer = (asyncReducers?) => {
	return combineReducers({
		// my reducers
		lobby,
		...asyncReducers
	});
};

export const injectReducer = (store, { key, reducer }) => {
	if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

	store.asyncReducers[key] = reducer;
	store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
