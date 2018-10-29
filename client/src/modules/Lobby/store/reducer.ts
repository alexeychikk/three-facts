import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type LobbyAction = ActionType<typeof actions>;

export type LobbyState = {};

const initialState: LobbyState = {};

const lobbyReducer = (
	state: LobbyState = initialState,
	action: LobbyAction
): LobbyState => {
	return state;
};

export default lobbyReducer;
