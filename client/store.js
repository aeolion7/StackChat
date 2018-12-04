import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios'

//initial state
const initialState = {messages:[]}

// action consts
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'

// action creators
const gotMessagesFromServer = (messages) => {
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        messages
    }
}

//async action creators
const fetchMessages = () => {
    return async (dispatch) => {
        const {data} = await axios.get('/api/messages')
        dispatch(gotMessagesFromServer(data))
    }
}

// reducer function
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GOT_MESSAGES_FROM_SERVER: return {...state, messages: action.messages}
        default: return state
    }
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware,thunkMiddleware))

export default store
export {
    gotMessagesFromServer,
    fetchMessages
}