export interface LobbyState {
  showCreateGameModal: boolean;
}

export const enum LobbyActionTypes {
  SHOW_CREATE_GAME = 'lobby/SHOW_CREATE_GAME',
  HIDE_CREATE_GAME = 'lobby/HIDE_CREATE_GAME',
}
