import React from 'react';
import { useModal } from '../../context/Modal';
import "./OpenCreateNewChannelModalButton.css"

function OpenCreateNewChannelModalButton({
  buttonText, // text of the button that opens the modal
  modalComponent, // component to render inside the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) {
      onButtonClick()
    };
  };

  return (
    <button className={`open-create-new-channel-modal-button clickable`} onClick={onClick}>{buttonText}</button>
  );
}

export default OpenCreateNewChannelModalButton;
