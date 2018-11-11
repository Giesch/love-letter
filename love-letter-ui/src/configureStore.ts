import { ApplicationState, rootReducer } from './store';
import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const configureStore = (
  initialState: ApplicationState
): Store<ApplicationState> => {
  const composeEnhancers = composeWithDevTools({})

  return createStore(
    rootReducer,
    initialState
  );
};


