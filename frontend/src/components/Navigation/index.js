import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentTeamThunk, getUserTeamsThunk } from "../../store/teams";
import OpenModalButton from "../OpenModalButton";
import TeamFormModal from "../TeamFormModal";
import ProfileButton from "./ProfileButton";
import SelectTeamField from "../SelectTeamField/Index";
import "./Navigation.css";
import DeleteTeamModal from "../DeleteTeamModal";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const [currentTeamId, setCurrentTeamId] = useState(4);
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);
  const userTeams = useSelector((state) => state.teams.userTeams);

  useEffect(() => {
    if(sessionUser) {
      dispatch(getUserTeamsThunk(sessionUser.id))
      dispatch(getCurrentTeamThunk(currentTeamId));
    }

  }, [sessionUser]);

  


  const handleTeamSelect = async (e) => {
    setCurrentTeamId(e.target.value);
    const data = await dispatch(getCurrentTeamThunk(e.target.value));

    if (data) {
      setErrors(data);
    }
  };

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {sessionUser && userTeams ? (
        <>
          <li>
            <SelectTeamField
              label="Select team"
              value={currentTeamId}
              onChange={handleTeamSelect}
              choices={userTeams}
              placeholder="Choose team"
            />
          </li>
          <li>
            <OpenModalButton
              buttonText="Update current team"
              modalComponent={
                <TeamFormModal type="update" title="Update team" />
              }
            />
          </li>
          <li>
            <OpenModalButton
              buttonText="Delete current team"
              modalComponent={
                <DeleteTeamModal />
              }
            />
          </li>
          <li>
            <OpenModalButton
              buttonText="Create a Team"
              modalComponent={
                <TeamFormModal type="create" title="Create a new team!" />
              }
            />
          </li>
        </>
      ) : null}

      <li>
        <Link to={`/channels/new`}>Create New Channel</Link>
      </li>

      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
