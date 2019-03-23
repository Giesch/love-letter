export interface LobbyState {
  showCreateGameModal: boolean;
  openRooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  players: string[]; // usernames
}

export interface CreateRoomRequest {
  name: string;
  player: string;
  passphrase?: string;
}
