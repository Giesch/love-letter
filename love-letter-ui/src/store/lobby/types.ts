export interface LobbyState {
  showCreateGameModal: boolean;
  openRooms: Room[];
}

export const enum LobbyActionTypes {
  SHOW_CREATE_GAME = 'lobby/SHOW_CREATE_GAME',
  HIDE_CREATE_GAME = 'lobby/HIDE_CREATE_GAME',
  FETCH_ROOMS_REQUEST = 'lobby/FETCH_ROOMS_REQUEST',
  FETCH_ROOMS_SUCCESS = 'lobby/FETCH_ROOMS_SUCCESS',
  FETCH_ROOMS_FAILURE = 'lobby/FETCH_ROOMS_FAILURE',
}

export interface Room {
  name: string;
  players: string[]; // usernames
}
