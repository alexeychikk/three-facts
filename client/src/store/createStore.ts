import { applyMiddleware, createStore as createReduxStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import enhancers from './enhancers';
import middleware from './middleware';
import { makeRootReducer } from './reducers';

export const createStore = (initialState = {}) => {
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
