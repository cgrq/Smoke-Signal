import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  createNewTeamThunk,
  updateTeamThunk,
  getAllTeamsThunk,
  getUserTeamsThunk,
  getCurrentTeamThunk,
} from "../../store/teams";
import InputField from "../InputField";
import OpenDeleteModalButton from "../OpenDeleteModalButton";
import DeleteTeamModal from "../DeleteTeamModal"
import Button from "../Button";
import ErrorHandler from "../ErrorHandler";
import "./TeamFormModal.css";

function TeamFormModal({ type, title }) {
  const dispatch = useDispatch();
  const currentTeam = useSelector((state) => state.teams.currentTeam);
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    if (type === "update" && currentTeam) {
      setName(currentTeam.name);
      setImageUrl(currentTeam.image_url);
    }
  }, [currentTeam]);

  useEffect(() => {
    dispatch(getAllTeamsThunk());
  }, [currentTeam]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;
    if (type === "create") {
      data = await dispatch(createNewTeamThunk({ name, imageUrl }));
    } else {
      data = await dispatch(
        updateTeamThunk({ id: currentTeam.id, name, imageUrl })
      );
    }

    if (data) {
      setErrors(data);
    } else {
      await dispatch(getUserTeamsThunk(sessionUser.id));
      await dispatch(getCurrentTeamThunk(currentTeam.id));
      closeModal();
    }
  };

  return (
    <>
      <h1 className="team-form-modal-h1">{title}</h1>
      <form className="team-form-modal-form" onSubmit={(e) => handleSubmit(e)}>
        {Object.values(errors).length > 0 && (
          <ErrorHandler errors={errors} />
        )}

        <InputField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Team name"
          required={true}
        />

        {/* <InputField
          label="Team Image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image to represent the team"
          required={false}
        /> */}

        <button className="login-modal-button" type="submit">{type === 'create' ? 'Create ' : 'Update '}Team</button>

      </form>
      {
        type === "update" && (
          <OpenDeleteModalButton
            buttonText="Delete"
            modalComponent={
              <DeleteTeamModal
              />
            }
          />
        )
      }
    </>
  );
}

export default TeamFormModal;
