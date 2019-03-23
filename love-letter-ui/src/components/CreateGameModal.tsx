import {
  Button,
  Label,
  Input,
  Control,
  Delete,
  Field,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardBody,
  ModalCardFooter,
  ModalCardHeader,
  ModalCardTitle,
  Section
} from "bloomer";
import * as React from "react";
import { CreateRoomRequest } from "../store/lobby/types";

interface Props {
  showModal: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (room: CreateRoomRequest) => void;
}

class CreateGameModal extends React.Component<Props> {
  state = {
    username: "",
    gamename: "",
    password: ""
  };

  private clickSubmit = () => {
    const req: CreateRoomRequest = {
      player: this.state.username,
      name: this.state.gamename
    };
    if (this.state.password) {
      req.passphrase = this.state.password;
    }
    this.props.onSubmit(req);
  };

  private setUsername: InputHandler = event => {
    const username = event.target.value;
    this.setState({ username });
  };

  private setGamename: InputHandler = event => {
    const gamename = event.target.value;
    this.setState({ gamename });
  };

  private setPassword: InputHandler = event => {
    const password = event.target.value;
    this.setState({ password });
  };

  render() {
    const { showModal, onOpen, onClose } = this.props;
    return (
      <Section>
        <Button isColor="info" onClick={onOpen}>
          Create Game
        </Button>

        <Modal isActive={showModal}>
          <ModalBackground onClick={onClose} />
          <ModalCard>
            <ModalCardHeader>
              <ModalCardTitle>Create Game</ModalCardTitle>
              <Delete onClick={onClose} />
            </ModalCardHeader>

            <ModalCardBody>
              <form>
                <Field>
                  <Label>Your Name (required)</Label>
                  <Control>
                    <Input
                      type="text"
                      placeholder="You"
                      onChange={this.setUsername}
                    />
                  </Control>
                </Field>

                <Field>
                  <Label>Game Name (required)</Label>
                  <Control>
                    <Input
                      type="text"
                      placeholder="fite me"
                      onChange={this.setGamename}
                    />
                  </Control>
                </Field>

                <Field>
                  <Label>Game Password (optional)</Label>
                  <Control>
                    <Input
                      type="text"
                      placeholder="secret"
                      onChange={this.setPassword}
                    />
                  </Control>
                </Field>
              </form>
            </ModalCardBody>

            <ModalCardFooter isPulled="right" hasTextAlign="right">
              <Button onClick={onClose}>Cancel</Button>
              <Button isColor="info" onClick={this.clickSubmit}>
                Submit
              </Button>
            </ModalCardFooter>
          </ModalCard>
        </Modal>
      </Section>
    );
  }
}

export default CreateGameModal;
