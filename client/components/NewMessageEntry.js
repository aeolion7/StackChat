import React, { Component } from 'react';
import { writeMessage, gotNewMessage } from '../store';
import { connect } from 'react-redux';

class NewMessageEntry extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(message) {
    this.props.write(message);
    console.log(this.props.newMessageEntry);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("do I have name from the props?", this.props, this.props.name)
    const name = this.props.name
    const content = this.props.newMessageEntry;
    const channelId = this.props.channelId;

    this.props.post({ content, name, channelId });
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange={(event) => {
              this.handleChange(event.target.value);
            }}
            value={this.props.newMessageEntry}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    newMessageEntry: state.newMessage,
    name: state.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    write: someStr => {
      dispatch(writeMessage(someStr));
    },
    post: messageObj => {
      dispatch(gotNewMessage(messageObj));
    }
  };
};

const ConnectedNewMessageEntry = connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);

export default ConnectedNewMessageEntry;
