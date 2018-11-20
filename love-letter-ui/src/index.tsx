import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configureStore } from './configureStore';
import './llstyles.scss';
import { Root } from './root';

const initialState: any = undefined;

const store = configureStore(initialState);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
