import * as React from 'react';
import { Lobby } from './Lobby';
import { ApplicationState } from '../store';
import * as lobbyActions from '../store/lobby/actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Room } from '../store/lobby/types';

interface Props {
  openRooms: Room[],
  showCreateGameModal: boolean;
  showModal: Function;
  hideModal: Function;
  fetchRooms: Function;
}

class LobbyContainer extends React.Component<Props> {
  // TODO: loading indicator

  componentDidMount() {
    this.props.fetchRooms();
  }

  render() {
    return (<Lobby {...this.props} />);
  }
}

const mapStateToProps = ({ lobby }: ApplicationState) => ({
  showCreateGameModal: lobby.showCreateGameModal,
  openRooms: lobby.openRooms,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showModal: () => dispatch(lobbyActions.showModal()),
  hideModal: () => dispatch(lobbyActions.hideModal()),
  fetchRooms: () => dispatch(lobbyActions.fetchRooms.request()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LobbyContainer);
