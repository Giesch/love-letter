import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import {
  createRoom,
  fetchRooms,
  hideModal,
  LobbyAction,
  showModal
} from "./actions";
import { LobbyState } from "./types";

export const initialState: LobbyState = {
  showCreateGameModal: false,
  openRooms: []
};

export const lobbyReducer: Reducer<LobbyState> = (
  state = initialState,
  action: LobbyAction
) => {
  switch (action.type) {
    case getType(showModal): {
      return { ...state, showCreateGameModal: true };
    }
    case getType(hideModal): {
      return { ...state, showCreateGameModal: false };
    }
    case getType(fetchRooms.success): {
      return { ...state, openRooms: action.payload };
    }
    case getType(createRoom.success): {
      return {
        ...state,
        openRooms: [action.payload].concat(state.openRooms)
      };
    }
    default: {
      return state;
    }
  }
};
