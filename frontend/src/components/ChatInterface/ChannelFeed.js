import FeedItem from "../FeedItem";

import "./ChannelFeed.css"

function ChannelFeed({ teamChannels, currentTeamId }) {
  return (
    <div className="channel-feed-wrapper">
      <div className="channel-feed-title-wrapper">
        <h3>Channels</h3>

      </div>

      <ul className="channel-feed-item-wrapper">
        {Object.values(teamChannels).map(
          (channel) =>
            channel.type === "channel" &&
            channel.teamId === currentTeamId && (
              <li key={channel.id}>
                <FeedItem
                  channelId={channel.id}
                  imageSrc={channel.imageUrl}
                  name={channel.name}
                />
              </li>
            )
        )}
      </ul>
    </div>
  );
}
export default ChannelFeed;
