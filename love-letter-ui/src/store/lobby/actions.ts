import { action } from 'typesafe-actions';
import { LobbyActionTypes } from './types';

export const showModal = () => action(LobbyActionTypes.SHOW_CREATE_GAME);
export const hideModal = () => action(LobbyActionTypes.HIDE_CREATE_GAME);
