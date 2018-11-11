import 'mocha';
import { expect } from 'chai';

import { lobbyReducer, initialState } from './reducer';
import { ApplicationState } from '..';
import * as lobbyActions from './actions';

describe('lobby reducer', () => {
  it('has an initial state', () => {
    const result = lobbyReducer(undefined, { type: 'blah'});
    expect(result).to.not.be.undefined;
  });

  it('defaults to returning the same state', () => {
    const state = { ...initialState, showCreateGameModal: true };
    const result = lobbyReducer(state, { type: 'blah' });
    expect(result).to.eql(state);
  });

  it('can show the create game modal', () => {
    const state = { ...initialState, showCreateGameModal: false };
    const result = lobbyReducer(state, lobbyActions.showModal());
    expect(result.showCreateGameModal).to.be.true;
  });

  it('can hide the create game modal', () => {
    const state = { ...initialState, showCreateGameModal: true };
    const result = lobbyReducer(state, lobbyActions.hideModal());
    expect(result.showCreateGameModal).to.be.false;
  });
});
