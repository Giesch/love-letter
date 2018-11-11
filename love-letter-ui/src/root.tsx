import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { Store } from 'redux';

import { ApplicationState } from './store/index';
import { HelloContainer } from './components/Hello';

interface Props {
  store: Store<ApplicationState>;
}

export const Root = ({store}: Props) => (
  <Provider store={store}>
    <HelloContainer />
  </Provider>
);
