import { useDispatch } from "react-redux";
import { createMessageThunk } from "../../store/messages";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ErrorHandler from "../ErrorHandler";

let socketio;

function MessageInputs({ channelId }) {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    socketio = io();

    setSocket(socketio);

    return () => socketio.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.length > 500) {
      setErrors({
        ...errors,
        message: "Message cannot exceed 500 characters.",
      });
      return;
    }

    const message = {
      message: newMessage,
      channelId,
    };

    await dispatch(createMessageThunk(message));
    socket.emit("message sent", { room: channelId });

    setErrors({});
    setNewMessage("");
  };

  return (
    <>
      <ErrorHandler errors={errors} />
      <div className="chat-interface-message-inputs-wrapper">
        <form onSubmit={handleSubmit} className="chat-interface-message-form">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="chat-interface-message-input"
          />
          <button className="chat-interface-message-button" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default MessageInputs;
