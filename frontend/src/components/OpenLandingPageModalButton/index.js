import React from 'react';
import { useModal } from '../../context/Modal';
import "./OpenLandingPageModalButton.css"

function OpenLandingPageModalButton({
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
    if (onButtonClick) onButtonClick();
  };

  return (
    <button className={`open-landing-page-modal-button ${fillBackground && "open-landing-page-modal-button-fill"}`} onClick={onClick}>{buttonText}</button>
  );
}

export default OpenLandingPageModalButton;
