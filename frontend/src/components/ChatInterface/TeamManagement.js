import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTeamChannelsThunk } from "../../store/channels";
import { getUserTeamsThunk } from "../../store/teams";
import { getCurrentTeamThunk } from "../../store/teams";
import OpenCreateNewChannelModalButton from "../OpenCreateNewChannelModalButton";
import SelectTeamField from "../SelectTeamField/Index";
import OpenModalButton from "../OpenModalButton";
import OpenEditModalButton from "../OpenEditModalButton";
import OpenCreateATeamModalButton from "../OpenCreateATeamModalButton";
import TeamFormModal from "../TeamFormModal";
import DeleteTeamModal from "../DeleteTeamModal";
import ChannelFormModal from "../ChannelFormModal";
import DirectMessageFormModal from "../DirectMessageFormModal";

function TeamManagement() {
  const [currentTeamId, setCurrentTeamId] = useState(4);
  const dispatch = useDispatch();
  const sessionUserId = useSelector((state) => state.session.user.id);
  const userTeams = useSelector((state) => state.teams.userTeams);
  const [errors, setErrors] = useState({});

  const handleTeamSelect = async (e) => {
    setCurrentTeamId(e.target.value);
    const data = await dispatch(getCurrentTeamThunk(e.target.value));

    if (data) {
      setErrors(data);
    } else {
      // dispatch(getUserTeamsThunk(sessionUserId));
      dispatch(getTeamChannelsThunk(currentTeamId));
      dispatch(getUserTeamsThunk());
    }
  };

  return (
    <div className="chat-interface-team-management-wrapper">
      <SelectTeamField
        label="Select team"
        value={currentTeamId}
        onChange={handleTeamSelect}
        choices={userTeams}
        placeholder="Choose team"
      />
      <OpenEditModalButton
        buttonText="Edit team"
        modalComponent={<TeamFormModal type="update" title="Update team" />}
      />
      {/* <OpenModalButton
        buttonText="Delete current team"
        modalComponent={<DeleteTeamModal />}
      /> */}
      <div className="chat-interface-create-buttons-wrapper">
        <OpenCreateATeamModalButton
          buttonText="Create a team"
          modalComponent={
            <TeamFormModal type="create" title="Create a team" />
          }
        />
        <OpenCreateNewChannelModalButton
          buttonText={"Create a channel"}
          modalComponent={
            <ChannelFormModal
              componentType="create"
              title="Create a channel"
            />
          } />
      </div>


      {/* <OpenModalButton
        buttonText="Create a Channel"
        modalComponent={
          <ChannelFormModal
            componentType="create"
            title="Create a new channel"
          />
        }
      /> */}
      {/* <OpenModalButton
        buttonText="Create a Direct Message"
        modalComponent={
          <DirectMessageFormModal
            componentType="create"
            title="Send a direct message"
          />
        }
      />*/}
    </div>
  );
}

export default TeamManagement;
