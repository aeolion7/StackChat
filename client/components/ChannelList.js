import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const RANDOM_CHANNEL = '/channels/1';
const GENERAL_CHANNEL = '/channels/2';
const DOGS_CHANNEL = '/channels/3';
const LUNCH_CHANNEL = '/channels/4';

class ChannelList extends Component {
  render() {
    const countObj = {};

    this.props.messages.map(message => {
      const currentId = message.channelId;
      countObj.hasOwnProperty(currentId)
        ? countObj[currentId]++
        : (countObj[currentId] = 1);
    });

    return (
      <ul>
        <li>
          <NavLink to={RANDOM_CHANNEL} activeClassName="active">
            <span># really_random</span>
            <span className="badge">{countObj[1]}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={GENERAL_CHANNEL} activeClassName="active">
            <span># generally_speaking</span>
            <span className="badge">{countObj[2]}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={DOGS_CHANNEL} activeClassName="active">
            <span># dogs_of_fullstack</span>
            <span className="badge">{countObj[3]}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={LUNCH_CHANNEL} activeClassName="active">
            <span># lunch_planning</span>
            <span className="badge">{countObj[4]}</span>
          </NavLink>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
});

const ConnectedChannelList = withRouter(connect(mapStateToProps)(ChannelList));

export default ConnectedChannelList;
