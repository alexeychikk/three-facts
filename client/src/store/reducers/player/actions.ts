import { action } from 'typesafe-actions';
import * as cs from './constants';

export const initPlayer = (player: ThreeFacts.Player) =>
	action(cs.INIT_PLAYER, player);

export const setPlayer = (player?: ThreeFacts.Player) =>
	action(cs.SET_PLAYER, player);

export const setPlayerId = (id: string) => action(cs.SET_PLAYER_ID, id);

export const setPlayerName = (name: string) => action(cs.SET_PLAYER_NAME, name);
