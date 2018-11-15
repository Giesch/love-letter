import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { ApplicationState, rootEpic, rootReducer, AppEpicMiddleware, RoomService } from './store';
import { ajax } from 'rxjs/ajax';
import { Room } from './store/lobby/types';
import { map } from 'rxjs/operators';

export const configureStore = (
  initialState: ApplicationState
): Store<ApplicationState> => {
  const composeEnhancers = composeWithDevTools({})

  // TODO: put this in a services directory
  const roomsApi: RoomService = {
    getRooms: () => ajax.getJSON('/rooms').pipe(
      map(response => response as Room[])
    )
  };

  const epicMiddleware: AppEpicMiddleware = createEpicMiddleware({
    dependencies: {
      roomsApi
    }
  });

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(rootEpic);

  return store;
};


