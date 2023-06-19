import EditMessageModal from "../../EditMessageModal";
import OpenEditMessageModalButton from "../../OpenEditMessageModalButton";

export default function Message({
  body,
  username,
  timestamp,
  user,
  message,
  index,
}) {
  const muid = message.user_id;
  const uid = user.id;

  function formatDateString(input) {
    const date = new Date(input);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedHour = (hour % 12 || 12).toString();
    const formattedMinute = minute.toString().padStart(2, "0");
    const amPm = hour < 12 ? "am" : "pm";

    return `${month}/${day}/${year} - ${formattedHour}:${formattedMinute} ${amPm}`;
  }

  return (
    <li
      className={`chat-interface-message ${index % 2 ? "odd" : "even"}-message`}
    >
      <div className="chat-interface-message-body" style={{width: "50%"}}>{body}</div>
      <div className="chat-interface-message-details">
        {uid === muid && index % 2 === 1 && (
          <div className="chat-interface-message-button-wrapper">
            <OpenEditMessageModalButton
              buttonText={"Edit"}
              modalComponent={<EditMessageModal message={message} />}
            />
          </div>
        )}
        <div
          className="chat-interface-message-sender"
          style={{ marginRight: "6px", marginLeft: "6px", fontWeight: "bold" }}
        >
          {username}
        </div>
        <div className="chat-interface-message-timestamp">
          {formatDateString(timestamp)}
        </div>
        {uid === muid && index % 2 === 0 && (
          <div className="chat-interface-message-button-wrapper">
            <OpenEditMessageModalButton
              buttonText={"Edit"}
              modalComponent={<EditMessageModal message={message} />}
            />
          </div>
        )}
      </div>
    </li>
  );
}
