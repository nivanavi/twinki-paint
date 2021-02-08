import React               from 'react';
import Button              from "../button/button";
import Modal, {ModalProps} from "../modal";
import NivaInput           from "../nivaInput/NivaInput";
import canvasState    from '../../store/canvasState'

export const UsernameModal = ({onClose, isOpen, header}: ModalProps) => {
  const [stateUserName, setUserName] = React.useState<string>("");

  const logInHandler = () => {
    canvasState.setUsername(stateUserName);
    localStorage.setItem('username', stateUserName);
    onClose();
  }

  return (
    <Modal onClose={() => {}} isOpen={isOpen} header={header}>
      <NivaInput placeholder="Ваш никнейм" debounce={true} debounceOffset={500} onChange={(value) => setUserName(value)}/>
      <div style={{marginTop: "4rem"}}>
        <Button isDisabled={!stateUserName} width="100%" appearance="filled" onClick={() => logInHandler()}>Войти</Button>
      </div>
    </Modal>
  )
};

export default UsernameModal;