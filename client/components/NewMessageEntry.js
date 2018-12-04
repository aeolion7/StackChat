import React, { Component } from 'react';
import { writeMessage } from '../store';
import { connect } from 'react-redux';

class NewMessageEntry extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(message) {
    this.props.write(message);
    console.log(this.props.newMessageEntry);
  }

  render() {
    return (
      <form id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange={(event) => {
              this.handleChange(event.target.value);
            }}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    write: someStr => {
      dispatch(writeMessage(someStr));
    },
  };
};

const ConnectedNewMessageEntry = connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);

export default ConnectedNewMessageEntry;
