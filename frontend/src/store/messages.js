// Action type constants
const GET_CHANNEL_MESSAGES = "messages/GET_CHANNEL_MESSAGES";
const GET_USER_MESSAGES = "messages/GET_USER_MESSAGES";
const CREATE_MESSAGE = "messages/CREATE_MESSAGE";
const EDIT_MESSAGE = "messages/EDIT_MESSAGE";
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

// Action creators
const getChannelMessages = (messages) => ({
  type: GET_CHANNEL_MESSAGES,
  payload: messages,
});

const getUserMessages = (messages) => ({
  type: GET_USER_MESSAGES,
  payload: messages,
});

const createMessage = (message) => ({
  type: CREATE_MESSAGE,
  payload: message,
});

const editMessage = (message) => ({
  type: EDIT_MESSAGE,
  payload: message,
});

const deleteMessage = (messageId) => ({
  type: DELETE_MESSAGE,
  payload: messageId,
});

//Thunk action creators

// Get all channel messages
export const getChannelMessagesThunk = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/messages/channel/${channelId}`);

  if (response.ok) {
    const { messages } = await response.json();
    dispatch(getChannelMessages(messages));

    return messages;
  }

  const errors = response.json();
  return errors;
};

// Get all user messages
export const getUserMessagesThunk = () => async (dispatch) => {
  const response = await fetch(`/api/messages/current`);

  if (response.ok) {
    const { messages } = await response.json();
    dispatch(getUserMessages(messages));

    return messages;
  }

  const errors = await response.json();
  return errors;
};

// Create new message
export const createMessageThunk = (message) => async (dispatch) => {
  const response = await fetch(`/api/messages/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (response.ok) {
    const { message } = await response.json();
    dispatch(createMessage(message));

    return null;
  }

  const errors = await response.json();
  return errors;
};

// Edit message
export const editMessageThunk = (message) => async (dispatch) => {
  const response = await fetch(`/api/messages/${message.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (response.ok) {
    const { message } = await response.json();
    dispatch(editMessage(message));

    return null;
  }

  const errors = await response.json();
  return errors;
};

// Delete message
export const deleteMessageThunk = (messageId) => async (dispatch) => {
  const response = await fetch(`/api/messages/${messageId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    const successMessage = await response.json();
    dispatch(deleteMessage(messageId));

    return null;
  }

  const errors = await response.json();
  return errors;
};

// Message reducer
const initialState = { channelMessages: {}, userMessages: {} };

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNEL_MESSAGES: {
      const newState = {
        ...state,
        channelMessages: { ...state.channelMessages },
      };

      // Normalize data
      const messages = {};
      action.payload.forEach((message) => (messages[message.id] = message));

      newState.channelMessages = { ...messages };
      return newState;
    }

    case GET_USER_MESSAGES: {
      const newState = { ...state };

      // Normalize data
      const messages = {};
      action.payload.forEach((message) => (messages[message.id] = message));

      newState.userMessages = { ...state.userMessages, ...messages };
      return newState;
    }

    case CREATE_MESSAGE: {
      const newState = { ...state };

      newState.userMessages[action.payload.id] = action.payload;
      newState.channelMessages[action.payload.id] = action.payload;

      return newState;
    }

    case EDIT_MESSAGE: {
      const newState = { ...state };

      newState.userMessages[action.payload.id] = action.payload;
      newState.channelMessages[action.payload.id] = action.payload;

      return newState;
    }

    case DELETE_MESSAGE: {
      const newState = { ...state };

      delete newState.userMessages[action.payload];
      delete newState.channelMessages[action.payload];

      return newState;
    }

    default:
      return state;
  }
};

export default messageReducer;
