import {
  ActionType,
  createAsyncAction,
  createStandardAction
} from "typesafe-actions";
import { Room, CreateRoomRequest } from "./types";

const enum LobbyTypeStrings {
  SHOW_CREATE_GAME = "@lobby/SHOW_CREATE_GAME",
  HIDE_CREATE_GAME = "@lobby/HIDE_CREATE_GAME",

  FETCH_ROOMS_REQUEST = "@lobby/FETCH_ROOMS_REQUEST",
  FETCH_ROOMS_SUCCESS = "@lobby/FETCH_ROOMS_SUCCESS",
  FETCH_ROOMS_FAILURE = "@lobby/FETCH_ROOMS_FAILURE",

  CREATE_ROOM_REQUEST = "@lobby/CREATE_ROOM_REQUEST",
  CREATE_ROOM_SUCCESS = "@lobby/CREATE_ROOM_SUCCESS",
  CREATE_ROOM_FAILURE = "@lobby/CREATE_ROOM_FAILURE"
}

export const showModal = createStandardAction(
  LobbyTypeStrings.SHOW_CREATE_GAME
)();
export const hideModal = createStandardAction(
  LobbyTypeStrings.HIDE_CREATE_GAME
)();

// TODO: paging?
export const fetchRooms = createAsyncAction(
  LobbyTypeStrings.FETCH_ROOMS_REQUEST,
  LobbyTypeStrings.FETCH_ROOMS_SUCCESS,
  LobbyTypeStrings.FETCH_ROOMS_FAILURE
)<void, Room[], Error>();

export const createRoom = createAsyncAction(
  LobbyTypeStrings.CREATE_ROOM_REQUEST,
  LobbyTypeStrings.CREATE_ROOM_SUCCESS,
  LobbyTypeStrings.CREATE_ROOM_FAILURE
)<CreateRoomRequest, Room, Error>();

type LobbyActionType =
  | typeof showModal
  | typeof hideModal
  | typeof fetchRooms
  | typeof createRoom;

export type LobbyAction = ActionType<LobbyActionType>;
