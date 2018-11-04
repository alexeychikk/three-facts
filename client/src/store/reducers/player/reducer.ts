import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';
import uuid from 'uuid';

import { deepTrip } from '@shared/utils/text';
import * as actions from './actions';
import * as cs from './constants';

export type PlayerAction = ActionType<typeof actions>;

export type PlayerState = ThreeFacts.Player;

const initialState: PlayerState = {};

export const playerReducer: Reducer<PlayerState> = (
	state: PlayerState = initialState,
	action: PlayerAction
): PlayerState => {
	switch (action.type) {
		case cs.INIT_PLAYER:
			return action.payload.id
				? action.payload
				: { id: uuid(), ...action.payload };

		case cs.SET_PLAYER:
			return action.payload || {};

		case cs.SET_PLAYER_ID:
			return { ...state, id: action.payload };

		case cs.SET_PLAYER_NAME:
			return { ...state, name: deepTrip(action.payload) };

		default:
			return state;
	}
};

export default playerReducer;
