import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../store";
import * as lobbyActions from "../store/lobby/actions";
import { Room, CreateRoomRequest } from "../store/lobby/types";
import { Lobby } from "./Lobby";

interface Props {
  openRooms: Room[];
  showCreateGameModal: boolean;
  showModal: () => void;
  hideModal: () => void;
  fetchRooms: () => void;
  createRoom: (room: CreateRoomRequest) => void;
}

class LobbyContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchRooms();
  }

  render() {
    return <Lobby {...this.props} />;
  }
}

const mapStateToProps = ({ lobby }: ApplicationState) => ({
  showCreateGameModal: lobby.showCreateGameModal,
  openRooms: lobby.openRooms
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showModal: () => dispatch(lobbyActions.showModal()),
  hideModal: () => dispatch(lobbyActions.hideModal()),
  fetchRooms: () => dispatch(lobbyActions.fetchRooms.request()),
  createRoom: (room: CreateRoomRequest) =>
    dispatch(lobbyActions.createRoom.request(room))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LobbyContainer);
