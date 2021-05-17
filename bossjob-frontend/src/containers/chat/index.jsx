import React, {Component} from 'react';
import {connect} from "react-redux";
import {Grid, InputItem, Icon, NavBar, Toast} from "antd-mobile";
import {createReceiveMessageListAction, createSendMessageAction} from "../../redux/actions";
import ChatItem from "../../components/ChatItem";
import {getChatMessageList} from "../../api/api";
import {getUserId} from "../../utils/tools";

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

    const to_id = this.props.match.params.user_id
    getChatMessageList(to_id).then(res=>{
      this.props.createReceiveMessageListAction(res)
      window.scrollTo(0, document.body.scrollHeight)
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.scrollTo(0, document.body.scrollHeight)
  }

  handleSend = () => {
    const from_id = this.props.user._id || getUserId()
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
    const from_id = this.props.user._id || getUserId()
    const to_id = this.props.match.params.user_id
    const chat_id = [from_id, to_id].sort().join('_')
    const {chat} = this.props
    const messageList = chat[chat_id]
    return (
      <div>
        <NavBar icon={<Icon type="left" />} onLeftClick={()=>this.props.history.goBack()}>聊天列表</NavBar>
        <div className='container'>
          {
            Array.isArray(messageList) ?
            messageList.map(message => {
              return <ChatItem key={message._id} chat={message} />
            }) : null
          }
        </div>
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
  state => ({user: state.user, chat: state.chat}),
  {createReceiveMessageListAction, createSendMessageAction}
)(Chat)
