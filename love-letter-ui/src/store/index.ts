import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { LobbyState } from './lobby/types';
import { lobbyReducer } from './lobby/reducer';

export interface ApplicationState {
  readonly lobby: LobbyState;
}

export const rootReducer = combineReducers<ApplicationState>({
  lobby: lobbyReducer,
});
