import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteChannelThunk, resetCurrentChannel, getTeamChannelsThunk, getUserChannelsThunk } from "../../store/channels";
import "./DeleteChannelModal.css";

function DeleteChannelModal({id }) {
  const dispatch = useDispatch();
  const currentTeamId = useSelector((state) => state.teams.currentTeam.id);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleDelete = async () => {

    const data = await dispatch(deleteChannelThunk(id));

    if (data) {
      setErrors(data);
    } else {
      dispatch(getTeamChannelsThunk(currentTeamId));
      dispatch(getUserChannelsThunk())
      dispatch(resetCurrentChannel());
      closeModal();
    }

  };

  return (
    <>
      <h1 className="delete-channel-modal-h1">Delete channel?</h1>

        <button className="delete-channel-modal-delete-button" onClick={handleDelete}>Delete</button>
        <button className="delete-channel-modal-button" onClick={closeModal}>Cancel</button>

    </>
  );
}

export default DeleteChannelModal;
