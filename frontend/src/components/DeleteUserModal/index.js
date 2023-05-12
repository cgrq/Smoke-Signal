import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteUser } from "../../store/session";
import "./DeleteUserModal.css";

function DeleteUserModal() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const currentTeam = useSelector(state => state.teams.currentTeam);
  const { closeModal } = useModal();


  const handleDelete = async () => {
    const data = await dispatch(deleteUser(currentTeam.id));


    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }

  };

  return (
    <>
      <h1 className="delete-user-modal-h1">Delete account?</h1>
        <button className = "delete-user-modal-delete-button" onClick={handleDelete}>Delete</button>
        <button className = "delete-user-modal-button" onClick={closeModal}>Cancel</button>
    </>
  );
}

export default DeleteUserModal;
