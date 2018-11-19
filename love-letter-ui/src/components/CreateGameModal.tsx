import * as React from 'react';
import { Button, Modal, Section } from 'react-bulma-components/full';

interface Props {
  showModal: boolean;
  onOpen: Function;
  onClose: Function;
}

const CreateGameModal: React.SFC<Props> = (
  { showModal, onOpen, onClose }
) => (
  <Section>
    <Button color="info" onClick={onOpen}>
      Create Game
    </Button>

    <Modal show={showModal} onClose={onClose} closeOnBlur={true}>
      <Modal.Card>
        <Modal.Card.Head onClose={onClose}>
          <Modal.Card.Title>Create Game</Modal.Card.Title>
        </Modal.Card.Head>

        <Modal.Card.Body>
          This should be a form
        </Modal.Card.Body>

        <Modal.Card.Foot style={{ alignItems: 'right',
                                  justifyContent: 'right' }}>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button color="info" onClick={() => {}}>
            Submit
          </Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  </Section>
);

export default CreateGameModal;
