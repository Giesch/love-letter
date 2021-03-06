import { Column, Columns, Heading, Section } from "bloomer";
import * as React from "react";
import { Room, CreateRoomRequest } from "../store/lobby/types";
import CreateGameModal from "./CreateGameModal";

interface Props {
  showCreateGameModal: boolean;
  showModal: () => void;
  hideModal: () => void;
  openRooms: Room[];
  createRoom: (room: CreateRoomRequest) => void;
}

export const Lobby: React.SFC<Props> = props => (
  <Columns>
    <Column isSize={9}>
      <Section>
        <Heading>Welcome!</Heading>
      </Section>
    </Column>

    <Column>
      <CreateGameModal
        showModal={props.showCreateGameModal}
        onOpen={props.showModal}
        onClose={props.hideModal}
        onSubmit={props.createRoom}
      />

      <div>{props.openRooms.map(RoomDisplay)}</div>
    </Column>
  </Columns>
);

const RoomDisplay: React.SFC<Room> = room => (
  <div key={room.name}>name: {room.name}</div>
);
