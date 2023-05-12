import { io } from "socket.io-client";
import { useEffect, useState } from "react";

import "./DeleteMessage.css";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteMessageThunk } from "../../store/messages";

let socketio;

const DeleteMessage = ({ message }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState("");
  const { closeModal } = useModal();

  useEffect(() => {
    socketio = io();

    setSocket(socketio);

    return () => socketio.disconnect();
  }, []);

  const handleYes = async (e) => {
    e.preventDefault();

    await dispatch(deleteMessageThunk(message.id));
    socket.emit("message sent", { room: message.channel_id });

    closeModal();
  };

  const handleNo = (e) => {
    e.preventDefault();

    closeModal();
  };

  return (
    <>
      <h1 className="delete-message-modal-h1">Delete Message?</h1>

      <button className="delete-message-modal-delete-button" onClick={handleYes}>Delete</button>

      <button className="delete-message-modal-button" onClick={handleNo}>Cancel</button>
    </>
  );
};

export default DeleteMessage;
