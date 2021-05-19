import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavBar, List} from "antd-mobile";
import {getUserId, getPictureUrl} from "../../../utils/tools";
import Avatar from "../../../assets/avatar.jpeg"

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {messageList} = this.state
    const {user} = this.props
    const me_id = user._id || getUserId()
    let lastMessage = null
    if (Array.isArray(messageList) && messageList.length > 0) {
      lastMessage = messageList[messageList.length-1]
    }
    return (
      <div>
        <NavBar>消息</NavBar>
        <List className='container'>
          {
            messageList ?
            messageList.map(msg => {
              return (
                <List.Item
                  thumb={msg.to_id === me_id ? (msg.from_avatar ? getPictureUrl(msg.from_avatar) : Avatar) : (msg.to_avatar ? getPictureUrl(msg.to_avatar) : Avatar)}
                arrow='horizontal'>
                  {msg.to_id === me_id ? msg.from_name : msg.to_name}
                  <List.Item.Brief>{lastMessage?lastMessage.content:''}</List.Item.Brief>
                </List.Item>
              )
            }) : null
          }

        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(Message)
