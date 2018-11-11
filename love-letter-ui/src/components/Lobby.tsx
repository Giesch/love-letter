import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Columns, Button, Section, Heading, Modal } from 'react-bulma-components/full';
import * as lobbyActions from '../store/lobby/actions';
import { ApplicationState } from '../store/index';
import CreateGameModal from './CreateGameModal';

interface Props {
  showCreateGameModal: boolean;
  showModal: Function;
  hideModal: Function;
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
    </Columns.Column>
  </Columns>
);

const mapStateToProps = ({ lobby }: ApplicationState) => ({
  showCreateGameModal: lobby.showCreateGameModal
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showModal: () => dispatch(lobbyActions.showModal()),
  hideModal: () => dispatch(lobbyActions.hideModal()),
});

export const LobbyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
