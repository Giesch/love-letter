import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { Store } from 'redux';

import { ApplicationState } from './store/index';
import { LobbyContainer } from './components/Lobby';

interface Props {
  store: Store<ApplicationState>;
}

export const Root = ({store}: Props) => (
  <Provider store={store}>
    <LobbyContainer />
  </Provider>
);
