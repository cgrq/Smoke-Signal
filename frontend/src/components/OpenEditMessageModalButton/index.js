import React from 'react';
import { useModal } from '../../context/Modal';
import "./OpenEditMessageModalButton.css"

function OpenEditMessageModalButton({
  fillBackground, // boolean to either fill background of button or not
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
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
    <button className={`open-modal-button `} onClick={onClick}>{buttonText}</button>
  );
}

export default OpenEditMessageModalButton;
