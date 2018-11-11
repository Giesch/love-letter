import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { History } from 'history'
import { HelloState } from './hello/types';
import { helloReducer } from './hello/reducer';

export interface ApplicationState {
  readonly hello: HelloState;
}

export const rootReducer = combineReducers<ApplicationState>({
  hello: helloReducer,
});
