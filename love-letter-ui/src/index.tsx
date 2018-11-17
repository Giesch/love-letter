import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware, Reducer, AnyAction } from 'redux'

import { Root } from './root';
import { ApplicationState } from './store';
import { rootReducer } from './store/index';
import { configureStore } from './configureStore';

const initialState: any = undefined;

const store = configureStore(initialState);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
