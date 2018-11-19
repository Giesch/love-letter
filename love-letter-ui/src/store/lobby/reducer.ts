import { Reducer } from 'redux'
import { LobbyState, LobbyActionTypes } from './types';

export const initialState: LobbyState = {
  showCreateGameModal: false,
  openRooms: [],
}

export const lobbyReducer: Reducer<LobbyState> = (state = initialState, action) => {
  switch (action.type) {
    case LobbyActionTypes.SHOW_CREATE_GAME: {
      return { ...state, showCreateGameModal: true };
    }
    case LobbyActionTypes.HIDE_CREATE_GAME: {
      return { ...state, showCreateGameModal: false };
    }
    case LobbyActionTypes.FETCH_ROOMS_SUCCESS: {
      return { ...state, openRooms: action.payload }
    }
    default: {
      return state;
    }
  }
}
