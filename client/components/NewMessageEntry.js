import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage, writeMessage } from '../store';

class NewMessageEntry extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.props.writeMessage(evt.target.value);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { name, newMessageEntry } = this.props;
    const content = newMessageEntry;
    const { channelId } = this.props;

    this.props.postMessage({ name, content, channelId });
    this.props.writeMessage('');
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.props.newMessageEntry}
            onChange={this.handleChange}
            placeholder="Say something nice..."
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
    name: state.name,
    newMessageEntry: state.newMessageEntry,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: message => dispatch(postMessage(message)),
    writeMessage: string => dispatch(writeMessage(string)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageEntry);
