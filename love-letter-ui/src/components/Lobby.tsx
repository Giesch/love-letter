import * as React from 'react';
import { Columns, Button, Section, Heading, Modal } from 'react-bulma-components/full';
import * as lobbyActions from '../store/lobby/actions';
import { ApplicationState } from '../store/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface Props {
  showCreateGameModal: boolean;
  showModal: typeof lobbyActions.showModal;
  hideModal: typeof lobbyActions.hideModal;
}

export const Lobby = (props: Props) => (
  <Columns>
    <Columns.Column size={9}>
      <Section>
        <Heading>Welcome!</Heading>
      </Section>
    </Columns.Column>

    <Columns.Column>
      <Section>
        <Button color="info" onClick={props.showModal}>
            Create Game
        </Button>
        <Modal show={props.showCreateGameModal}
               onClose={props.hideModal}
               showClose={false}
               closeOnBlur={true}>
          <Modal.Card>
            <Modal.Card.Head>
              <Modal.Card.Title>Create Game</Modal.Card.Title>
            </Modal.Card.Head>
            <Modal.Card.Body>Stuff Godes Here</Modal.Card.Body>
            <Modal.Card.Foot>nope nope nope</Modal.Card.Foot>
          </Modal.Card>
        </Modal>
      </Section>
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
