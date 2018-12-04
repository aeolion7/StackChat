import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postChannel, writeChannel } from '../store';

const NewChannelEntry = props => {
  console.log(props);
  return (
    <form
      onSubmit={() => {
        props.postChannel({name: props.newChannel});
      }}
    >
      <div className="form-group">
        <label htmlFor="name">Create a Channel</label>
        <input
          onChange={event => {
            props.writeChannel(event.target.value);
          }}
          className="form-control"
          type="text"
          name="channelName"
          placeholder="Enter channel name"
          value={props.newChannel}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">
          Create Channel
        </button>
      </div>
    </form>
  );
};

/** Write your `connect` component below! **/

const mapStateToProps = state => {
  return {
    newChannel: state.newChannel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postChannel: channelObj => {
      dispatch(postChannel(channelObj));
    },
    writeChannel: channel => dispatch(writeChannel(channel)),
  };
};

const ConnectedNewChannelEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChannelEntry);

export default ConnectedNewChannelEntry;
