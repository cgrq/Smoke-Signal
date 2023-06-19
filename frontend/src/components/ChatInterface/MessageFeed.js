import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { getChannelMessagesThunk } from "../../store/messages";

let socketio;

function MessageFeed({ channelId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const messages = useSelector((state) => state.messages.channelMessages);

  // const [messages, setMessages] = useState(msgs);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getChannelMessagesThunk(channelId)).then(() => setIsLoaded(true));

    socketio = io();

    socketio.emit("join", channelId);

    socketio.on(`message received`, async () => {
      dispatch(getChannelMessagesThunk(channelId));
    });

    return () => {
      socketio.disconnect();
    };
  }, [channelId]);

  if (!isLoaded) return <>Loading...</>;

  return (
    <div className="chat-interface-message-feed">
      <ul className="chat-interface-message-wrapper">
        {Object.values(messages).map((message, idx) => (
          <div key={message.id}>
            <Message
              body={message.message}
              username={message.username}
              timestamp={message.sent_at}
              user={user}
              message={message}
              index={idx}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}
export default MessageFeed;
