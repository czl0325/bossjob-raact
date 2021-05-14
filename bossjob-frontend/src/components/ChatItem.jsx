import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
import '../assets/css/common.less'
import Avatar from '../assets/avatar.jpeg'
import {getPictureUrl} from "../utils/tools";

class ChatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {user, chat} = this.props

    if (!chat || !user._id) {
      return (<Redirect to='/' />)
    }
    return (
      <div className='chat-item' style={user._id === chat.from_id ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'}}>
        <img alt='头像' src={chat.from_avatar ? getPictureUrl(chat.from_avatar) : Avatar} />
        <span style={user._id === chat.from_id ? {textAlign: 'right'} : {textAlign: 'left'}}>{chat.content}</span>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(ChatItem)
