import { applyMiddleware, createStore, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ApplicationState, rootEpic, rootReducer, AppEpicMiddleware} from './store';
import { ajax } from 'rxjs/ajax';
import { Room } from './store/lobby/types';
import { map } from 'rxjs/operators';
import { RoomService, roomService } from './services/rooms';
import { services } from './services';

export const configureStore = (
  initialState: ApplicationState
): Store<ApplicationState> => {
  const epicMiddleware: AppEpicMiddleware = createEpicMiddleware({
    dependencies: services
  });

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(rootEpic);

  return store;
};


