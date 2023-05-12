import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  editChannelThunk,
  createChannelThunk,
  getTeamChannelsThunk,
  getUserChannelsThunk,
} from "../../store/channels";
import InputField from "../InputField";
import "./DirectMessageFormModal.css";
import ErrorHandler from "../ErrorHandler";

function DirectMessageFormModal({ id, componentType, title }) {
  const dispatch = useDispatch();

  const userChannels = useSelector((state) => state.channels.userChannels);
  const currentTeamId = useSelector((state) => state.teams.currentTeam.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const { closeModal } = useModal();

  useEffect(() => {
    if (componentType === "update" && userChannels) {
      const channel = userChannels[id];

      if (channel) {
        setName(channel.name);
        setDescription(channel.description);
        setImageUrl(channel.imageUrl);
        setRecipientId();
      }
    }
  }, [userChannels]);

  useEffect(() => {
    dispatch(getUserChannelsThunk());
  }, [currentTeamId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChannel = {
      id,
      name,
      description,
      type: "dm",
      imageUrl,
      teamId: currentTeamId,
      recipientId,
    };

    let data;
    if (componentType === "create") {
      data = await dispatch(createChannelThunk(newChannel));
    } else {
      data = await dispatch(editChannelThunk(newChannel));
    }

    if (data) {
      setErrors(data);
    } else {
      await dispatch(getTeamChannelsThunk(currentTeamId));
      closeModal();
    }
  };

  return (
    <>
      <h1>{title}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        {Object.values(errors).length > 0 && <ErrorHandler errors={errors} />}

        <InputField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Channel name"
          required={true}
        />

        <InputField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required={true}
        />

        <InputField
          label="Channel Image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image to represent the channel"
          required={false}
        />

        <InputField
          label="Recipient"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          placeholder="Enter recipient ID"
          required={false}
        />

        <button type="submit">
          {componentType === "create" ? "Create " : "Update "}Channel
        </button>
      </form>
    </>
  );
}

export default DirectMessageFormModal;
