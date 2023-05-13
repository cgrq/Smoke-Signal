import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenDeleteModalButton from "../OpenDeleteModalButton";
import DeleteChannelModal from "../DeleteChannelModal";
import {
  editChannelThunk,
  createChannelThunk,
  getTeamChannelsThunk,
} from "../../store/channels";
import ErrorHandler from "../ErrorHandler";
import InputField from "../InputField";
import "./ChannelFormModal.css";

function ChannelFormModal({ id, componentType, title }) {
  const dispatch = useDispatch();

  const userChannels = useSelector((state) => state.channels.userChannels);
  const teamChannels = useSelector((state) => state.channels.teamChannels);
  const currentTeamId = useSelector((state) => state.teams.currentTeam.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const isGeneralChannel =
    componentType === "update" && name === "General Test Channel";

  useEffect(() => {
    if (componentType === "update" && teamChannels) {
      const channel = teamChannels[id];

      if (channel) {
        setName(channel.name);
        setDescription(channel.description);
        setImageUrl(channel.imageUrl);
      }
    }
  }, [teamChannels]);

  useEffect(() => {
    dispatch(getTeamChannelsThunk(currentTeamId));
  }, [currentTeamId]);

  const validChannel = (channel) => {
    const errors = {};
    const { name, description, imageUrl } = channel;

    if (name.length > 50) errors.name = "name must be less than 50 characters";

    if (description.length > 255)
      errors.description = "description must be less than 255 characters";

    if (imageUrl.length > 500)
      errors.imageUrlLength = "image url must be less than 500 characters";

    if (imageUrl && !imageUrl.match(/.(jpg|jpeg|png)$/))
      errors.validImgUrl = "image url must end in .jpg, .jpeg, or .png";

    return Object.values(errors).length > 0 ? errors : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newChannel = {
      id,
      name,
      description,
      type: "channel",
      imageUrl,
      teamId: currentTeamId,
    };

    if (validChannel(newChannel) !== true) {
      setErrors({ ...validChannel(newChannel) });
      return;
    }

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

  if (isGeneralChannel)
    return (
      <>
        <h1 className="channel-form-modal-h1">{title}</h1>
        <p className="error-p">Cannot Update/Delete General Channel</p>
      </>
    );

  return (
    <>
      <h1 className="channel-form-modal-h1">{title}</h1>
      <form
        className="channel-form-modal-form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <ErrorHandler errors={errors} />

        <InputField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=""
          required={true}
        />

        <InputField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder=""
          required={true}
        />

        <InputField
          label="Channel Image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Optional"
          required={false}
        />

        <button className="login-modal-button" type="submit">
          {componentType === "create" ? "Create " : "Update "}Channel
        </button>
      </form>
      {componentType === "update" && (
        <OpenDeleteModalButton
          buttonText="Delete"
          modalComponent={<DeleteChannelModal id={id} />}
        />
      )}
    </>
  );
}

export default ChannelFormModal;
