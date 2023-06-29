import { normalize } from "./utils";

// Action type constants
const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";
const GET_USER_CHANNELS = "channels/GET_USER_CHANNELS";
const ADD_CURRENT_CHANNEL = "teams/ADD_CURRENT_CHANNEL";
const GET_TEAM_CHANNELS = "channels/GET_TEAM_CHANNELS";
const CREATE_CHANNEL = "channels/CREATE_CHANNEL";
const EDIT_CHANNEL = "channels/EDIT_CHANNEL";
const DELETE_CHANNEL = "channels/DELETE_CHANNEL";
const RESET_CURRENT_CHANNEL = "channels/RESET_CURRENT_CHANNEL";

// Action creators
const addCurrentChannel = (channel) => ({
  type: ADD_CURRENT_CHANNEL,
  payload: channel,
});
const getAllChannels = (channels) => ({
  type: GET_ALL_CHANNELS,
  payload: channels,
});

const getUserChannels = (channels) => ({
  type: GET_USER_CHANNELS,
  payload: channels,
});

const getTeamChannels = (channels) => ({
  type: GET_TEAM_CHANNELS,
  payload: channels,
});

const createChannel = (channel) => ({
  type: CREATE_CHANNEL,
  payload: channel,
});

const editChannel = (channel) => ({
  type: EDIT_CHANNEL,
  payload: channel,
});

const deleteChannel = (channelId) => ({
  type: DELETE_CHANNEL,
  payload: channelId,
});

export const resetCurrentChannel = () => ({
  type: RESET_CURRENT_CHANNEL,
});

// Thunk action creators

// Get all channels
export const getAllChannelsThunk = () => async (dispatch) => {
  const response = await fetch("/api/channels/all");

  if (response.ok) {
    const { channels } = await response.json();
    dispatch(getAllChannels(channels));

    return channels;
  }

  const errors = await response.json();
  return errors;
};

// Get user channels
export const getUserChannelsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/channels/user`);

  if (response.ok) {
    const { channels } = await response.json();
    dispatch(getUserChannels(channels));

    return channels;
  }

  const errors = await response.json();
  return errors;
};

// Get team channels
export const getTeamChannelsThunk = (teamId) => async (dispatch) => {
  const response = await fetch(`/api/channels/team/${teamId}`);

  if (response.ok) {
    const { channels } = await response.json();
    dispatch(getTeamChannels(channels));

    return channels;
  }

  const errors = await response.json();
  return errors;
};

// Create channel
export const createChannelThunk = (channel) => async (dispatch) => {
  const response = await fetch("/api/channels/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(channel),
  });

  if (response.ok) {
    const { channel } = await response.json();
    dispatch(createChannel(channel));
    // dispatch(addCurrentChannel(channel));

    return null;
  }

  const errors = response.json();
  return errors;
};

// Get current team by ID thunk
export const getCurrentChannelThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/channels/${id}`);
  if (response.ok) {
    const channel = await response.json();
    dispatch(addCurrentChannel(channel));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};

// Edit channel
export const editChannelThunk = (channel) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channel.id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(channel),
  });

  if (response.ok) {
    const { channel } = await response.json();
    dispatch(editChannel(channel));

    return null;
  }

  const errors = response.json();
  return errors;
};

// Delete channel
export const deleteChannelThunk = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    await response.json();
    await dispatch(deleteChannel(channelId));

    return null;
  }

  const errors = response.json();
  return errors;
};

// Channel reducer
const initialState = {
  allChannels: {},
  currentChannel: null,
  userChannels: {},
  teamChannels: {},
};

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_CHANNEL: {
      const newState = normalize(state);
      newState.currentChannel = normalize(action.payload.channel);

      return newState;
    }
    case GET_ALL_CHANNELS: {
      const newState = normalize(state);

      newState.allChannels = normalize(action.payload);
      return newState;
    }
    case GET_USER_CHANNELS: {
      const newState = normalize(state);

      newState.userChannels = normalize(action.payload);
      return newState;
    }
    case GET_TEAM_CHANNELS: {
      const newState = normalize(state);

      newState.teamChannels = normalize(action.payload);
      return newState;
    }
    case CREATE_CHANNEL: {
      const newState = normalize(state);

      newState.allChannels[action.payload.id] = normalize(action.payload);
      newState.userChannels[action.payload.id] = normalize(action.payload);
      newState.teamChannels[action.payload.id] = normalize(action.payload);
      newState.currentChannel = normalize(action.payload);

      return newState;
    }
    case EDIT_CHANNEL: {
      const newState = normalize(state);

      newState.allChannels[action.payload.id] = normalize(action.payload);
      newState.userChannels[action.payload.id] = normalize(action.payload);
      newState.teamChannels[action.payload.id] = normalize(action.payload);

      return newState;
    }
    case DELETE_CHANNEL: {
      const newState = normalize(state);

      delete newState.allChannels[action.payload];
      delete newState.userChannels[action.payload];
      delete newState.teamChannels[action.payload];

      return newState;
    }
    case RESET_CURRENT_CHANNEL: {
      const newState = normalize(state);
      newState.currentChannel = null;
      return newState;
    }
    default:
      return state;
  }
};

export default channelsReducer;
