import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ChannelFormModal from "../ChannelFormModal";
import OpenChannelUpdateModalButton from "../OpenChannelUpdateModalButton";
import DeleteChannelModal from "../DeleteChannelModal";
import "./FeedItem.css";
import { getCurrentChannelThunk } from "../../store/channels";
import { getChannelMessagesThunk } from "../../store/messages";

export default function FeedItem({ channelId, imageSrc, name }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const onChannelClick = async () => {
    const data = await dispatch(getCurrentChannelThunk(channelId));

    if (data) {
      setErrors(data);
    } else {
      dispatch(getChannelMessagesThunk(channelId));
    }
  };

  if (!channelId) return null;

  return (
    <>
      <div onClick={onChannelClick} className="feed-item-wrapper clickable">
        <div className="feed-item-name-wrapper">
          <img src={imageSrc} />
          <p>{name}</p>
        </div>
        <div>
          <OpenChannelUpdateModalButton
            buttonText="Edit"
            modalComponent={
              <ChannelFormModal
                id={channelId}
                componentType="update"
                title="Update channel"
              />
            }
          />
        </div>
      </div>
    </>
  );
}
