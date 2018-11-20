import { ModalContent, ModalBackground, Button, Delete, Modal, ModalCard, ModalCardBody, ModalCardFooter, ModalCardHeader, ModalCardTitle, ModalClose, Section } from 'bloomer';
import * as React from 'react';

interface Props {
  showModal: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const CreateGameModal: React.SFC<Props> = (
  { showModal, onOpen, onClose }
) => (
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
          This should be a form
        </ModalCardBody>

        <ModalCardFooter isPulled="right" hasTextAlign="right">
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button isColor="info" onClick={() => {}}>
            Submit
          </Button>
        </ModalCardFooter>
      </ModalCard>
    </Modal>
  </Section>
);

export default CreateGameModal;
