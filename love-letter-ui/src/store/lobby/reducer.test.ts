import 'mocha';
import { expect } from 'chai';

import { lobbyReducer, initialState } from './reducer';
import { ApplicationState } from '..';
import * as lobbyActions from './actions';
import { LobbyState, Room } from './types';

describe('lobby reducer', () => {
  it('has an initial state', () => {
    const result = lobbyReducer(undefined, { type: 'blah'});
    expect(result).to.not.be.undefined;
  });

  it('defaults to returning the same state', () => {
    const state: LobbyState = { ...initialState, showCreateGameModal: true };
    const result = lobbyReducer(state, { type: 'blah' });
    expect(result).to.eql(state);
  });

  it('can show the create game modal', () => {
    const state: LobbyState = { ...initialState, showCreateGameModal: false };
    const result = lobbyReducer(state, lobbyActions.showModal());
    expect(result.showCreateGameModal).to.be.true;
  });

  it('can hide the create game modal', () => {
    const state: LobbyState = { ...initialState, showCreateGameModal: true };
    const result = lobbyReducer(state, lobbyActions.hideModal());
    expect(result.showCreateGameModal).to.be.false;
  });

  it('loads open rooms', () => {
    const state: LobbyState = { ...initialState, openRooms: []};
    const room: Room = { name: "blah", players: [] };
    const rooms = [room];
    const result = lobbyReducer(state, lobbyActions.fetchRooms.success(rooms));
    expect(result.openRooms).to.eql(rooms);
  });
});
