import { applyMiddleware, createStore as createReduxStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { makeRootReducer } from './reducers';

export const createStore = (initialState = {}) => {
	// ======================================================
	// Middleware Configuration
	// ======================================================
	const middleware = [reduxThunk];

	// ======================================================
	// Store Enhancers
	// ======================================================
	const enhancers = [];

	// ======================================================
	// Store Instantiation and HMR Setup
	// ======================================================
	const store = createReduxStore(
		makeRootReducer(),
		initialState,
		composeWithDevTools(applyMiddleware(...middleware), ...enhancers)
	);
	store.asyncReducers = {};

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const reducers = require('./reducers').default;
			store.replaceReducer(reducers(store.asyncReducers));
		});
	}

	return store;
};

export default createStore;
