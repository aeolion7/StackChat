import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import {connect} from 'react-redux'
import {fetchMessages} from '../store'

class MessagesList extends Component {

  componentDidMount () {
    this.props.fetchInitialMessages()
    console.log(this.props.messages)
  }

  render () {

    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.props.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialMessages: () => {
      dispatch(fetchMessages())
    }
  }
}

const ConnectedMessagesList = connect(mapStateToProps, mapDispatchToProps)(MessagesList)

export default ConnectedMessagesList