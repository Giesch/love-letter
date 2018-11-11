import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { HelloState } from './hello/types';
import { helloReducer } from './hello/reducer';
import { LobbyState } from './lobby/types';
import { lobbyReducer } from './lobby/reducer';

export interface ApplicationState {
  readonly hello: HelloState;
  readonly lobby: LobbyState;
}

export const rootReducer = combineReducers<ApplicationState>({
  hello: helloReducer,
  lobby: lobbyReducer,
});
