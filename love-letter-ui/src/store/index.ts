import { AnyAction, combineReducers } from "redux";
import { combineEpics, Epic, EpicMiddleware } from "redux-observable";
import { Services } from "../services";
import { fetchRoomsFlow, createRoomFlow } from "./lobby/epics";
import { lobbyReducer } from "./lobby/reducer";
import { LobbyState } from "./lobby/types";

export interface ApplicationState {
  readonly lobby: LobbyState;
}

export type AppEpic = Epic<AnyAction, AnyAction, ApplicationState, Services>;

export type AppEpicMiddleware = EpicMiddleware<
  AnyAction,
  AnyAction,
  ApplicationState,
  Services
>;

export const rootReducer = combineReducers<ApplicationState>({
  lobby: lobbyReducer
});

export const rootEpic: AppEpic = combineEpics(fetchRoomsFlow, createRoomFlow);
