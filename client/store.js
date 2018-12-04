import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//initial state
const initialState = { messages: [], newMessage: '' };

// action consts
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GET_NEW_MESSAGE = 'GET_NEW_MESSAGE';

// action creators
const gotMessagesFromServer = messages => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages,
  };
};

export const writeMessage = message => {
  return {
    type: WRITE_MESSAGE,
    newMessage: message,
  };
};

const getMessage = message => {
  return {
    type: GET_NEW_MESSAGE,
    message,
  };
};

//async action creators
const fetchMessages = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/messages');
    dispatch(gotMessagesFromServer(data));
  };
};

export const gotNewMessage = () => {
  return async dispatch => {
    const { data } = await axios.post('/api/messages');
    dispatch(getMessage(data));
  };
};

// reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case WRITE_MESSAGE:
      return { ...state, newMessage: action.newMessage };
    case GET_NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);

export default store;
export { gotMessagesFromServer, fetchMessages };
