import React, {Component} from 'react';
import {connect} from "react-redux";
import {Grid, InputItem, List, NavBar, Toast} from "antd-mobile";
import Avatar from '../../assets/avatar.jpeg'
import {createSendMessageAction} from "../../redux/actions";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      showEmoji: false
    };
  }

  componentDidMount() {
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
    this.emojis = emojis.map(emoji => ({text: emoji}))
  }

  handleSend = () => {
    const from_id = this.props.user._id
    const to_id = this.props.match.params.user_id
    const content = this.state.content.trim()
    if (!content) {
      Toast.fail("消息不能为空")
      return true
    }
    this.props.createSendMessageAction({from_id, to_id, content})
    this.setState({
      content: '',
      showEmoji: false
    })
  }

  render() {
    const {showEmoji, content} = this.state
    return (
      <div>
        <NavBar>聊天列表</NavBar>
        <List style={{marginBottom:'50px'}}>
          <List.Item thumb={Avatar} extra='客户'>
            你好
          </List.Item>
          <List.Item thumb={Avatar} extra='我'>
            你好
          </List.Item>
        </List>
        <div className="am-tab-bar" style={{position:'fixed', bottom:0, width: '100%', left: 0, height: "inherit"}}>
          <InputItem
            placeholder='请输入您要发送的消息'
            value={this.state.content}
            onChange={val=>this.setState({content: val})}
            onFocus={()=>this.setState({showEmoji: false})}
            extra={
              <span>
                <span onClick={()=>this.setState({showEmoji: !showEmoji})} style={{marginRight:10}}>😊</span>
                <span onClick={this.handleSend}>发送</span>
              </span>
          }/>
        </div>
        {
          showEmoji ? <Grid data={this.emojis} columnNum={8} carouselMaxRow={4} isCarousel={true} onClick={item=>this.setState({content: content+item.text})}/> : null
        }
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {createSendMessageAction}
)(Chat)
