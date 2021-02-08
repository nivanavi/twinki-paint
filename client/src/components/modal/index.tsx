import React                                                                       from "react";
import {StyledCloseButton, StyledModal, StyledModalBackground, StyledModalWrapper} from "./styles";
import {CloseIcon}                                                                 from "../../icons/ui/Close";
import {Loader}                                                                    from "../loader";
import {Heading2}                                                                  from "../globalStyledComponents";

export interface ModalProps {
  header?: string
  onClose: () => void
  children?: any
  isOpen: boolean
  isLoading?: boolean
  width?: number
  event?: (data: any) => void
  data?: any
}

const ModalContent = ({header, width, onClose, children, isLoading}: ModalProps) => {

  const onEscapePress = ({key}) => {
    if (key !== "Escape") return;
    onClose();
  };

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keyup", onEscapePress)
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keyup", onEscapePress)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <StyledModalWrapper>
      <StyledModalBackground onClick={() => onClose()}/>
      <StyledModal width={typeof width === "undefined" ? 53 : width}>
        <StyledCloseButton onClick={() => onClose()}>
          <CloseIcon/>
        </StyledCloseButton>
        {header && <Heading2>{header}</Heading2>}
        {!!isLoading ? <Loader type="simple"/> : children}
      </StyledModal>
    </StyledModalWrapper>
  );
}

export const Modal = (props: ModalProps) => {
  const {isOpen} = props;
  if (!isOpen) return null;
  return <ModalContent {...props}/>
};

export default Modal;