import "./ChatInterface.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentTeamThunk, getUserTeamsThunk } from "../../store/teams";
import TeamManagement from "./TeamManagement";
import SmokeSignal from "../SmokeSignal";
import SearchNav from "./SearchNav";
import MessageFeed from "./MessageFeed";
import MessageInputs from "./MessageInputs";
import ChannelFeed from "./ChannelFeed";
import DirectMessageFeed from "./DirectMessageFeed";
import {
  getUserChannelsThunk,
  getTeamChannelsThunk,
} from "../../store/channels";

function ChatInterface({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const currentTeam = useSelector((state) => state.teams.currentTeam);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const userChannels = useSelector((state) => state.channels.userChannels);
  const teamChannels = useSelector((state) => state.channels.teamChannels);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (sessionUser && sessionUser.id) {
      if (currentTeam && currentTeam.id) {
        dispatch(getTeamChannelsThunk(currentTeam.id));
        dispatch(getUserChannelsThunk());
      }
      dispatch(getUserTeamsThunk(sessionUser.id));
      // dispatch(getCurrentTeamThunk(currentTeam.id));
    }
  }, [sessionUser]);

  useEffect(() => {
    dispatch(getCurrentTeamThunk(4));
  }, []);

  useEffect(() => {
    if (currentTeam && currentTeam.id) {
      dispatch(getTeamChannelsThunk(currentTeam.id));
      dispatch(getUserChannelsThunk());
    }
  }, [currentTeam]);

  return (
    <div className="chat-interface-main-wrapper">
      {/* Left Column */}
      <div className="chat-interface-main-column chat-interface-main-left-column">
        {/* Logo */}
        <div className="chat-interface-smoke-signal-wrapper">
          <SmokeSignal />
        </div>
        {/* Team management*/}
        <TeamManagement />
        {currentTeam && teamChannels && userChannels ? (
          <>
            {/* Channels */}
            <ChannelFeed
              teamChannels={teamChannels}
              currentTeamId={currentTeam.id}
            />
            {/* Direct Messages */}
            {/* <DirectMessageFeed
              userChannels={userChannels}
              currentTeamId={currentTeam.id}
            /> */}
          </>
        ) : null}
      </div>
      {/* Right Column */}
      <div className="chat-interface-main-column chat-interface-main-right-column">
        {/* Nav/Search */}
        <SearchNav isLoaded={isLoaded} sessionUser={sessionUser} />
        <div className="chat-interface-message-feed-wrapper">
          {currentChannel ? (
            <div className="chat-interface-message-feed-wrapper">
              {/* Message feed */}
              <MessageFeed channelId={currentChannel.id} />
              {/* Message Inputs */}
              <MessageInputs
                channelId={currentChannel.id}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
              />
            </div>
          ) : (
            <div className="chat-interface-select-channel-wrapper">
            <h1>Please select a channel</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
