import React from 'react';
import { useModal } from '../../context/Modal';
import "./OpenChannelUpdateModalButton.css"

function OpenChannelUpdateModalButton({
  fillBackground, // boolean to either fill background of button or not
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    e.stopPropagation();
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) {
      onButtonClick()
    };
  };

  return (
    <button className={`open-channel-update-modal-button clickable` } onClick={onClick}>{buttonText}</button>
  );
}

export default OpenChannelUpdateModalButton;
