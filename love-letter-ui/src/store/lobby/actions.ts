import { action, createAsyncAction } from 'typesafe-actions';
import { LobbyActionTypes, Room } from './types';

export const showModal = () => action(LobbyActionTypes.SHOW_CREATE_GAME);
export const hideModal = () => action(LobbyActionTypes.HIDE_CREATE_GAME);

export const fetchRooms = createAsyncAction(
  LobbyActionTypes.FETCH_ROOMS_REQUEST,
  LobbyActionTypes.FETCH_ROOMS_SUCCESS,
  LobbyActionTypes.FETCH_ROOMS_FAILURE
)<void, Room[], Error>();
