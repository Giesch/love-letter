import { applyMiddleware, createStore, Store } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { services } from "./services";
import {
  AppEpicMiddleware,
  ApplicationState,
  rootEpic,
  rootReducer
} from "./store";

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
