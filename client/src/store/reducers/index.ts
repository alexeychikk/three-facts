import { combineReducers, Reducer } from 'redux';
import { lobbyReducer as lobby, LobbyState } from '@modules/Lobby';

import { playerReducer as player, PlayerState } from './player';

export type RootState = {
	lobby: LobbyState;
	player: PlayerState;
};

export const makeRootReducer = (asyncReducers?): Reducer<RootState> => {
	return combineReducers({
		// my reducers
		lobby,
		player,
		...asyncReducers
	});
};

export const injectReducer = (store, { key, reducer }) => {
	if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

	store.asyncReducers[key] = reducer;
	store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
