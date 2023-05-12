import { useDispatch } from "react-redux";
import { createMessageThunk } from "../../store/messages";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socketio;

function MessageInputs({ channelId }) {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    socketio = io();

    setSocket(socketio);

    return () => socketio.disconnect();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      message: newMessage,
      channelId,
    };

    await dispatch(createMessageThunk(message));
    socket.emit("message sent", { room: channelId });

    setNewMessage("");
  };

  return (
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
  );
}

export default MessageInputs;
