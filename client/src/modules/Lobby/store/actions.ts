import { action } from 'typesafe-actions';
import * as cs from './constants';

export const fetchGames = () => action(cs.FETCH_GAMES);

export const fetchGamesSuccess = games => action(cs.FETCH_GAMES_SUCCESS, games);

export const fetchGamesError = error => action(cs.FETCH_GAMES_ERROR, error);
