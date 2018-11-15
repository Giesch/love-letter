import { AnyAction, combineReducers } from 'redux';
import { combineEpics, Epic, EpicMiddleware } from 'redux-observable';
import { lobbyReducer } from './lobby/reducer';
import { LobbyState, Room } from './lobby/types';
import { fetchRoomsFlow } from './lobby/epics';
import { Observable } from 'rxjs';

export interface ApplicationState {
  readonly lobby: LobbyState;
}

export interface RoomService {
  getRooms(): Observable<Room[]>;
}

export interface Services {
  roomsApi: RoomService;
}

export type AppEpic =
  Epic<AnyAction, AnyAction, ApplicationState, Services>;

export type AppEpicMiddleware =
  EpicMiddleware<AnyAction, AnyAction, ApplicationState, Services>;

export const rootReducer = combineReducers<ApplicationState>({
  lobby: lobbyReducer,
});

export const rootEpic: AppEpic = combineEpics(
  fetchRoomsFlow
)
