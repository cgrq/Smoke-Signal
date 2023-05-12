import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createMessageThunk,
  deleteMessageThunk,
  getChannelMessagesThunk,
} from "../../store/messages";
import InputField from "../InputField";
import Button from "../Button";
import OpenModalButton from "../OpenModalButton";
import EditMessage from "../EditMessage";

const ViewChannel = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.channelMessages);
  const user = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    dispatch(getChannelMessagesThunk(id)).then(() => setIsLoaded(true));
  }, [dispatch, isLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      message: newMessage,
      channelId: id,
    };

    await dispatch(createMessageThunk(message));
    await dispatch(getChannelMessagesThunk(id));
    setNewMessage("");
    setIsLoaded(false);
  };

  if (!isLoaded) return <>Not Loaded</>;

  return (
    <div>
      {Object.values(messages).map((message) => (
        <div key={message.id}>
          <div>
            <p>{message.username}</p>
            <p>{message.message}</p>
            <p>{message.sent_at}</p>

            {Number(message.user_id) === Number(user.id) && (
              <>
                <button
                  onClick={(e) => {
                    if (window.confirm("Are you sure?")) {
                      dispatch(deleteMessageThunk(message.id));
                      setIsLoaded(false);
                    }
                  }}
                >
                  Delete?
                </button>

                <OpenModalButton
                  buttonText={"Edit"}
                  modalComponent={<EditMessage message={message} />}
                />
              </>
            )}
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <InputField
          label={"New Message"}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={"Type a new message here"}
          required={false}
        />

        <Button name={"Submit"} disabled={false} />
      </form>
    </div>
  );
};

export default ViewChannel;
