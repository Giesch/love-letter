import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Columns, Button, Section, Heading, Modal } from 'react-bulma-components/full';
import * as lobbyActions from '../store/lobby/actions';
import { ApplicationState } from '../store/index';
import CreateGameModal from './CreateGameModal';
import { Room } from '../store/lobby/types';

interface Props {
  showCreateGameModal: boolean;
  showModal: Function;
  hideModal: Function;
  openRooms: Room[];
}

export const Lobby: React.SFC<Props> = (props) => (
  <Columns>
    <Columns.Column size={9}>
      <Section>
        <Heading>Welcome!</Heading>
      </Section>
    </Columns.Column>

    <Columns.Column>
      <CreateGameModal
        showModal={props.showCreateGameModal}
        onOpen={props.showModal}
        onClose={props.hideModal}
      />

      <div>
        {props.openRooms.map(RoomDisplay)}
      </div>

    </Columns.Column>
  </Columns>
);

const RoomDisplay: React.SFC<Room> = (room) => (
  <div key={room.name}>
    name: {room.name}
  </div>
);

const mapStateToProps = ({ lobby }: ApplicationState) => ({
  showCreateGameModal: lobby.showCreateGameModal
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showModal: () => dispatch(lobbyActions.showModal()),
  hideModal: () => dispatch(lobbyActions.hideModal()),
});

// TODO: make this a real container with lifecycle methods
// Dispatch a fetch request on mount
// display the loaded rooms
// start with a refresh rooms button?
const LobbyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
