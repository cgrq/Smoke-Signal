import { useDispatch } from "react-redux";
import InputField from "../InputField";
import { useEffect, useState } from "react";
import { editMessageThunk } from "../../store/messages";
import { useModal } from "../../context/Modal";
import { io } from "socket.io-client";
import "./EditMessageModal.css";
import OpenDeleteModalButton from "../OpenDeleteModalButton";
import DeleteMessage from "../DeleteMessage";


let socketio;

const EditMessageModal = ({ message }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [newMessage, setNewMessage] = useState(message.message);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    socketio = io();

    setSocket(socketio);

    return () => socketio.disconnect();
  }, [message.channelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    message.message = newMessage;
    message.channelId = message.channel_id;
    await dispatch(editMessageThunk(message));

    socket.emit("message sent", { room: message.channelId });

    closeModal();
  };

  return (
    <>
      <h1 className="edit-message-modal-h1">Edit Message</h1>
        <form onSubmit={handleSubmit} className="edit-message-modal-form">
          <InputField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required={true}
          />
          <button className="login-modal-button" type="submit">Submit</button>
          <OpenDeleteModalButton
              buttonText={"Delete"}
              modalComponent={<DeleteMessage message={message} />}
            />
        </form>
      </>
      );
};

      export default EditMessageModal;
